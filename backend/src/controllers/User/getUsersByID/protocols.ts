import { User } from "../../../models/user";

export interface IGetUserByIDRepository {
  getUserByID(id: string): Promise<User>;
}
