import { type FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import logo from "../../assets/logo.png";
import {
  Brand,
  Card,
  ErrorText,
  Field,
  Form,
  Hint,
  Layout,
  Side,
  Submit,
  Title,
} from "./style.tsx";

export default function Login() {
  const { token, login } = useAuth();
  const location = useLocation();
  const stateFrom = (location.state as { from?: string } | undefined)?.from;
  const redirectTo =
    stateFrom && stateFrom !== "/login" ? stateFrom : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err: unknown) {
      const msg =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
          ? String((err.response as { data?: unknown }).data)
          : "Não foi possível entrar. Verifique e-mail e senha.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Side>
        <Brand>Assembleia de Deus - Cubatão</Brand>
        <Title>Administração da igreja</Title>
        <Hint>
          Cuidando da comunidade. Ferramenta administrativa para gerenciar os membros da igreja.        
        </Hint>
      </Side>
      <Card>
        <img src={logo} alt="Assembleia" />
        <h2>Entrar</h2>
        <p className="subtitle">Use o e-mail e a senha de administrador.</p>
        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <Submit type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </Submit>
        </Form>
      </Card>
    </Layout>
  );
}
