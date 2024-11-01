import { IGetUserByIDRepository } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { User } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";

export class GetUserByIDController implements IController {
  constructor(private readonly getUserRepository: IGetUserByIDRepository) {}
  async handle(
    httpRequest: HttpRequest<string>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user ID.");
      }

      const user = await this.getUserRepository.getUserByID(id);

      return ok<User>(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
