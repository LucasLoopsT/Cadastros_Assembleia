import styled from "styled-components";

export const Container = styled.div`
  button {
    background-color: ${({ theme }) => theme.COLORS.surfaceMuted};
    color: ${({ theme }) => theme.COLORS.text};
    border: 1px solid ${({ theme }) => theme.COLORS.border};
    min-height: 36px;
    padding: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.md};
    text-align: center;
    border-radius: ${({ theme }) => theme.RADIUS.full};
    font-size: 0.8125rem;
    font-weight: 600;
    transition: background-color 150ms ease, color 150ms ease,
      border-color 150ms ease;
  }

  button:hover {
    border-color: ${({ theme }) => theme.COLORS.primary};
    color: ${({ theme }) => theme.COLORS.primary};
  }

  button[data-active="true"] {
    background-color: ${({ theme }) => theme.COLORS.primarySoft};
    border-color: ${({ theme }) => theme.COLORS.primary};
    color: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;
