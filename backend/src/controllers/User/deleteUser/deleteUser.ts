import { User } from "../../../models/user";
import { MongoDeleteUserRepository } from "../../../repositories/deleteUser/mongo-DeleteUser";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";

export class DeleteUserController implements IController {
  constructor(
    private readonly deleteUserRepository: MongoDeleteUserRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<string>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user ID.");
      }

      const userDeleted = await this.deleteUserRepository.deleteUser(id);

      return ok<User>(userDeleted);
    } catch (error) {
      return serverError(error);
    }
  }
}
