import { Adm } from "../../../models/adm";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteAdmRepository } from "./protocols";

export class DeleteAdmController implements IController {
  constructor(private readonly deleteAdmRepository: IDeleteAdmRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<Adm | string>> {
    try {
      const id = httpRequest?.params.id;

      if (!id) {
        return badRequest("Missing admin ID.");
      }

      const adm = await this.deleteAdmRepository.deleteAdm(id);

      return ok<Adm>(adm);
    } catch (error) {
      return serverError(error);
    }
  }
}
