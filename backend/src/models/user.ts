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

export interface User {
  nome: string;
  sobrenome: string;
  foto: string;
  cpf: string;
  rg: string;
  dataNasc: Date;
  cidade: string;
  bairro: string;
  rua: string;
  numEndereco: number;
  concregacao: Congregacao[];
  cargo: Cargo[];
}
