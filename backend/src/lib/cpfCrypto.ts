import crypto from "crypto";

const ALGO = "aes-256-gcm";
const IV_LENGTH = 16;
const PREFIX = "enc:v1:";

/** CPF como string formatada enviada pelo frontend, ex.: 000.000.000-00 */
const CPF_FORMATTED =
  /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

function deriveKey(): Buffer {
  const secret = process.env.CPF_ENCRYPTION_KEY;
  if (!secret || secret.length < 8) {
    throw new Error(
      "CPF_ENCRYPTION_KEY must be set in the environment (at least 8 characters)."
    );
  }
  return crypto.createHash("sha256").update(secret, "utf8").digest();
}

export function isValidFormattedCpf(value: string): boolean {
  return CPF_FORMATTED.test(value.trim());
}

export function encryptCpf(plaintext: string): string {
  const trimmed = plaintext.trim();
  if (!trimmed) return "";
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey();
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([
    cipher.update(trimmed, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  const payload = Buffer.concat([iv, tag, enc]).toString("base64");
  return `${PREFIX}${payload}`;
}

export function decryptCpf(stored: string | undefined): string {
  if (!stored) return "";
  if (!stored.startsWith(PREFIX)) {
    return stored;
  }
  try {
    const raw = Buffer.from(stored.slice(PREFIX.length), "base64");
    if (raw.length < IV_LENGTH + 16 + 1) return "";
    const iv = raw.subarray(0, IV_LENGTH);
    const tag = raw.subarray(IV_LENGTH, IV_LENGTH + 16);
    const data = raw.subarray(IV_LENGTH + 16);
    const key = deriveKey();
    const decipher = crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString(
      "utf8"
    );
  } catch {
    return "";
  }
}
