import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../../controllers/User/createUser/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import {
  decryptCpfInUser,
  encryptCpfInCreateParams,
} from "../userCpfPersistence";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const stored = encryptCpfInCreateParams(params);
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(stored);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    const mapped = { id: _id.toHexString(), ...rest } as User;
    return decryptCpfInUser(mapped);
  }
}
