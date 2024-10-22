import { Adm } from "../../../models/adm";

export interface IDeleteAdmRepository {
  deleteAdm(id: string): Promise<Adm>;
}
