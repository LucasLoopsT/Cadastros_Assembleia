import { IGetAdminsRepository } from "../../../controllers/Adm/getAdmins/protocols";
import { Adm } from "../../../models/adm";
import { MongoClient } from "../../../database/mongo";

export class MongoGetAdminsRepository implements IGetAdminsRepository {
  async getAdmins(): Promise<Adm[]> {
    const admins = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .find({})
      .toArray();

    return admins.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
