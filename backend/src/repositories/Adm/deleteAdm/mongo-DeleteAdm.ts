import { ObjectId } from "mongodb";
import { IDeleteAdmRepository } from "../../../controllers/Adm/deleteAdm/protocols";
import { MongoClient } from "../../../database/mongo";
import { Adm } from "../../../models/adm";

export class MongoDeleteAdmRepository implements IDeleteAdmRepository {
  async deleteAdm(id: string): Promise<Adm> {
    const adm = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .findOne({ _id: new ObjectId(id) });

    if (!adm) {
      throw new Error("Admin not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Admin not deleted.");
    }

    const { _id, ...rest } = adm;

    return { id: _id.toHexString(), ...rest };
  }
}
