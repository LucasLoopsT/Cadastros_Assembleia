import { IGetUsersRepository } from "../../controllers/getUsers/protocols";
import { User, Congregacao, Cargo } from "../../models/user";

export class MongoGetUserRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        nome: "Fulano",
        sobrenome: "Santos",
        foto: ".png",
        cpf: "123.456.789-00",
        rg: "00.000.000-0",
        dataNasc: "10/10/2024",
        cidade: "São Paulo",
        bairro: "Paulista",
        rua: "Rua da alegria",
        numEndereco: 837,
        concregacao: [Congregacao.VilaNatal],
        cargo: [Cargo.Membro],
      },
    ];
  }
}
