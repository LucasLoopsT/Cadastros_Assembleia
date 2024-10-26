import {
  ILoginAdmRepository,
  LoginAdmParams,
} from "../../../controllers/Adm/authAdm/protocols";
import { MongoClient } from "../../../database/mongo";
import { Adm } from "../../../models/adm";

export class MongoLoginAdmRepository implements ILoginAdmRepository {
  async loginAdm(params: LoginAdmParams): Promise<LoginAdmParams> {
    const adm = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .findOne({ email: params?.email });

    if (!adm) {
      throw new Error("Adm not found.");
    }

    return adm;
  }
}
