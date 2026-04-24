import type { Filter } from "mongodb";
import type {
  GetUsersPaginatedOptions,
  GetUsersPaginatedResult,
  IGetUsersRepository,
} from "../../../controllers/User/getUsers/protocols";
import { User } from "../../../models/user";
import { MongoClient } from "../../../database/mongo";
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ALLOWED_FILTER_FIELDS = new Set([
  "nome",
  "sobrenome",
  "cidade",
  "bairro",
  "cargo",
]);

export class MongoGetUserRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({}, { projection: { cpf: 0 } })
      .toArray();

    return users.map(({ _id, ...rest }) => {
      const mapped = { id: _id.toHexString(), ...rest } as User;
      return mapped;
    });
  }

  async getUsersPaginated(
    page: number,
    limit: number,
    options?: GetUsersPaginatedOptions
  ): Promise<GetUsersPaginatedResult> {
    const col = MongoClient.db.collection<Omit<User, "id">>("users");
    const filter: Filter<Omit<User, "id">> = {};

    const q = options?.q?.trim();
    const rawField = options?.field?.toLowerCase().trim() || "nome";
    const field = ALLOWED_FILTER_FIELDS.has(rawField) ? rawField : "nome";

    if (q && q.length > 0) {
      const rx = new RegExp(escapeRegex(q), "i");
      (filter as Record<string, unknown>)[field] = rx;
    }

    const total = await col.countDocuments(filter);
    const maxPage = Math.max(1, Math.ceil(total / limit));
    /** Página efetiva: parâmetro `page` limitado ao intervalo válido. */
    const effectivePage = Math.min(Math.max(1, page), maxPage);
    const skip = (effectivePage - 1) * limit;

    const docs = await col
      .find(filter, { projection: { cpf: 0 } })
      .sort({ nome: 1, sobrenome: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const users = docs.map(({ _id, ...rest }) => {
      const mapped = { id: _id.toHexString(), ...rest } as User;
      return mapped;
    });

    return { users, total, page: effectivePage };
  }
}
