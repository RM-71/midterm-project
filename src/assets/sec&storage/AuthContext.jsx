import React, { createContext, useContext } from "react";
import useLocalStorage from "./useLocalStorage";

/**
 * Auth context: simple boolean isLoggedIn persisted with useLocalStorage.
 * - No navigation here (navigation must be done inside components).
 */
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
