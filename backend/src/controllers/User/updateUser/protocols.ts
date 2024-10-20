import { User, Congregacao, Cargo } from "../../../models/user";

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
