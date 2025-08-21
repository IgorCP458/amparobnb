// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import api from "./api";

type User = {
  name: string;
  avatar: string
  id: string;
  email: string;
} | null;

type LoginResponse = {
  isLogged: boolean
}

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  // quando a página carrega, já checa se o token ainda é válido
  useEffect(() => {
    (async () => {
      const response = await api.post('/users/auth/me')
      setUser(response.data.user)
    }) ()
  }, []);

  async function login(email: string, password: string) {
    const response = await api.post('/users/signin', JSON.stringify({loginParams: {email, password}}))
    const res = await api.post("/users/auth/me");
    setUser(res.data.user);
    if(response.data.isLogged) {
      return { isLogged: true }
    } else {
      return {isLogged: false}
    }

  }

  function logout() {
    const response = api.post('/users/logout')
    console.log("Logout")
    setUser(null);
    // opcional: chamar /api/logout no backend para apagar cookie
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
