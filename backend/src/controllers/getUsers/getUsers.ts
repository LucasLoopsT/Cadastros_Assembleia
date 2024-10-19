import { IGetUsersRepository } from "./protocols";
import { IController } from "../protocols";
import { User } from "../../models/user";
import { ok, serverError } from "../helpers";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError(error);
    }
  }
}
