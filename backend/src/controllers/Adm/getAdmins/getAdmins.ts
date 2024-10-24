import { IGetAdminsRepository } from "./protocols";
import { IController } from "../../protocols";
import { Adm } from "../../../models/adm";
import { ok, serverError } from "../../helpers";

export class GetAdminsController implements IController {
  constructor(private readonly getAdminsRepository: IGetAdminsRepository) {}

  async handle() {
    try {
      const admins = await this.getAdminsRepository.getAdmins();

      return ok<Adm[]>(admins);
    } catch (error) {
      return serverError(error);
    }
  }
}
