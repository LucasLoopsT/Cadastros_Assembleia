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
  const hashedPassword = await bcrypt.hash(body.password!, 10);

  return {
    nome: body.nome,
    email: body.email,
    password: hashedPassword,
  };
}
