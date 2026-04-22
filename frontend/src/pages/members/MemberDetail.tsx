import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageNav, PageNavBar } from "../../components/PageNav/index.tsx";
import { deleteMember, findMemberById } from "../../services/membersServices.tsx";
import type { MemberListItem } from "../../types/member.ts";
import { displayList } from "../../utils/member.ts";
import {
  Actions,
  Avatar,
  DangerButton,
  DetailCard,
  DetailGrid,
  Meta,
  Page,
  PageHeader,
  PrimaryLink,
  SecondaryLink,
} from "./detailStyle.tsx";

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<MemberListItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await findMemberById(id);
        if (!cancelled) setMember(data);
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
          <div>
            <span className="label">CPF</span>
            <span className="value">{member.cpf?.trim() || "—"}</span>
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

        <Actions>
          <DangerButton type="button" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Excluindo…" : "Excluir membro"}
          </DangerButton>
        </Actions>
      </DetailCard>
    </Page>
  );
}
