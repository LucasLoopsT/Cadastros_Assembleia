import { badRequest, ok, serverError } from "../../helpers";
import { ILoginAdmRepository, LoginAdmParams } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import bcrypt from "bcrypt";

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

      const { password } = adm;

      console.log("before bcrypt");
      console.log(password);
      console.log(typeof password);

      const passwordIsValid = bcrypt.compareSync(passwordReceived, password);
      console.log("after bcrypt");

      if (!passwordIsValid) {
        return badRequest("User or Password invalid.");
      }

      const token = "123";

      return ok(token);
    } catch (error) {
      return serverError(error);
    }
  }
}
