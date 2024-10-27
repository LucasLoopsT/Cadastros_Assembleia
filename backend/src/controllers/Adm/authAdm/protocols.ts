export interface LoginAdmParams {
  id: string;
  email: string;
  password: string;
}

export interface ILoginAdmRepository {
  loginAdm(params: LoginAdmParams): Promise<LoginAdmParams>;
}
