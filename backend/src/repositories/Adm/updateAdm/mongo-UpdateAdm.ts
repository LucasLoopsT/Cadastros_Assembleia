import {
  IUpdateAdmRepository,
  UpdateAdmParams,
} from "../../../controllers/Adm/updateAdm/protocols";
import { MongoClient } from "../../../database/mongo";
import { ObjectId } from "mongodb";
import { Adm } from "../../../models/adm";

export class MongoUpdateAdmRepository implements IUpdateAdmRepository {
  async updateUser(id: string, params: UpdateAdmParams): Promise<Adm> {
    await MongoClient.db.collection("admins").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const adm = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .findOne({ _id: new ObjectId(id) });

    if (!adm) {
      throw new Error("Admin not updated");
    }

    const { _id, ...rest } = adm;

    return { id: _id.toHexString(), ...rest };
  }
}
