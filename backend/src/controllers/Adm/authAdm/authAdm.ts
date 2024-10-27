import { badRequest, ok, serverError } from "../../helpers";
import { ILoginAdmRepository, LoginAdmParams } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export class LoginAdmController implements IController {
  constructor(private readonly loginAdmRepository: ILoginAdmRepository) {}
  async handle(
    httpRequest: HttpRequest<LoginAdmParams>
  ): Promise<HttpResponse<string>> {
    try {
      const body = httpRequest?.body;

      const requiredFields: (keyof LoginAdmParams)[] = ["email", "password"];

      for (const field of requiredFields) {
        if (!body?.[field as keyof LoginAdmParams]?.length) {
          return badRequest(`Field ${field} is required.`);
        }
      }

      const someFieldIsNotAllowedToCreate =
        body &&
        Object.keys(body).some(
          (key) => !requiredFields.includes(key as keyof LoginAdmParams)
        );

      if (someFieldIsNotAllowedToCreate) {
        return badRequest("Some received field is not allowed.");
      }

      const passwordReceived = body?.password as string;

      const adm = await this.loginAdmRepository.loginAdm(body!);

      const { id, password } = adm;

      const passwordIsValid = bcrypt.compareSync(passwordReceived, password);

      if (!passwordIsValid) {
        return badRequest("User or Password invalid.");
      }

      const token = jwt.sign({ id: id }, process.env.SECRET_JWT as Secret, {
        expiresIn: 86400,
      });

      return ok(token);
    } catch (error) {
      return serverError(error);
    }
  }
}
