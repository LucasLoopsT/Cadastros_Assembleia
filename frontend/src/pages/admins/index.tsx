import { useCallback, useEffect, useState } from "react";
import { PageNav, PageNavBar } from "../../components/PageNav/index.tsx";
import {
  deleteAdmin,
  getAdmins,
  type AdminUser,
} from "../../services/admServices.tsx";
import {
  DangerBtn,
  ErrorText,
  Head,
  Page,
  PrimaryBtn,
  RowActions,
  Table,
  TableWrap,
  LinkBtn,
} from "./style.tsx";

export default function AdminsPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAdmins();
      setAdmins(Array.isArray(data) ? data : []);
    } catch {
      setError("Não foi possível carregar os administradores.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string, nome: string) {
    const ok = window.confirm(`Remover o administrador "${nome}"?`);
    if (!ok) return;
    try {
      await deleteAdmin(id);
      await load();
    } catch {
      setError("Não foi possível excluir. Verifique se não é o único admin.");
    }
  }

  return (
    <Page>
      <PageNavBar>
        <PageNav to="/" label="Início" />
      </PageNavBar>

      <Head>
        <div>
          <h1>Administradores</h1>
          <p>
            {loading
              ? "Carregando…"
              : "Contas que podem acessar o sistema e gerenciar membros."}
          </p>
        </div>
        <PrimaryBtn to="/admins/new">Novo administrador</PrimaryBtn>
      </Head>

      {error ? <ErrorText>{error}</ErrorText> : null}

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!loading && admins.length === 0 ? (
              <tr>
                <td colSpan={3}>Nenhum administrador cadastrado.</td>
              </tr>
            ) : (
              admins.map((a) => (
                <tr key={a.id}>
                  <td>{a.nome}</td>
                  <td>{a.email}</td>
                  <td>
                    <RowActions>
                      <LinkBtn to={`/admins/${a.id}/edit`}>Editar</LinkBtn>
                      <DangerBtn
                        type="button"
                        onClick={() => handleDelete(a.id, a.nome)}
                      >
                        Excluir
                      </DangerBtn>
                    </RowActions>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrap>
    </Page>
  );
}
