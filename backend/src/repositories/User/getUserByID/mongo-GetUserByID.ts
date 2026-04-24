import { ObjectId } from "mongodb";
import { IGetUserByIDRepository } from "../../../controllers/User/getUsersByID/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
export class MongoGetUserByIDRepository implements IGetUserByIDRepository {
  async getUserByID(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne(
        { _id: new ObjectId(id) },
        { projection: { cpf: 0 } }
      );

    if (!user) {
      throw new Error("User not found.");
    }

    const { _id, ...rest } = user;

    const mapped = { id: _id.toHexString(), ...rest } as User;
    return mapped;
  }
}
