import { User } from "../../models/user";
import { MongoDeleteUserRepository } from "../../repositories/deleteUser/mongo-DeleteUser";
import { HttpRequest, HttpResponse, IController } from "../protocols";

export class DeleteUserController implements IController {
  constructor(
    private readonly deleteUserRepository: MongoDeleteUserRepository
  ) {}
  async handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user ID.",
        };
      }

      const userDeleted = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 200,
        body: userDeleted,
      };
    } catch {
      return {
        statusCode: 500,
        body: "err",
      };
    }
  }
}
