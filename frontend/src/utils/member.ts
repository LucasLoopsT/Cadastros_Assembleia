import type { MemberListItem } from "../types/member";

export function displayList(value: MemberListItem["cargo"]): string {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (value === undefined || value === null) return "—";
  return String(value);
}

export function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.length) return [value];
  return [];
}
