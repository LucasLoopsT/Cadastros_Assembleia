const CPF_FORMATTED = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export function onlyCpfDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** Aplica máscara 000.000.000-00 a partir dos dígitos digitados. */
export function formatCpfFromDigits(digits: string): string {
  const d = onlyCpfDigits(digits);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) {
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  }
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
}

export function formatCpfInput(raw: string): string {
  return formatCpfFromDigits(raw);
}

export function isFormattedCpfValid(value: string): boolean {
  return CPF_FORMATTED.test(value.trim());
}
