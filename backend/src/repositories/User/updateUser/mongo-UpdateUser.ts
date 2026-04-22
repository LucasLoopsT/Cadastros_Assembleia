import { ObjectId } from "mongodb";
import {
  UpdateUserParams,
  IUpdateUserRepository,
} from "../../../controllers/User/updateUser/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import {
  decryptCpfInUser,
  encryptCpfInUpdateParams,
} from "../userCpfPersistence";

export class MongoUpdateRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    const filtered = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined)
    ) as UpdateUserParams;
    const payload = encryptCpfInUpdateParams(filtered);

    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
        },
      }
    );

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not updated");
    }

    const { _id, ...rest } = user;

    const mapped = { id: _id.toHexString(), ...rest } as User;
    return decryptCpfInUser(mapped);
  }
}
