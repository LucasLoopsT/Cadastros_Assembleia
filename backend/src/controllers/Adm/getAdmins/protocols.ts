import { Adm } from "../../../models/adm";

export interface IGetAdminsRepository {
  getAdmins(): Promise<Adm[]>;
}
