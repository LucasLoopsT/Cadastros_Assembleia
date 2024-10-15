export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  body: B;
  // param?: any;
  // headers?: any;
}
