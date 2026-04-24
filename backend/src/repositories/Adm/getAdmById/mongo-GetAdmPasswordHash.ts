import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { Adm } from "../../../models/adm";
import type { IGetAdmPasswordHashRepository } from "../../../controllers/User/revealMemberCpf/protocols";

export class MongoGetAdmPasswordHashRepository
  implements IGetAdmPasswordHashRepository
{
  async getPasswordHashByAdmId(admId: string): Promise<string | null> {
    const adm = await MongoClient.db
      .collection<Omit<Adm, "id">>("admins")
      .findOne({ _id: new ObjectId(admId) });

    if (!adm) return null;
    return adm.password ?? null;
  }
}
