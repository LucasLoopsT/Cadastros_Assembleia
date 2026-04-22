import { Adm } from "../../../models/adm";
import bcrypt from "bcrypt";

export interface UpdateAdmParams {
  nome?: string;
  email?: string;
  password?: string;
}

export interface IUpdateAdmRepository {
  updateUser(id: string, params: UpdateAdmParams): Promise<Adm>;
}

export async function prepareAdmParams(
  body: UpdateAdmParams
): Promise<UpdateAdmParams> {
  const result: UpdateAdmParams = {};
  if (body.nome !== undefined) result.nome = body.nome;
  if (body.email !== undefined) result.email = body.email;
  if (
    body.password !== undefined &&
    typeof body.password === "string" &&
    body.password.length > 0
  ) {
    result.password = await bcrypt.hash(body.password, 10);
  }
  return result;
}
