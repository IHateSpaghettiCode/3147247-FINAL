// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Proveedor que envuelve toda la app
export function AuthProvider({ children }) {
  // Estado del usuario. Inicialmente null = no logueado
  const [user, setUser] = useState(null);

  // Función para loguearse (aquí lo simulamos sin BD)
  const login = (username, role) => {
    const newUser = { username, role };
    setUser(newUser);

    // Opcional: persistir en localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Al cargar la app, verificamos si ya hay sesión en localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}

