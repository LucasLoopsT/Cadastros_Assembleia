import { User } from "../../models/user";

export interface CreateUserParams {
  nome: string;
  sobrenome: string;
  cpf: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
