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
      const requiredFields = [
        "nome",
        "sobrenome",
        "cpf",
        "rg",
        "dataNasc",
        "cidade",
        "bairro",
        "rua",
        "numEndereco",
        "congregacao",
        "cargo",
      ];

      for (const field of requiredFields) {
        if (!HttpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required.`,
          };
        }
      }

      const user = await this.createUserRepository.createUser(
        HttpRequest.body!
      );

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
