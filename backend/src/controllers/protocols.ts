export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<B> {
  body?: B;
  params?: any;
  headers?: any;
  query?: Record<string, unknown>;
  /** Opcional: preenchido nas rotas protegidas por `authMiddleware`. */
  admId?: string;
}

export enum HttpStatusCode {
  OK = 200,
  CRETED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
