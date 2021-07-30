import React from "react";
import { useState, createContext, useContext } from "react";
const useAuth = (initial: string|null) => useState<string|null>(initial);

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

export const useAuthContext = () => useContext(AuthContext)!;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={useAuth(null)}>
      {children}
    </AuthContext.Provider>
  );
}
