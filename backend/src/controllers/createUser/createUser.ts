import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { User } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const body = HttpRequest?.body;

      const requiredFields: (keyof CreateUserParams)[] = [
        "nome",
        "sobrenome",
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

      for (const field of requiredFields) {
        const fieldValue = body?.[field as keyof CreateUserParams];

        if (
          fieldValue === undefined ||
          fieldValue === null ||
          (typeof fieldValue === "string" && fieldValue.length === 0) ||
          (typeof fieldValue === "number" && isNaN(fieldValue))
        ) {
          return badRequest(`Field ${field} is required.`);
        }
      }

      // Foto field is not required, but need to be in the array for the next validation.
      requiredFields.push("foto");

      const someFieldIsNotAllowedToCreate =
        body &&
        Object.keys(body).some(
          (key) => !requiredFields.includes(key as keyof CreateUserParams)
        );

      if (someFieldIsNotAllowedToCreate) {
        return badRequest("Some received field is not allowed.");
      }

      const user = await this.createUserRepository.createUser(
        HttpRequest.body!
      );

      return created<User>(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
