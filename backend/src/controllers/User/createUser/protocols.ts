import { User, Congregacao, Cargo, SexoMembro } from "../../../models/user";

export interface CreateUserParams {
  nome: string;
  sobrenome: string;
  foto: string;
  telefone?: string;
  dataNasc: string;
  /** CPF formatado pelo frontend, ex.: 000.000.000-00 */
  cpf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numEndereco: number;
  congregacao: Congregacao[];
  cargo: Cargo[];
  sexo?: SexoMembro;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
