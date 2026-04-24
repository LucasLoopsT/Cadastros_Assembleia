import { User } from "../../../models/user";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";
import { isValidFormattedCpf } from "../../../lib/cpfCrypto";

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
        "telefone",
        "dataNasc",
        "cpf",
        "cidade",
        "bairro",
        "rua",
        "numEndereco",
        "congregacao",
        "cargo",
        "sexo",
        "observation",
      ];

      if (
        body.observation !== undefined &&
        body.observation !== null &&
        typeof body.observation !== "string"
      ) {
        return badRequest("Field observation must be a string.");
      }

      if (
        body.cpf !== undefined &&
        body.cpf !== null &&
        String(body.cpf).length > 0 &&
        !isValidFormattedCpf(String(body.cpf))
      ) {
        return badRequest("Invalid CPF format. Expected 000.000.000-00.");
      }

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
