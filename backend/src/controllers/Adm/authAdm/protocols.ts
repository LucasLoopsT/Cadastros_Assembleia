export interface LoginAdmParams {
  email: string;
  password: string;
}

export interface ILoginAdmRepository {
  loginAdm(params: LoginAdmParams): Promise<unknown>;
}
