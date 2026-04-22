export enum Congregacao {
  VilaNova = "Vila Nova",
  VilaNatal = "Vila Natal",
  VilaFabril = "Vila Fabril",
  VilaElizabeth = "Vila Elizabeth",
  VilaSaoJose = "Vila São José",
  VilaEsperanca = "Vila Esperança",
  VilaPaulista = "Vila Paulista",
}

export enum Cargo {
  Membro = "Membro",
  Diacono = "Diácono",
  Presbitero = "Presbítero",
  Missionario = "Missionário(a)",
  Evangelista = "Evangelista",
  Pastor = "Pastor",
}

export type SexoMembro = "Masculino" | "Feminino";

export interface User {
  id: string;
  nome: string;
  sobrenome: string;
  foto: string;
  dataNasc: string;
  telefone: string;
  /** CPF formatado (ex.: 000.000.000-00). Persistido criptografado no MongoDB. */
  cpf?: string;
  cidade: string;
  bairro: string;
  rua: string;
  numEndereco: number;
  congregacao: Congregacao[];
  cargo: Cargo[];
  /** Opcional: usado em relatórios e visão geral. */
  sexo?: SexoMembro;
}
