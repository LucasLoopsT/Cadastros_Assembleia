import { Adm } from "../../../models/adm";
import bcrypt from "bcrypt";

export interface CreateAdmParams {
  nome: string;
  email: string;
  password: string;
}

export interface ICreateAdmRepository {
  createAdm(params: CreateAdmParams): Promise<Adm>;
}

export async function prepareAdmParams(
  body: CreateAdmParams
): Promise<CreateAdmParams> {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  return {
    nome: body.nome,
    email: body.email,
    password: hashedPassword,
  };
}
