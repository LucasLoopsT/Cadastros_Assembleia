import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { findAllMembers } from "../../services/membersServices.tsx";
import type { MemberListItem } from "../../types/member.ts";
import { buildMemberOverviewStats } from "../../utils/memberStats.ts";
import {
  Actions,
  Badge,
  BarFill,
  BarRow,
  BarTrack,
  CargoList,
  CityBlock,
  Dashboard,
  GenderCard,
  GenderGrid,
  Hero,
  Layout,
  ListItem,
  LoadingHint,
  PanelTitle,
  Quote,
  StatNumber,
  Subtitle,
  Title,
} from "./style.tsx";

function Home() {
  const { admFirstName } = useAuth();
  const [members, setMembers] = useState<MemberListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setStatsError(null);
      try {
        const { data } = await findAllMembers();
        if (!cancelled) setMembers(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled)
          setStatsError(
            "Não foi possível carregar os dados para a visão geral.",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => buildMemberOverviewStats(members), [members]);
  const maxCity = stats.citiesSorted[0]?.[1] ?? 1;

  return (
    <Layout>
      <Hero>
        <Badge>Assembleia de Deus — Cubatão</Badge>
        <Badge>
          {admFirstName ? `Bem-vindo, ${admFirstName}!` : "Bem-vindo!"}
        </Badge>
        <Title>Gestão da comunidade</Title>
        <Subtitle>
          Acompanhe os membros, cadastre novos registros e mantenha a secretaria
          organizada em um só lugar.
        </Subtitle>
        <Quote>
          “Eu sou o bom pastor; conheço as minhas ovelhas, e elas me conhecem.”
          <cite>João 10:14</cite>
        </Quote>
        <Actions>
          <Link className="primary" to="/members">
            Ver membros
          </Link>
          <Link className="ghost" to="/members/new">
            Novo cadastro
          </Link>
          <Link className="ghost" to="/admins">
            Administradores
          </Link>
        </Actions>
      </Hero>

      <Dashboard>
        <PanelTitle>Visão geral</PanelTitle>
        {statsError ? <LoadingHint>{statsError}</LoadingHint> : null}
        {loading && !statsError ? (
          <LoadingHint>Carregando estatísticas…</LoadingHint>
        ) : null}

        {!loading && !statsError ? (
          <>
            <StatNumber>
              <span className="num">{stats.total}</span>
              <span className="cap">membros cadastrados</span>
            </StatNumber>

            <GenderGrid>
              <GenderCard>
                <span className="label">Homens</span>
                <span className="value">{stats.masculino}</span>
              </GenderCard>
              <GenderCard>
                <span className="label">Mulheres</span>
                <span className="value">{stats.feminino}</span>
              </GenderCard>
              <GenderCard>
                <span className="label">Sexo não informado</span>
                <span className="value">{stats.semSexo}</span>
                <span className="hint">
                  Preencha o campo sexo no cadastro do membro para refletir
                  aqui.
                </span>
              </GenderCard>
            </GenderGrid>

            <CityBlock>
              <h3>Por cidade</h3>
              {stats.citiesSorted.length === 0 ? (
                <p className="empty">Nenhuma cidade cadastrada ainda.</p>
              ) : (
                stats.citiesSorted.map(([city, count]) => (
                  <BarRow key={city}>
                    <span className="name">{city}</span>
                    <BarTrack>
                      <BarFill $pct={(count / maxCity) * 100} />
                    </BarTrack>
                    <span className="count">{count}</span>
                  </BarRow>
                ))
              )}
            </CityBlock>

            <CargoList>
              <h3>Por cargo</h3>
              {stats.cargosSorted.length === 0 ? (
                <p className="empty">Sem dados de cargo.</p>
              ) : (
                <ul>
                  {stats.cargosSorted.map(([cargo, count]) => (
                    <ListItem key={cargo}>
                      <span>{cargo}</span>
                      <strong>{count}</strong>
                    </ListItem>
                  ))}
                </ul>
              )}
            </CargoList>
          </>
        ) : null}
      </Dashboard>
    </Layout>
  );
}

export default Home;
