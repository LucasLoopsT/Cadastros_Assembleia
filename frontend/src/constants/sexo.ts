import type { SexoMembro } from "../types/member.ts";

export const OPCOES_SEXO: { value: "" | SexoMembro; label: string }[] = [
  { value: "", label: "Prefiro não informar" },
  { value: "Masculino", label: "Masculino" },
  { value: "Feminino", label: "Feminino" },
];
