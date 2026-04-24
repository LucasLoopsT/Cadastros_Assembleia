import { User, Congregacao, Cargo, SexoMembro } from "../../../models/user";

export interface UpdateUserParams {
  nome?: string;
  sobrenome?: string;
  foto?: string;
  telefone?: string;
  dataNasc?: string;
  cpf?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numEndereco?: number;
  congregacao?: Congregacao[];
  cargo?: Cargo[];
  sexo?: SexoMembro;
  observation?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
