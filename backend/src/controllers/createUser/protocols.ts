import { User } from "../../models/user";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateUserController {
  handle(
    HttpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
  nome: string;
  sobrenome: string;
  cpf: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
