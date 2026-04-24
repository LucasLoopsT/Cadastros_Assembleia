import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const control = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
`;

export const Page = styled.div`
  max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.xl};
`;

export const PageHeader = styled.header`
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

  a {
    font-weight: 600;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.COLORS.primary};
  }

  a:hover {
    color: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;

export const FormCard = styled.form`
  background: ${({ theme }) => theme.COLORS.surface};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  box-shadow: ${({ theme }) => theme.SHADOW.sm};
  padding: ${({ theme }) => theme.SPACE["2xl"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.xl};

  .checks h3 {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.SPACE.md};
  }

  .error {
    color: ${({ theme }) => theme.COLORS.danger};
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.SPACE.lg};
  }
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.SPACE.lg};

  .span-2 {
    grid-column: 1 / -1;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    .span-2 {
      grid-column: auto;
    }
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.sm};

  .field-hint {
    font-weight: 400;
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
    text-transform: none;
    letter-spacing: normal;
  }

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

  textarea {
    border: 1px solid ${({ theme }) => theme.COLORS.border};
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
    background: ${({ theme }) => theme.COLORS.surface};
    color: ${({ theme }) => theme.COLORS.text};
    font: inherit;
    resize: vertical;
    min-height: 6rem;
  }

  textarea:focus {
    border-color: ${({ theme }) => theme.COLORS.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.COLORS.primarySoft};
    outline: none;
  }

  select {
    border: 1px solid ${({ theme }) => theme.COLORS.border};
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
    background: ${({ theme }) => theme.COLORS.surface};
    color: ${({ theme }) => theme.COLORS.text};
  }

  select:focus {
    border-color: ${({ theme }) => theme.COLORS.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.COLORS.primarySoft};
  }
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.SPACE.sm} ${({ theme }) => theme.SPACE.lg};

  .check {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.SPACE.sm};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
    font-weight: 500;
  }

  input {
    width: 1rem;
    height: 1rem;
    accent-color: ${({ theme }) => theme.COLORS.primary};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.SPACE.md};
  padding-top: ${({ theme }) => theme.SPACE.md};
  border-top: 1px solid ${({ theme }) => theme.COLORS.border};
`;

export const PrimaryButton = styled.button`
  ${control}
  border: none;
  color: #fff;
  background: ${({ theme }) => theme.COLORS.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const CancelLink = styled(Link)`
  ${control}
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  background: ${({ theme }) => theme.COLORS.surface};
  color: ${({ theme }) => theme.COLORS.text};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.COLORS.surfaceMuted};
  }
`;
