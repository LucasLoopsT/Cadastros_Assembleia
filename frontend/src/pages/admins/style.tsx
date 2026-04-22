import { Link } from "react-router-dom";
import styled from "styled-components";

export const Page = styled.div`
  max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.xl};
`;

export const Head = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.SPACE.lg};

  h1 {
    margin-bottom: ${({ theme }) => theme.SPACE.xs};
  }

  p {
    font-size: 0.9375rem;
  }
`;

export const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
  font-weight: 600;
  font-size: 0.9375rem;
  background: ${({ theme }) => theme.COLORS.primary};
  color: #fff;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;

export const TableWrap = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  overflow: auto;
  background: ${({ theme }) => theme.COLORS.surface};
  box-shadow: ${({ theme }) => theme.SHADOW.sm};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.border};
  }

  th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.COLORS.textSubtle};
    background: ${({ theme }) => theme.COLORS.surfaceMuted};
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export const RowActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.SPACE.sm};
`;

export const LinkBtn = styled(Link)`
  font-weight: 600;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.COLORS.primary};

  &:hover {
    color: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;

export const DangerBtn = styled.button`
  border: none;
  background: none;
  font-weight: 600;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.COLORS.danger};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormCard = styled.form`
  max-width: 520px;
  background: ${({ theme }) => theme.COLORS.surface};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  padding: ${({ theme }) => theme.SPACE["2xl"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.lg};
  box-shadow: ${({ theme }) => theme.SHADOW.sm};
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

  select {
    border: 1px solid ${({ theme }) => theme.COLORS.border};
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
    background: ${({ theme }) => theme.COLORS.surface};
    color: ${({ theme }) => theme.COLORS.text};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.SPACE.md};
  margin-top: ${({ theme }) => theme.SPACE.md};
`;

export const Submit = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.COLORS.primary};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const Cancel = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  color: ${({ theme }) => theme.COLORS.text};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.COLORS.surfaceMuted};
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.COLORS.danger};
  font-size: 0.875rem;
`;
