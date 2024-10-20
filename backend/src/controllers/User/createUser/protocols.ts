import { User, Congregacao, Cargo } from "../../../models/user";

export interface CreateUserParams {
  nome: string;
  sobrenome: string;
  foto: string;
  cpf: string;
  rg: string;
  telefone?: string;
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
