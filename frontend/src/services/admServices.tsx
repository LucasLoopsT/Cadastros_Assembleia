import { api } from "../lib/api";

export type AdminUser = {
  id: string;
  nome: string;
  email: string;
};

export function login(email: string, password: string) {
  return api.post<string>("/adm/login", { email, password });
}

export function getAdmins() {
  return api.get<AdminUser[]>("/adm/");
}

export function createAdmin(body: {
  nome: string;
  email: string;
  password: string;
}) {
  return api.post<AdminUser>("/adm/", body);
}

export function updateAdmin(
  id: string,
  body: { nome?: string; email?: string; password?: string }
) {
  return api.patch<AdminUser>(`/adm/${id}`, body);
}

export function deleteAdmin(id: string) {
  return api.delete<AdminUser>(`/adm/${id}`);
}
