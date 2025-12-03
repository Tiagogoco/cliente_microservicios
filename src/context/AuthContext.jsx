import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Estado para guardar el token JWT
  const [token, setToken] = useState("FAKE_TOKEN_FOR_DEV_ONLY"); //CAMBIAR CUANDO ESTE LISTO
  const [user, setUser] = useState({
    role: "Cliente",
    name: "Usuario Temporal",
  });
  // (recibe el token de la API)
  const login = (jwtToken, userData) => {
    localStorage.setItem("jwt_token", jwtToken);
    localStorage.setItem("user_data", JSON.stringify(userData)); //
    setToken(jwtToken);
    setUser(userData);
  };

  // Función de Logout
  const logout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data"); //
    setToken(null);
    setUser(null);
  };

  const hasRole = (requiredRole) => {
    return user?.role === requiredRole;
  };
  // Valor que se provee a los componentes hijos
  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
