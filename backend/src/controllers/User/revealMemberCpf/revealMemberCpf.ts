import bcrypt from "bcrypt";
import { badRequest, ok, serverError, unauthorized } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import type {
  IGetAdmPasswordHashRepository,
  IRevealMemberCpfRepository,
  RevealMemberCpfBody,
  RevealMemberCpfResponse,
} from "./protocols";

export class RevealMemberCpfController implements IController {
  constructor(
    private readonly getAdmPasswordHashRepository: IGetAdmPasswordHashRepository,
    private readonly revealMemberCpfRepository: IRevealMemberCpfRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<RevealMemberCpfBody>,
  ): Promise<HttpResponse<RevealMemberCpfResponse | string>> {
    try {
      const memberId = httpRequest?.params?.id;
      const admId = httpRequest?.admId;
      const body = httpRequest?.body;

      if (!memberId) {
        return badRequest("Missing user ID.");
      }

      if (!admId) {
        return unauthorized("Sessão inválida.");
      }

      if (!body?.password?.length) {
        return badRequest("Field password is required.");
      }

      const extraKeys = Object.keys(body).filter((k) => k !== "password");
      if (extraKeys.length) {
        return badRequest("Some received field is not allowed.");
      }

      const hash =
        await this.getAdmPasswordHashRepository.getPasswordHashByAdmId(admId);

      if (!hash) {
        return unauthorized("Administrador não encontrado.");
      }

      const passwordOk = bcrypt.compareSync(body.password, hash);
      if (!passwordOk) {
        return unauthorized("Senha incorreta.");
      }

      const cpf =
        await this.revealMemberCpfRepository.getDecryptedCpfByMemberId(
          memberId,
        );

      if (!cpf) {
        return badRequest("Este membro não possui CPF cadastrado.");
      }

      return ok<RevealMemberCpfResponse>({ cpf });
    } catch (error) {
      return serverError(error);
    }
  }
}
