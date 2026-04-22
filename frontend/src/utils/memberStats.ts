import type { MemberListItem } from "../types/member.ts";
import { toArray } from "./member.ts";

export type MemberOverviewStats = {
  total: number;
  masculino: number;
  feminino: number;
  semSexo: number;
  citiesSorted: [string, number][];
  cargosSorted: [string, number][];
};

export function buildMemberOverviewStats(
  members: MemberListItem[]
): MemberOverviewStats {
  const total = members.length;
  let masculino = 0;
  let feminino = 0;
  let semSexo = 0;
  const byCity: Record<string, number> = {};
  const byCargo: Record<string, number> = {};

  for (const m of members) {
    if (m.sexo === "Masculino") masculino++;
    else if (m.sexo === "Feminino") feminino++;
    else semSexo++;

    const cidade = m.cidade?.trim();
    if (cidade) byCity[cidade] = (byCity[cidade] ?? 0) + 1;

    const cargos = toArray(m.cargo).map((s) => s.trim()).filter(Boolean);
    if (cargos.length === 0) {
      byCargo["(sem cargo)"] = (byCargo["(sem cargo)"] ?? 0) + 1;
    } else {
      for (const c of cargos) {
        byCargo[c] = (byCargo[c] ?? 0) + 1;
      }
    }
  }

  const citiesSorted = Object.entries(byCity).sort((a, b) => b[1] - a[1]);
  const cargosSorted = Object.entries(byCargo).sort((a, b) => b[1] - a[1]);

  return {
    total,
    masculino,
    feminino,
    semSexo,
    citiesSorted,
    cargosSorted,
  };
}
