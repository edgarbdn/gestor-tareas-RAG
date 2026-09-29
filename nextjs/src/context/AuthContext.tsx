"use client";

import { createContext, useState, useContext } from "react";

interface AuthContextType {
  estaLogueado: boolean;
  setEstaLogueado: (valor: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  estaLogueadoInicial: boolean;
}

function AuthProvider({ children, estaLogueadoInicial }: AuthProviderProps) {
  const [estaLogueado, setEstaLogueado] = useState(estaLogueadoInicial);

  return (
    <AuthContext.Provider value={{ estaLogueado, setEstaLogueado }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return contexto;
}

export { AuthContext, AuthProvider, useAuth };
