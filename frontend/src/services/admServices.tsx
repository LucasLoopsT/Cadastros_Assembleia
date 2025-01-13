import axios from "axios";

const baseURL = "localhost:3000";

export function login(email: string, password: string) {
  const response = axios.post(`${baseURL}/login`, { email, password });
  return response;
}
