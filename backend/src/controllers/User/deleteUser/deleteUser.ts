import { User } from "../../../models/user";
import { IDeleteUserRepository } from "./protocols";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
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
