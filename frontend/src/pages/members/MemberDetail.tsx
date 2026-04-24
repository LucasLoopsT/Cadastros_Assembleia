import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { PageNav, PageNavBar } from "../../components/PageNav/index.tsx";
import {
  deleteMember,
  findMemberById,
  revealMemberCpf,
} from "../../services/membersServices.tsx";
import type { MemberListItem } from "../../types/member.ts";
import { displayList } from "../../utils/member.ts";
import {
  Actions,
  Avatar,
  DangerButton,
  DetailCard,
  DetailGrid,
  DialogActions,
  DialogBackdrop,
  DialogCard,
  DialogPrimaryButton,
  DialogSecondaryButton,
  IconGhostButton,
  Meta,
  ObservationBlock,
  Page,
  PageHeader,
  PrimaryLink,
  SecondaryLink,
  SensitiveRow,
} from "./detailStyle.tsx";

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<MemberListItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [revealedCpf, setRevealedCpf] = useState<string | null>(null);
  const [cpfDialogOpen, setCpfDialogOpen] = useState(false);
  const [cpfPassword, setCpfPassword] = useState("");
  const [cpfDialogError, setCpfDialogError] = useState<string | null>(null);
  const [cpfRevealing, setCpfRevealing] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await findMemberById(id);
        if (cancelled) return;
        setMember(data);
        setRevealedCpf(null);
      } catch {
        if (!cancelled) setError("Membro não encontrado ou sem permissão.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function openCpfDialog() {
    setCpfDialogOpen(true);
    setCpfPassword("");
    setCpfDialogError(null);
  }

  function closeCpfDialog() {
    setCpfDialogOpen(false);
    setCpfPassword("");
    setCpfDialogError(null);
  }

  async function submitCpfReveal() {
    if (!id) return;
    setCpfRevealing(true);
    setCpfDialogError(null);
    try {
      const { data } = await revealMemberCpf(id, cpfPassword);
      setRevealedCpf(data.cpf);
      closeCpfDialog();
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
          ? String((err.response as { data?: unknown }).data)
          : "Não foi possível confirmar a senha.";
      setCpfDialogError(msg);
    } finally {
      setCpfRevealing(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    const ok = window.confirm("Excluir este membro? Esta ação não pode ser desfeita.");
    if (!ok) return;
    setDeleting(true);
    try {
      await deleteMember(id);
      navigate("/members");
    } catch {
      setDeleting(false);
      setError("Não foi possível excluir. Tente novamente.");
    }
  }

  function formatDate(dateString?: string) {
    if (!dateString) return "—";

    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString("pt-BR");
  }

  function isBirthdayToday(date?: string) {
    if (!date) return false;

    const today = new Date();
    const [year, month, day] = date.split("-");
    const birth = new Date(Number(year), Number(month) - 1, Number(day));

    return (
      today.getDate() === birth.getDate() &&
      today.getMonth() === birth.getMonth()
    );
  }

  const observationText = member?.observation?.trim() ?? "";

  if (loading) {
    return (
      <Page>
        <PageNavBar>
          <PageNav to="/" label="Início" />
          <PageNav to="/members" label="Membros" />
        </PageNavBar>
        <p>Carregando…</p>
      </Page>
    );
  }

  if (error || !member) {
    return (
      <Page>
        <PageNavBar>
          <PageNav to="/" label="Início" />
          <PageNav to="/members" label="Membros" />
        </PageNavBar>
        <PageHeader>
          <div>
            <h1>Membro</h1>
            <p>{error ?? "Registro indisponível."}</p>
          </div>
          <Link to="/members">Voltar à lista</Link>
        </PageHeader>
      </Page>
    );
  }

  const photo = member.foto?.trim();
  const initials = `${member.nome?.[0] ?? ""}${member.sobrenome?.[0] ?? ""}`.toUpperCase();

  return (
    <Page>
      <PageNavBar>
        <PageNav to="/" label="Início" />
        <PageNav to="/members" label="Membros" />
      </PageNavBar>
      <PageHeader>
        <div>
          <h1>
            {member.nome} {member.sobrenome} {isBirthdayToday(member.dataNasc) && " 🎉"}
          </h1>
          <Meta>{displayList(member.cargo)}</Meta>
        </div>
        <div className="links">
          <SecondaryLink to="/members">Lista</SecondaryLink>
          <PrimaryLink to={`/members/${member.id}/edit`}>Editar</PrimaryLink>
        </div>
      </PageHeader>

      <DetailCard>
        <div className="hero">
          <Avatar $hasImage={Boolean(photo)}>
            {photo ? <img src={photo} alt="" /> : <span>{initials}</span>}
          </Avatar>
          <div className="intro">
            <p className="lead">{displayList(member.congregacao)}</p>
            <p className="muted">
              Cadastro interno da Assembleia — dados visíveis apenas para
              administradores autenticados.
            </p>
          </div>
        </div>

        <DetailGrid>
          <div>
            <span className="label">Data de nascimento</span>
            <span className="value">
              {formatDate(member.dataNasc)}
            </span>
          </div>
          <div>
            <span className="label">Telefone</span>
            <span className="value">{member.telefone || "—"}</span>
          </div>
          <div className="span-2">
            <span className="label">CPF</span>
            <SensitiveRow>
              <span className="value">
                {revealedCpf ? (
                  revealedCpf
                ) : (
                  <span className="muted">Oculto — use o ícone para revelar</span>
                )}
              </span>
              {revealedCpf ? (
                <IconGhostButton
                  type="button"
                  aria-label="Ocultar CPF"
                  title="Ocultar CPF"
                  onClick={() => setRevealedCpf(null)}
                >
                  <HiEyeSlash aria-hidden />
                </IconGhostButton>
              ) : (
                <IconGhostButton
                  type="button"
                  aria-label="Revelar CPF"
                  title="Revelar CPF"
                  onClick={openCpfDialog}
                >
                  <HiEye aria-hidden />
                </IconGhostButton>
              )}
            </SensitiveRow>
          </div>
          <div>
            <span className="label">Sexo</span>
            <span className="value">
              {member.sexo === "Masculino" || member.sexo === "Feminino"
                ? member.sexo
                : "Não informado"}
            </span>
          </div>
          <div className="span-2">
            <span className="label">Endereço</span>
            <span className="value">
              {member.rua}, {member.numEndereco} — {member.bairro}, {member.cidade}
            </span>
          </div>
        </DetailGrid>

        <ObservationBlock>
          <span className="obs-label">Observações</span>
          {observationText ? (
            <p className="obs-body">{observationText}</p>
          ) : (
            <p className="obs-body obs-empty">Sem observação.</p>
          )}
        </ObservationBlock>

        <Actions>
          <DangerButton type="button" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Excluindo…" : "Excluir membro"}
          </DangerButton>
        </Actions>
      </DetailCard>

      {cpfDialogOpen ? (
        <DialogBackdrop
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCpfDialog();
          }}
        >
          <DialogCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="cpf-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="cpf-dialog-title">Confirmar senha</h2>
            <p>
              Digite a senha do seu usuário administrador para exibir o CPF deste
              membro.
            </p>
            <div>
              <label htmlFor="cpf-dialog-password">Senha</label>
              <input
                id="cpf-dialog-password"
                type="password"
                autoComplete="current-password"
                value={cpfPassword}
                onChange={(e) => setCpfPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void submitCpfReveal();
                }}
              />
            </div>
            {cpfDialogError ? (
              <p className="dialog-error">{cpfDialogError}</p>
            ) : null}
            <DialogActions>
              <DialogSecondaryButton
                type="button"
                onClick={closeCpfDialog}
                disabled={cpfRevealing}
              >
                Cancelar
              </DialogSecondaryButton>
              <DialogPrimaryButton
                type="button"
                disabled={cpfRevealing || !cpfPassword.trim()}
                onClick={() => void submitCpfReveal()}
              >
                {cpfRevealing ? "Verificando…" : "Revelar CPF"}
              </DialogPrimaryButton>
            </DialogActions>
          </DialogCard>
        </DialogBackdrop>
      ) : null}
    </Page>
  );
}
