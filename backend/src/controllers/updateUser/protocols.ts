import { User, Congregacao, Cargo } from "../../models/user";
import { HttpResponse, HttpRequest } from "../protocols";

export interface IUpdateUserController {
  handle(
    HttpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User>>;
}

export interface UpdateUserParams {
  nome?: string;
  sobrenome?: string;
  foto?: string;
  cpf?: string;
  rg?: string;
  telefone?: string;
  dataNasc?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numEndereco?: number;
  congregacao?: Congregacao[];
  cargo?: Cargo[];
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
