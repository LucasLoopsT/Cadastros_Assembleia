import styled from "styled-components";

export const Layout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 440px);
  background: ${({ theme }) => theme.COLORS.canvas};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Side = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.SPACE["3xl"]} ${({ theme }) => theme.SPACE["2xl"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.SPACE.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.COLORS.headerBg} 0%,
    #1e3a5f 45%,
    ${({ theme }) => theme.COLORS.primary} 100%
  );
  color: ${({ theme }) => theme.COLORS.headerText};

  &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    inset: 0;
    width: 100%;
    height: 100%;
    background: url("/src/assets/bible.png") no-repeat center/cover;
    opacity: 0.5;
  }

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.SPACE["2xl"]} ${({ theme }) => theme.SPACE.lg};
    min-height: 200px;
  }
`;

export const Brand = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.85;
  z-index: 10;
`;

export const Title = styled.h1`
  color: inherit;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  max-width: 20ch;
  z-index: 10;
`;

export const Hint = styled.p`
  color: rgba(248, 250, 252, 0.85);
  font-size: 1rem;
  max-width: 36ch;
  line-height: 1.6;
  z-index: 10;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.SPACE["3xl"]} ${({ theme }) => theme.SPACE["2xl"]};
  background: ${({ theme }) => theme.COLORS.surface};
  box-shadow: ${({ theme }) => theme.SHADOW.lg};

  img {
    width: 50px;
    height: 50px;
    margin-bottom: 30px;
    filter: invert(50%) sepia(100%);
    transform: scale(3);
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.SPACE.xs};
  }

  .subtitle {
    font-size: 0.9375rem;
    margin-bottom: ${({ theme }) => theme.SPACE.xl};
  }

  .back {
    margin-top: ${({ theme }) => theme.SPACE.xl};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.COLORS.primary};
    align-self: flex-start;
  }

  .back:hover {
    color: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.lg};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.sm};

  input {
    border: 1px solid ${({ theme }) => theme.COLORS.border};
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
    background: ${({ theme }) => theme.COLORS.surface};
    color: ${({ theme }) => theme.COLORS.text};
  }

  input:focus {
    border-color: ${({ theme }) => theme.COLORS.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.COLORS.primarySoft};
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.COLORS.danger};
  font-size: 0.875rem;
`;

export const Submit = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.COLORS.primary};
  margin-top: ${({ theme }) => theme.SPACE.sm};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;
