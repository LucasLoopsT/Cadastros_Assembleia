import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 240px;
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  background-color: ${({ theme }) => theme.COLORS.surface};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  box-shadow: ${({ theme }) => theme.SHADOW.sm};
  overflow: hidden;
  transition: border-color 150ms ease, box-shadow 150ms ease,
    transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.COLORS.primary};
    box-shadow: ${({ theme }) => theme.SHADOW.md};
    transform: translateY(-2px);
  }
`;

export const Photo = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.COLORS.surfaceMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.primary};
  }
`;

export const Text = styled.div`
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg}
    ${({ theme }) => theme.SPACE.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.xs};

  h3 {
    font-size: 1rem;
    color: ${({ theme }) => theme.COLORS.text};
    line-height: 1.3;
  }

  p {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }
`;
