import { HttpRequest, HttpResponse, IController } from "../../protocols";
import {
  IUpdateAdmRepository,
  UpdateAdmParams,
  prepareAdmParams,
} from "./protocols";
import { badRequest, ok, serverError } from "../../helpers";
import { Adm } from "../../../models/adm";

export class UpdateAdmController implements IController {
  constructor(private readonly updateAdmRepository: IUpdateAdmRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateAdmParams>
  ): Promise<HttpResponse<Adm | string>> {
    try {
      const id = httpRequest?.params;
      const body = httpRequest?.body;

      if (!id) {
        return badRequest("Missing admin ID.");
      }

      if (!body) {
        return badRequest("Missing fields.");
      }

      const allowrdFieldsToUpdate: (keyof UpdateAdmParams)[] = [
        "nome",
        "email",
        "password",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowrdFieldsToUpdate.includes(key as keyof UpdateAdmParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed.");
      }

      const admData = await prepareAdmParams(body!);

      const adm = await this.updateAdmRepository.updateUser(id, admData);

      const { password, ...admWithoutPassword } = adm;

      return ok<Adm>(admWithoutPassword);
    } catch (error) {
      return serverError(error);
    }
  }
}
