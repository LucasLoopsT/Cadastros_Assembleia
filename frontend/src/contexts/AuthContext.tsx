import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { login as loginRequest } from "../services/admServices";
import { getStoredToken, setStoredToken } from "../lib/api";

type AuthContextValue = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginRequest(email, password);
    const raw =
      typeof data === "string" ? data : (data as { token?: string })?.token;
    if (!raw || typeof raw !== "string") {
      throw new Error("Resposta de login inválida.");
    }
    setStoredToken(raw);
    setToken(raw);
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ token, login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
