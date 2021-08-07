import React, { useState, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const useAuth = (initial: string | null) => useState<string | null>(initial);

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export const useAuthContext = () => useContext(AuthContext)!;
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let getToken: any = (async function () {
    getToken = await SecureStore.getItemAsync("Authorization");
    return;
  })();
  return (
    <AuthContext.Provider value={useAuth(getToken)}>
      {children}
    </AuthContext.Provider>
  );
}
