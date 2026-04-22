import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../../controllers/User/deleteUser/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { decryptCpfInUser } from "../userCpfPersistence";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted.");
    }

    const { _id, ...rest } = user;

    const mapped = { id: _id.toHexString(), ...rest } as User;
    return decryptCpfInUser(mapped);
  }
}
