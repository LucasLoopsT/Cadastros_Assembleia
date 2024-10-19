import { HttpResponse, HttpStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CRETED,
  body: body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = (error: unknown): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: `Something went wrong: ${error}.`,
  };
};
