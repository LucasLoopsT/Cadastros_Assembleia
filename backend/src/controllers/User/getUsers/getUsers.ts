import { IGetUsersRepository } from "./protocols";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { User } from "../../../models/user";
import { ok, serverError } from "../../helpers";

export type PaginatedUsersBody = {
  items: User[];
  total: number;
  page: number;
  limit: number;
};

function parseQueryString(v: unknown): string | undefined {
  if (v === undefined || v === null) return undefined;
  if (Array.isArray(v)) return parseQueryString(v[0]);
  const s = String(v).trim();
  return s.length ? s : undefined;
}

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(
    httpRequest?: HttpRequest<unknown>
  ): Promise<HttpResponse<User[] | PaginatedUsersBody | string>> {
    try {
      const query = httpRequest?.query ?? {};
      const pageRaw = parseQueryString(query.page);

      if (pageRaw === undefined) {
        const users = await this.getUsersRepository.getUsers();
        return ok<User[]>(users);
      }

      const page = Math.max(1, parseInt(pageRaw, 10) || 1);
      const limitRaw = parseQueryString(query.limit);
      const limit = Math.min(
        100,
        Math.max(1, limitRaw ? parseInt(limitRaw, 10) || 12 : 12)
      );

      const q = parseQueryString(query.q);
      const field = parseQueryString(query.field);

      const { users, total, page: effectivePage } =
        await this.getUsersRepository.getUsersPaginated(page, limit, {
          q,
          field,
        });

      const body: PaginatedUsersBody = {
        items: users,
        total,
        page: effectivePage,
        limit,
      };

      return ok<PaginatedUsersBody>(body);
    } catch (error) {
      return serverError(error);
    }
  }
}
