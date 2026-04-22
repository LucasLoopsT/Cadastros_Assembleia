import type { CreateUserParams } from "../../controllers/User/createUser/protocols";
import type { UpdateUserParams } from "../../controllers/User/updateUser/protocols";
import { decryptCpf, encryptCpf } from "../../lib/cpfCrypto";

export function encryptCpfInCreateParams(
  params: CreateUserParams
): CreateUserParams {
  return {
    ...params,
    cpf: encryptCpf(params.cpf),
  };
}

export function encryptCpfInUpdateParams(
  params: UpdateUserParams
): UpdateUserParams {
  if (params.cpf === undefined) return params;
  const trimmed = String(params.cpf).trim();
  if (!trimmed) {
    const { cpf: _omit, ...rest } = params;
    return rest;
  }
  return {
    ...params,
    cpf: encryptCpf(trimmed),
  };
}

export function decryptCpfInUser<T extends { cpf?: string }>(user: T): T {
  if (!user.cpf) return user;
  return { ...user, cpf: decryptCpf(user.cpf) };
}
