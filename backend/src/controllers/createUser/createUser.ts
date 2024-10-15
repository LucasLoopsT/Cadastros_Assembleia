import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";
import { HttpResponse, HttpRequest } from "../protocols";
import { User } from "../../models/user";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      if (!HttpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify data.",
        };
      }

      const user = await this.createUserRepository.createUser(HttpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
