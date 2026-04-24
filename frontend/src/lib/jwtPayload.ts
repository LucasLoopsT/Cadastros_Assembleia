type JwtAdmPayload = {
  id?: string;
  nome?: string;
};

/** Lê o payload do JWT (sem validar assinatura — só para exibição). */
export function readJwtPayload(token: string): JwtAdmPayload | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const b64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    const padded = pad ? b64 + "=".repeat(4 - pad) : b64;
    const json = atob(padded);
    return JSON.parse(json) as JwtAdmPayload;
  } catch {
    return null;
  }
}

/** Primeiro nome a partir do nome completo cadastrado no admin. */
export function firstNameFromFullName(fullName: string): string {
  const t = fullName.trim();
  if (!t) return "";
  return t.split(/\s+/)[0] ?? t;
}
