import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { PageNav, PageNavBar } from "../../components/PageNav/index.tsx";
import MemberCard from "../../components/MemberCard/index.tsx";
import FilterBtn from "../../components/FilterBtn/index.tsx";
import { findMembersPage } from "../../services/membersServices.tsx";
import type { MemberListItem } from "../../types/member.ts";
import { displayList } from "../../utils/member.ts";
import {
  Aside,
  Layout,
  Main,
  NavPageBtn,
  PageBtn,
  Pagination,
  SearchBar,
  TitleRow,
  Toolbar,
} from "./style.tsx";

type FilterKey = "Nome" | "Sobrenome" | "Cargo" | "Cidade" | "Bairro";

const PAGE_SIZE = 12;
const MAX_PAGE_BUTTONS = 7;

const FIELD_BY_FILTER: Record<FilterKey, string> = {
  Nome: "nome",
  Sobrenome: "sobrenome",
  Cargo: "cargo",
  Cidade: "cidade",
  Bairro: "bairro",
};

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

function Members() {
  const [members, setMembers] = useState<MemberListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterKey>("Nome");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filter]);

  useEffect(() => {
    const ac = new AbortController();
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await findMembersPage(
          {
            page,
            limit: PAGE_SIZE,
            q: debouncedSearch.trim() || undefined,
            field: FIELD_BY_FILTER[filter],
          },
          { signal: ac.signal }
        );
        if (cancelled) return;
        setMembers(Array.isArray(data.items) ? data.items : []);
        setTotal(typeof data.total === "number" ? data.total : 0);
        if (typeof data.page === "number" && data.page !== page) {
          setPage(data.page);
        }
      } catch (e: unknown) {
        if (cancelled) return;
        const code =
          e && typeof e === "object" && "code" in e
            ? String((e as { code?: unknown }).code)
            : "";
        if (code === "ERR_CANCELED") return;
        setError("Não foi possível carregar os membros.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, [page, debouncedSearch, filter]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total]
  );

  const displayPage = Math.min(page, totalPages);

  const handleFilter = (id: FilterKey) => {
    setFilter(id);
  };

  const showingFrom = total === 0 ? 0 : (displayPage - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(displayPage * PAGE_SIZE, total);

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

  return (
    <Layout>
      <Aside>
        <Toolbar>
          <h2>Filtros</h2>
          <p className="hint">
            Busca no servidor pelo campo escolhido. A lista é paginada (
            {PAGE_SIZE} por página).
          </p>
          <SearchBar>
            <HiMagnifyingGlass aria-hidden />
            <input
              type="search"
              placeholder="Buscar…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Buscar membros"
            />
          </SearchBar>
          <p className="label">Campo da busca</p>
          <div className="chips">
            {(
              [
                "Nome",
                "Sobrenome",
                "Cargo",
                "Cidade",
                "Bairro",
              ] as FilterKey[]
            ).map((name) => (
              <FilterBtn
                key={name}
                name={name}
                active={filter === name}
                onClick={() => handleFilter(name)}
              />
            ))}
          </div>
        </Toolbar>
      </Aside>

      <Main>
        <PageNavBar>
          <PageNav to="/" label="Início" />
        </PageNavBar>
        <TitleRow>
          <div>
            <h1>Membros</h1>
            <p>
              {loading
                ? "Carregando…"
                : total === 0
                  ? "Nenhum membro encontrado."
                  : `Exibindo ${showingFrom}–${showingTo} de ${total} membro(s)`}
            </p>
          </div>
          <Link className="cta" to="/members/new">
            Novo membro
          </Link>
        </TitleRow>

        {error ? <p className="error">{error}</p> : null}

        <div className="grid">
          {loading && members.length === 0 ? (
            <p className="loading-hint">Carregando membros…</p>
          ) : null}
          {!loading && members.length === 0 ? (
            <p className="empty">Nenhum membro encontrado.</p>
          ) : (
            members.map((member) => (
              <Link
                key={member.id}
                to={`/members/${member.id}`}
                className="card-link"
              >
                <MemberCard
                  name={`${member.nome} ${member.sobrenome} ${isBirthdayToday(member.dataNasc) ? "🎉" : ""}`}
                  cargo={displayList(member.cargo)}
                  picture={member.foto}
                />
              </Link>
            ))
          )}
        </div>

        {total > 0 ? (
          <Pagination aria-label="Paginação de membros">
            <span className="meta">
              Página {displayPage} de {totalPages}
            </span>
            <div className="controls">
              <NavPageBtn
                type="button"
                disabled={loading || displayPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </NavPageBtn>
              {totalPages <= MAX_PAGE_BUTTONS ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <PageBtn
                    key={n}
                    type="button"
                    $active={displayPage === n}
                    disabled={loading}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </PageBtn>
                ))
              ) : (
                <span className="meta">Navegue com anterior / próximo</span>
              )}
              <NavPageBtn
                type="button"
                disabled={loading || displayPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Próximo
              </NavPageBtn>
            </div>
          </Pagination>
        ) : null}
      </Main>
    </Layout>
  );
}

export default Members;
