import styled from "styled-components";

export const Layout = styled.div`
  max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.SPACE["2xl"]} ${({ theme }) => theme.SPACE.lg}
    ${({ theme }) => theme.SPACE["3xl"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE["2xl"]};
`;

export const Hero = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.lg};
  padding: ${({ theme }) => theme.SPACE["2xl"]};
  border-radius: ${({ theme }) => theme.RADIUS.xl};
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.COLORS.headerBg} 0%,
    #1e3a8a 55%,
    ${({ theme }) => theme.COLORS.primary} 100%
  );
  color: ${({ theme }) => theme.COLORS.headerText};
  box-shadow: ${({ theme }) => theme.SHADOW.lg};
  
  &::before {
    content: "";
    insert: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: url("/src/assets/bible.png") no-repeat center/cover;
    opacity: 0.20;
  }
`;

export const Badge = styled.span`
  align-self: flex-start;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  padding: ${({ theme }) => theme.SPACE.xs} ${({ theme }) => theme.SPACE.md};
  border-radius: ${({ theme }) => theme.RADIUS.full};
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 1;
`;

export const Title = styled.h1`
  color: inherit;
  max-width: 20ch;
  z-index: 1;
`;

export const Subtitle = styled.p`
  color: rgba(248, 250, 252, 0.88);
  font-size: 1.05rem;
  max-width: 52ch;
  line-height: 1.6;
  z-index: 1;
`;

export const Quote = styled.blockquote`
  margin: 0;
  padding-left: ${({ theme }) => theme.SPACE.lg};
  border-left: 3px solid rgba(255, 255, 255, 0.35);
  color: rgba(248, 250, 252, 0.92);
  font-style: italic;
  font-size: 1rem;
  max-width: 48ch;
  z-index: 1;

  cite {
    display: block;
    margin-top: ${({ theme }) => theme.SPACE.sm};
    font-style: normal;
    font-size: 0.875rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    opacity: 0.85;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.SPACE.md};
  margin-top: ${({ theme }) => theme.SPACE.md};
  z-index: 1;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
    font-weight: 600;
    font-size: 0.9375rem;
  }

  .primary {
    background: #fff;
    color: ${({ theme }) => theme.COLORS.primary};
    border: 1px solid transparent;
    transition: all 0.2s ease;
  }

  .primary:hover {
    box-shadow: ${({ theme }) => theme.SHADOW.md};
    background: #e7e7e7;
  }

  .ghost {
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #fff;
    background: transparent;
  }

  .ghost:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const Dashboard = styled.section`
  background: ${({ theme }) => theme.COLORS.surface};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  padding: ${({ theme }) => theme.SPACE["2xl"]};
  box-shadow: ${({ theme }) => theme.SHADOW.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.xl};
`;

export const PanelTitle = styled.h2`
  font-size: 1.125rem;
  margin: 0;
`;

export const LoadingHint = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.COLORS.textMuted};
`;

export const StatNumber = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.xs};

  .num {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.primary};
    line-height: 1;
  }

  .cap {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }
`;

export const GenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.SPACE.md};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const GenderCard = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.lg};
  background: ${({ theme }) => theme.COLORS.surfaceMuted};

  .label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.COLORS.textSubtle};
    margin-bottom: ${({ theme }) => theme.SPACE.sm};
  }

  .value {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.text};
  }

  .hint {
    display: block;
    margin-top: ${({ theme }) => theme.SPACE.sm};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
    line-height: 1.4;
  }
`;

export const CityBlock = styled.div`
  h3 {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.SPACE.md};
  }

  .empty {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 160px) 1fr minmax(2rem, 2.5rem);
  align-items: center;
  gap: ${({ theme }) => theme.SPACE.md};
  margin-bottom: ${({ theme }) => theme.SPACE.sm};
  font-size: 0.875rem;

  .name {
    color: ${({ theme }) => theme.COLORS.text};
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .count {
    text-align: right;
    font-weight: 600;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    .count {
      text-align: left;
    }
  }
`;

export const BarTrack = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.RADIUS.full};
  background: ${({ theme }) => theme.COLORS.border};
  overflow: hidden;
`;

export const BarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.min(100, Math.max(0, $pct))}%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.COLORS.primarySoft},
    ${({ theme }) => theme.COLORS.primary}
  );
`;

export const CargoList = styled.div`
  h3 {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.SPACE.md};
  }

  .empty {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: ${({ theme }) => theme.SPACE.xs};
  }
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.SPACE.md};
  padding: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.md};
  border-radius: ${({ theme }) => theme.RADIUS.md};
  background: ${({ theme }) => theme.COLORS.surfaceMuted};
  font-size: 0.875rem;

  span {
    color: ${({ theme }) => theme.COLORS.text};
  }

  strong {
    color: ${({ theme }) => theme.COLORS.primary};
    font-size: 0.9375rem;
  }
`;
