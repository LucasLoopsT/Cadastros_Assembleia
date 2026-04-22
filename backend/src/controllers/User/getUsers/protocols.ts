import { User } from "../../../models/user";

export type GetUsersPaginatedOptions = {
  q?: string;
  /** Campo usado com `q` (nome, sobrenome, cidade, bairro, cargo). */
  field?: string;
};

/** `page` é a página efetiva após clamp (1 … maxPage), derivada do parâmetro `page` da requisição. */
export type GetUsersPaginatedResult = {
  users: User[];
  total: number;
  page: number;
};

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
  getUsersPaginated(
    page: number,
    limit: number,
    options?: GetUsersPaginatedOptions
  ): Promise<GetUsersPaginatedResult>;
}
