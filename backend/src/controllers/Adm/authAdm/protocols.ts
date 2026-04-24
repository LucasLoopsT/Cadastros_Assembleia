export interface LoginAdmParams {
  id: string;
  email: string;
  password: string;
  nome?: string;
}

export interface ILoginAdmRepository {
  loginAdm(params: LoginAdmParams): Promise<LoginAdmParams>;
}
