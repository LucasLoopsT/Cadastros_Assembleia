import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = HttpRequest?.params?.id;
      const body = HttpRequest?.body;

      if (!id) {
        return badRequest("Missing user ID.");
      }

      if (!body) {
        return badRequest("Missing fields.");
      }

      const allowrdFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "nome",
        "sobrenome",
        "foto",
        "cpf",
        "rg",
        "telefone",
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
        return badRequest("Some received field is not allowed.");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
