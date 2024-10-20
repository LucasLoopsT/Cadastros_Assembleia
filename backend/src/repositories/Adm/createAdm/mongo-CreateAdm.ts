import {
  CreateAdmParams,
  ICreateAdmRepository,
} from "../../../controllers/Adm/createAdm/protocols";
import { MongoClient } from "../../../database/mongo";
import { Adm } from "../../../models/adm";

export class MongoCreateAdmRepository implements ICreateAdmRepository {
  async createAdm(params: CreateAdmParams): Promise<Adm> {
    const { insertedId } = await MongoClient.db
      .collection("admins")
      .insertOne(params);

    const adm = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .findOne({ _id: insertedId });

    if (!adm) {
      throw new Error("Adm not created");
    }

    const { _id, ...rest } = adm;

    return { id: _id.toHexString(), ...rest };
  }
}
