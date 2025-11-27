import React, { createContext, useState, useContext } from "react";

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Hook para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  // Estado para guardar el token JWT
  const [token, setToken] = useState("FAKE_TOKEN_FOR_DEV_ONLY"); //CAMBIAR CUANDO ESTE LISTO
  const [user, setUser] = useState({
    role: "Cliente",
    name: "Usuario Temporal",
  });
  // Función de Login (recibe el token de la API)
  const login = (jwtToken) => {
    localStorage.setItem("jwt_token", jwtToken);
    setToken(jwtToken);
    // Aquí podrías decodificar el token para obtener el user/rol
    // Por ahora, solo marcamos como logueado
    setUser({ role: "Cliente" }); // Asumimos 'Cliente' por defecto
  };

  // Función de Logout
  const logout = () => {
    localStorage.removeItem("jwt_token");
    setToken(null);
    setUser(null);
  };

  // Valor que se provee a los componentes hijos
  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
