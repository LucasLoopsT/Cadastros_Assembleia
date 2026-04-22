/** Valores alinhados ao backend `models/user` (enums Congregacao e Cargo). */
export const CONGREGACOES = [
  "Vila Nova",
  "Vila Natal",
  "Vila Fabril",
  "Vila Elizabeth",
  "Vila São José",
  "Vila Esperança",
  "Vila Paulista",
] as const;

export const CARGOS = [
  "Membro",
  "Diácono",
  "Presbítero",
  "Missionário(a)",
  "Evangelista",
  "Pastor",
] as const;

export type CongregacaoValue = (typeof CONGREGACOES)[number];
export type CargoValue = (typeof CARGOS)[number];
