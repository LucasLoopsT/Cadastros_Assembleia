export type SexoMembro = "Masculino" | "Feminino";

export type MemberListItem = {
  id: string;
  nome: string;
  sobrenome: string;
  foto: string;
  dataNasc: string;
  telefone: string;
  /** CPF formatado (ex.: 000.000.000-00). O backend persiste criptografado. */
  cpf?: string;
  cidade: string;
  bairro: string;
  rua: string;
  numEndereco: number;
  congregacao: string[] | string;
  cargo: string[] | string;
  sexo?: SexoMembro;
  observation?: string;
};

/** Resposta de `GET /users/?page=&limit=` */
export type MembersPageResponse = {
  items: MemberListItem[];
  total: number;
  page: number;
  limit: number;
};

export type MemberPayload = {
  nome: string;
  sobrenome: string;
  foto: string;
  dataNasc: string;
  telefone: string;
  cpf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numEndereco: number;
  congregacao: string[];
  cargo: string[];
  sexo?: SexoMembro;
  observation?: string;
};
