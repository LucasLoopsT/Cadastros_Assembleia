import { Adm } from "../../../models/adm";

export interface CreateAdmParams {
  nome: string;
  email: string;
  password: string;
}

export interface ICreateAdmRepository {
  createAdm(params: CreateAdmParams): Promise<Adm>;
}
