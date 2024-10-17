import { User, Congregacao, Cargo } from "../../models/user";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateUserController {
  handle(
    HttpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUserParams {
  nome: string;
  sobrenome: string;
  foto: string;
  cpf: string;
  rg: string;
  dataNasc: string;
  cidade: string;
  bairro: string;
  rua: string;
  numEndereco: number;
  congregacao: Congregacao[];
  cargo: Cargo[];
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
