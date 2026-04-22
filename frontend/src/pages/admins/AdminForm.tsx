import { type FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageNav, PageNavBar } from "../../components/PageNav/index.tsx";
import { createAdmin, getAdmins, updateAdmin } from "../../services/admServices.tsx";
import {
  Actions,
  Cancel,
  ErrorText,
  Field,
  FormCard,
  Head,
  Page,
  Submit,
} from "./style.tsx";

export default function AdminForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        const { data } = await getAdmins();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        const adm = list.find((a) => a.id === id);
        if (adm) {
          setNome(adm.nome);
          setEmail(adm.email);
        } else {
          setError("Administrador não encontrado.");
        }
      } catch {
        if (!cancelled) setError("Não foi possível carregar os dados.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!nome.trim() || !email.trim()) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }
    if (!isEdit && !password) {
      setError("Defina uma senha para o novo administrador.");
      return;
    }
    setSaving(true);
    try {
      if (isEdit && id) {
        const body: { nome: string; email: string; password?: string } = {
          nome: nome.trim(),
          email: email.trim(),
        };
        if (password.trim()) body.password = password;
        await updateAdmin(id, body);
        navigate("/admins");
      } else {
        await createAdmin({
          nome: nome.trim(),
          email: email.trim(),
          password,
        });
        navigate("/admins");
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
          : "Não foi possível salvar.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Page>
        <p>Carregando…</p>
      </Page>
    );
  }

  return (
    <Page>
      <PageNavBar>
        <PageNav to="/" label="Início" />
        <PageNav to="/admins" label="Administradores" />
      </PageNavBar>

      <Head>
        <div>
          <h1>{isEdit ? "Editar administrador" : "Novo administrador"}</h1>
          <p>
            {isEdit
              ? "Atualize nome, e-mail e, se quiser, defina uma nova senha."
              : "Cadastre uma nova conta de acesso ao painel."}
          </p>
        </div>
      </Head>

      <FormCard onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="adm-nome">Nome</label>
          <input
            id="adm-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            required
          />
        </Field>
        <Field>
          <label htmlFor="adm-email">E-mail</label>
          <input
            id="adm-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </Field>
        <Field>
          <label htmlFor="adm-pass">
            {isEdit ? "Nova senha (opcional)" : "Senha"}
          </label>
          <input
            id="adm-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isEdit ? "new-password" : "new-password"}
          />
        </Field>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <Actions>
          <Cancel to="/admins">Cancelar</Cancel>
          <Submit type="submit" disabled={saving}>
            {saving ? "Salvando…" : isEdit ? "Salvar" : "Cadastrar"}
          </Submit>
        </Actions>
      </FormCard>
    </Page>
  );
}
