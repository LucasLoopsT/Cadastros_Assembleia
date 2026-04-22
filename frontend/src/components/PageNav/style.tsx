import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.SPACE.md};
  margin-bottom: ${({ theme }) => theme.SPACE.lg};
`;

export const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.SPACE.sm};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.textMuted};
  text-decoration: none;
  padding: ${({ theme }) => theme.SPACE.xs} 0;

  svg {
    font-size: 1.125rem;
    flex-shrink: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.COLORS.primary};
  }
`;
