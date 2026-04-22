import styled from "styled-components";

export const Layout = styled.div`
  max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: ${({ theme }) => theme.SPACE.xl};
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Aside = styled.aside`
  position: sticky;
  top: ${({ theme }) => theme.SPACE.lg};

  @media (max-width: 900px) {
    position: static;
  }
`;

export const Toolbar = styled.div`
  background: ${({ theme }) => theme.COLORS.surface};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  box-shadow: ${({ theme }) => theme.SHADOW.sm};
  padding: ${({ theme }) => theme.SPACE.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.md};

  h2 {
    font-size: 1.05rem;
  }

  .hint {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.COLORS.textSubtle};
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.SPACE.sm};
  }
`;

export const SearchBar = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.SPACE.sm};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.md};
  background: ${({ theme }) => theme.COLORS.surfaceMuted};

  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.COLORS.textSubtle};
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    width: 100%;
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.COLORS.text};
  }
`;

export const Main = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.lg};

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.SPACE.lg};
  }

  .card-link {
    color: inherit;
    text-decoration: none;
    border-radius: ${({ theme }) => theme.RADIUS.lg};
  }

  .card-link:focus-visible {
    outline: 2px solid ${({ theme }) => theme.COLORS.primary};
    outline-offset: 3px;
  }

  .error {
    color: ${({ theme }) => theme.COLORS.danger};
    font-size: 0.9375rem;
  }

  .empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: ${({ theme }) => theme.SPACE["2xl"]};
    color: ${({ theme }) => theme.COLORS.textMuted};
  }

  .loading-hint {
    grid-column: 1 / -1;
    text-align: center;
    padding: ${({ theme }) => theme.SPACE.lg};
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }
`;

export const Pagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.SPACE.md};
  padding: ${({ theme }) => theme.SPACE.lg} 0;
  margin-top: ${({ theme }) => theme.SPACE.sm};
  border-top: 1px solid ${({ theme }) => theme.COLORS.border};

  .meta {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.SPACE.sm};
  }
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 ${({ theme }) => theme.SPACE.sm};
  border-radius: ${({ theme }) => theme.RADIUS.md};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.COLORS.primary : theme.COLORS.border};
  background: ${({ theme, $active }) =>
    $active ? theme.COLORS.primarySoft : theme.COLORS.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.COLORS.primaryHover : theme.COLORS.text};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.COLORS.primary};
    color: ${({ theme }) => theme.COLORS.primary};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const NavPageBtn = styled(PageBtn)`
  min-width: auto;
  padding: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.md};
`;

export const TitleRow = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.SPACE.md};

  h1 {
    margin-bottom: ${({ theme }) => theme.SPACE.xs};
  }

  p {
    font-size: 0.9375rem;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
    font-weight: 600;
    font-size: 0.9375rem;
    background: ${({ theme }) => theme.COLORS.primary};
    color: #fff;
  }

  .cta:hover {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;
