import { ObjectId } from "mongodb";
import type { IRevealMemberCpfRepository } from "../../../controllers/User/revealMemberCpf/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { decryptCpfInUser } from "../userCpfPersistence";

export class MongoRevealMemberCpfRepository implements IRevealMemberCpfRepository {
  async getDecryptedCpfByMemberId(memberId: string): Promise<string | undefined> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(memberId) });

    if (!user) {
      throw new Error("User not found.");
    }

    const { _id, ...rest } = user;
    const mapped = { id: _id.toHexString(), ...rest } as User;
    const withCpf = decryptCpfInUser(mapped);
    return withCpf.cpf?.trim();
  }
}
