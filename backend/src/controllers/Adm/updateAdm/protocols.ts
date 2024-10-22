import { Adm } from "../../../models/adm";

export interface UpdateAdmParams {
  nome?: string;
  email?: string;
  password?: string;
}

export interface IUpdateAdmRepository {
  updateUser(id: string, params: UpdateAdmParams): Promise<Adm>;
}
