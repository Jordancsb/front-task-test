import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  getBearerToken: () => string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  };

  const clearToken = () => {
    setTokenState(null);
    localStorage.removeItem("authToken");
  };

 
    const getBearerToken = (): string | null => {
      if (!token) return null;
      if (token.startsWith("Bearer ")) {
        return token; 
      }
      return `Bearer ${token}`;
    };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, getBearerToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
