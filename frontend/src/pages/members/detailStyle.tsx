import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const control = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.xl};
  font-weight: 600;
  font-size: 0.875rem;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.SPACE.lg};

  h1 {
    margin-bottom: ${({ theme }) => theme.SPACE.xs};
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.SPACE.sm};
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

export const Meta = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.COLORS.textMuted};
`;

export const SecondaryLink = styled(Link)`
  ${control}
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  background: ${({ theme }) => theme.COLORS.surface};
  color: ${({ theme }) => theme.COLORS.text};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.COLORS.surfaceMuted};
  }
`;

export const PrimaryLink = styled(Link)`
  ${control}
  border: none;
  background: ${({ theme }) => theme.COLORS.primary};
  color: #fff!important;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }
`;

export const DetailCard = styled.section`
  background: ${({ theme }) => theme.COLORS.surface};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  box-shadow: ${({ theme }) => theme.SHADOW.md};
  padding: ${({ theme }) => theme.SPACE["2xl"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE["2xl"]};

  .hero {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${({ theme }) => theme.SPACE.xl};
    align-items: center;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      justify-items: start;
    }
  }

  .intro .lead {
    font-size: 1.0625rem;
    color: ${({ theme }) => theme.COLORS.text};
    font-weight: 500;
    margin-bottom: ${({ theme }) => theme.SPACE.sm};
  }

  .intro .muted {
    font-size: 0.875rem;
    max-width: 52ch;
  }
`;

export const Avatar = styled.div<{ $hasImage: boolean }>`
  width: 112px;
  height: 112px;
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme, $hasImage }) =>
    $hasImage ? theme.COLORS.surfaceMuted : theme.COLORS.primarySoft};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.COLORS.border};

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

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.SPACE.lg};

  .span-2 {
    grid-column: 1 / -1;
  }

  .label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.COLORS.textSubtle};
    margin-bottom: ${({ theme }) => theme.SPACE.xs};
  }

  .value {
    font-size: 1rem;
    color: ${({ theme }) => theme.COLORS.text};
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    .span-2 {
      grid-column: auto;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.SPACE.md};
  border-top: 1px solid ${({ theme }) => theme.COLORS.border};
`;

export const DangerButton = styled.button`
  ${control}
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.COLORS.dangerSoft};
  color: ${({ theme }) => theme.COLORS.danger};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.COLORS.danger};
    color: #fff;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const SensitiveRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.SPACE.sm};
  flex-wrap: wrap;

  .value {
    flex: 1;
    min-width: 0;
    font-variant-numeric: tabular-nums;
  }

  .muted {
    color: ${({ theme }) => theme.COLORS.textMuted};
    font-size: 0.9375rem;
  }
`;

export const IconGhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border-radius: ${({ theme }) => theme.RADIUS.md};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  background: ${({ theme }) => theme.COLORS.surface};
  color: ${({ theme }) => theme.COLORS.textMuted};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.COLORS.primary};
    color: ${({ theme }) => theme.COLORS.primary};
    background: ${({ theme }) => theme.COLORS.primarySoft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const DialogBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.SPACE.lg};
`;

export const DialogCard = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.COLORS.surface};
  border-radius: ${({ theme }) => theme.RADIUS.lg};
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  box-shadow: ${({ theme }) => theme.SHADOW.md};
  padding: ${({ theme }) => theme.SPACE["2xl"]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SPACE.lg};

  h2 {
    font-size: 1.125rem;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.COLORS.textMuted};
  }

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.COLORS.textSubtle};
    margin-bottom: ${({ theme }) => theme.SPACE.xs};
  }

  input[type="password"] {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.COLORS.border};
    border-radius: ${({ theme }) => theme.RADIUS.md};
    padding: ${({ theme }) => theme.SPACE.md} ${({ theme }) => theme.SPACE.lg};
    background: ${({ theme }) => theme.COLORS.surface};
    color: ${({ theme }) => theme.COLORS.text};
    font: inherit;
  }

  input:focus {
    border-color: ${({ theme }) => theme.COLORS.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.COLORS.primarySoft};
    outline: none;
  }

  .dialog-error {
    color: ${({ theme }) => theme.COLORS.danger};
    font-size: 0.875rem;
    margin: 0;
  }
`;

export const DialogActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.SPACE.sm};
`;

export const DialogSecondaryButton = styled.button`
  ${control}
  border: 1px solid ${({ theme }) => theme.COLORS.border};
  background: ${({ theme }) => theme.COLORS.surface};
  color: ${({ theme }) => theme.COLORS.text};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.COLORS.surfaceMuted};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const DialogPrimaryButton = styled.button`
  ${control}
  border: none;
  background: ${({ theme }) => theme.COLORS.primary};
  color: #fff;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.COLORS.primaryHover};
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const ObservationBlock = styled.div`
  padding-top: ${({ theme }) => theme.SPACE.lg};
  border-top: 1px solid ${({ theme }) => theme.COLORS.border};

  .obs-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.COLORS.textSubtle};
    margin-bottom: ${({ theme }) => theme.SPACE.sm};
  }

  .obs-body {
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.COLORS.text};
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .obs-empty {
    color: ${({ theme }) => theme.COLORS.textMuted};
    font-style: italic;
  }
`;
