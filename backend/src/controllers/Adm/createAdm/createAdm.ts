import { badRequest, created, serverError } from "../../helpers";
import { CreateAdmParams, ICreateAdmRepository } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { Adm } from "../../../models/adm";

export class CreateAdmController implements IController {
  constructor(private readonly createAdmRepository: ICreateAdmRepository) {}
  async handle(
    httpRequest: HttpRequest<CreateAdmParams>
  ): Promise<HttpResponse<Adm | string>> {
    try {
      const body = httpRequest?.body;

      const requiredFields: (keyof CreateAdmParams)[] = [
        "nome",
        "email",
        "password",
      ];

      for (const field of requiredFields) {
        if (!body?.[field as keyof CreateAdmParams]?.length) {
          return badRequest(`Field ${field} is required.`);
        }
      }

      const someFieldIsNotAllowedToCreate =
        body &&
        Object.keys(body).some(
          (key) => !requiredFields.includes(key as keyof CreateAdmParams)
        );

      if (someFieldIsNotAllowedToCreate) {
        return badRequest("Some received field is not allowed.");
      }

      const adm = await this.createAdmRepository.createAdm(body!);

      const { password, ...admWithoutPassword } = adm;

      return created<Adm>(admWithoutPassword);
    } catch (error) {
      return serverError(error);
    }
  }
}
