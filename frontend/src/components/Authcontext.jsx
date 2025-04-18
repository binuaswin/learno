// src/components/AuthContext.jsx
import { createContext, useContext } from "react";

// Context
export const AuthContext = createContext();

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
