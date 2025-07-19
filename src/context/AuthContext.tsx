
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
  nombre: string;
  apellido: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  handleUnauthorized: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("token");
      return stored ? jwtDecode(stored) : null
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          logout();
          window.location.href = "/";
        }
      } catch (e) {
        logout();
        window.location.href = "/";
      }
    }
    // eslint-disable-next-line
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    setUser(jwtDecode(newToken));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const handleUnauthorized = () => {
    const navigate = useNavigate();
    logout();
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, handleUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
