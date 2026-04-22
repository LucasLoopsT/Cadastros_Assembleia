import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageNav, PageNavBar } from "../../components/PageNav/index.tsx";
import { OPCOES_SEXO } from "../../constants/sexo.ts";
import { CARGOS, CONGREGACOES } from "../../constants/domains.ts";
import {
  createMember,
  findMemberById,
  updateMember,
} from "../../services/membersServices.tsx";
import type { MemberPayload, SexoMembro } from "../../types/member.ts";
import { formatCpfInput, isFormattedCpfValid } from "../../utils/cpfFormat.ts";
import { toArray } from "../../utils/member.ts";
import {
  Actions,
  CancelLink,
  CheckboxGrid,
  Field,
  FieldGrid,
  FormCard,
  Page,
  PageHeader,
  PrimaryButton,
} from "./formStyle.tsx";

const emptyPayload: MemberPayload = {
  nome: "",
  sobrenome: "",
  foto: "",
  dataNasc: "",
  telefone: "",
  cpf: "",
  cidade: "",
  bairro: "",
  rua: "",
  numEndereco: 0,
  congregacao: [],
  cargo: [],
};

export default function MemberForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [values, setValues] = useState<MemberPayload>(emptyPayload);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await findMemberById(id);
        if (cancelled) return;
        setValues({
          nome: data.nome,
          sobrenome: data.sobrenome,
          foto: data.foto ?? "",
          dataNasc: data.dataNasc?.slice(0, 10) ?? "",
          telefone: data.telefone ?? "",
          cpf: data.cpf ?? "",
          cidade: data.cidade,
          bairro: data.bairro,
          rua: data.rua,
          numEndereco: Number(data.numEndereco) || 0,
          congregacao: toArray(data.congregacao) as MemberPayload["congregacao"],
          cargo: toArray(data.cargo) as MemberPayload["cargo"],
          sexo: data.sexo,
        });
      } catch {
        if (!cancelled) setError("Não foi possível carregar o membro.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function toggleArrayField(
    field: "congregacao" | "cargo",
    value: string,
    checked: boolean
  ) {
    setValues((prev) => {
      const set = new Set(prev[field]);
      if (checked) set.add(value);
      else set.delete(value);
      return { ...prev, [field]: Array.from(set) };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isFormattedCpfValid(values.cpf)) {
      setError("Informe o CPF completo no formato 000.000.000-00.");
      return;
    }
    if (!values.congregacao.length || !values.cargo.length) {
      setError("Selecione ao menos uma congregação e um cargo.");
      return;
    }
    setSaving(true);
    setError(null);
    const payload: MemberPayload = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      foto: values.foto,
      dataNasc: values.dataNasc,
      telefone: values.telefone,
      cpf: values.cpf.trim(),
      cidade: values.cidade,
      bairro: values.bairro,
      rua: values.rua,
      numEndereco: values.numEndereco,
      congregacao: values.congregacao,
      cargo: values.cargo,
    };
    if (values.sexo === "Masculino" || values.sexo === "Feminino") {
      payload.sexo = values.sexo;
    }
    try {
      if (isEdit && id) {
        await updateMember(id, payload);
        navigate(`/members/${id}`);
      } else {
        const { data } = await createMember(payload);
        navigate(`/members/${data.id}`);
      }
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
          ? String((err.response as { data?: unknown }).data)
          : "Erro ao salvar. Confira os campos e tente novamente.";
      setError(msg);
    } finally {
      setSaving(false);
    }
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

  return (
    <Page>
      <PageNavBar>
        <PageNav to="/" label="Início" />
        <PageNav to="/members" label="Membros" />
      </PageNavBar>
      <PageHeader>
        <div>
          <h1>{isEdit ? "Editar membro" : "Novo membro"}</h1>
          <p>
            {isEdit
              ? "Atualize os dados e salve as alterações."
              : "Preencha os dados para cadastrar um novo membro."}
          </p>
        </div>
      </PageHeader>

      <FormCard onSubmit={handleSubmit}>
        <FieldGrid>
          <Field>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              value={values.nome}
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
              required
            />
          </Field>
          <Field>
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              id="sobrenome"
              value={values.sobrenome}
              onChange={(e) =>
                setValues({ ...values, sobrenome: e.target.value })
              }
              required
            />
          </Field>
          <Field className="span-2">
            <label htmlFor="foto">URL da foto (opcional)</label>
            <input
              id="foto"
              type="url"
              placeholder="https://…"
              value={values.foto}
              onChange={(e) => setValues({ ...values, foto: e.target.value })}
            />
          </Field>
          <Field>
            <label htmlFor="dataNasc">Data de nascimento</label>
            <input
              id="dataNasc"
              type="date"
              value={values.dataNasc}
              onChange={(e) =>
                setValues({ ...values, dataNasc: e.target.value })
              }
              required
            />
          </Field>
          <Field>
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              value={values.telefone}
              onChange={(e) =>
                setValues({ ...values, telefone: e.target.value })
              }
              required
            />
          </Field>
          <Field>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              inputMode="numeric"
              autoComplete="off"
              placeholder="000.000.000-00"
              maxLength={14}
              value={values.cpf}
              onChange={(e) =>
                setValues({
                  ...values,
                  cpf: formatCpfInput(e.target.value),
                })
              }
              required
            />
          </Field>
          <Field>
            <label htmlFor="sexo">Sexo (opcional)</label>
            <select
              id="sexo"
              value={values.sexo ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setValues({
                  ...values,
                  sexo:
                    v === "Masculino" || v === "Feminino"
                      ? (v as SexoMembro)
                      : undefined,
                });
              }}
            >
              {OPCOES_SEXO.map((o) => (
                <option key={`${o.value}-${o.label}`} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <label htmlFor="cidade">Cidade</label>
            <input
              id="cidade"
              value={values.cidade}
              onChange={(e) =>
                setValues({ ...values, cidade: e.target.value })
              }
              required
            />
          </Field>
          <Field>
            <label htmlFor="bairro">Bairro</label>
            <input
              id="bairro"
              value={values.bairro}
              onChange={(e) =>
                setValues({ ...values, bairro: e.target.value })
              }
              required
            />
          </Field>
          <Field className="span-2">
            <label htmlFor="rua">Rua</label>
            <input
              id="rua"
              value={values.rua}
              onChange={(e) => setValues({ ...values, rua: e.target.value })}
              required
            />
          </Field>
          <Field>
            <label htmlFor="num">Número</label>
            <input
              id="num"
              type="number"
              min={0}
              value={Number.isNaN(values.numEndereco) ? "" : values.numEndereco}
              onChange={(e) =>
                setValues({
                  ...values,
                  numEndereco: Number(e.target.value),
                })
              }
              required
            />
          </Field>
        </FieldGrid>

        <section className="checks">
          <h3>Congregação</h3>
          <CheckboxGrid>
            {CONGREGACOES.map((c) => (
              <label key={c} className="check">
                <input
                  type="checkbox"
                  checked={values.congregacao.includes(c)}
                  onChange={(e) =>
                    toggleArrayField("congregacao", c, e.target.checked)
                  }
                />
                <span>{c}</span>
              </label>
            ))}
          </CheckboxGrid>
        </section>

        <section className="checks">
          <h3>Cargo</h3>
          <CheckboxGrid>
            {CARGOS.map((c) => (
              <label key={c} className="check">
                <input
                  type="checkbox"
                  checked={values.cargo.includes(c)}
                  onChange={(e) =>
                    toggleArrayField("cargo", c, e.target.checked)
                  }
                />
                <span>{c}</span>
              </label>
            ))}
          </CheckboxGrid>
        </section>

        {error ? <p className="error">{error}</p> : null}

        <Actions>
          <CancelLink to={isEdit && id ? `/members/${id}` : "/members"}>
            Cancelar
          </CancelLink>
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? "Salvando…" : isEdit ? "Salvar alterações" : "Cadastrar"}
          </PrimaryButton>
        </Actions>
      </FormCard>
    </Page>
  );
}
