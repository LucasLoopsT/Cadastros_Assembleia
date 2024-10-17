import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = HttpRequest?.params?.id;
      const body = HttpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing fields.",
        };
      }

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing user ID.",
        };
      }

      const allowrdFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "nome",
        "sobrenome",
        "foto",
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

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowrdFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed.",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Erro: ${error}`,
      };
    }
  }
}
