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
          return {
            statusCode: 400,
            body: `Field ${field} is required.`,
          };
        }
      }

      // Foto field is not required, but need to be in the array for the next validation.
      requiredFields.push("foto");

      const someFieldIsNotAllowedToCreate = Object.keys(body).some(
        (key) => !requiredFields.includes(key as keyof CreateUserParams)
      );

      if (someFieldIsNotAllowedToCreate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed.",
        };
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
