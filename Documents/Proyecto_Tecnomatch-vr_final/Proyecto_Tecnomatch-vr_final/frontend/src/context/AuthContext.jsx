import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.defaults.baseURL = API_BASE;
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  // --- Rutas del backend ---
  const register = async (data) => {
    await axios.post("/users/register", data);
  };

const login = async (credentials) => {
  const res = await axios.post(`${API_BASE}/auth/login`, credentials);
  if (res.data.token && res.data.user) {
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  } else {
    // Si la respuesta no tiene usuario, muestra error
    alert("Error: No se recibió usuario en la respuesta.");
  }
};

  const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

  const fetchProfile = async (id) => {
    const res = await axios.get(`/users/${id}`);
    setUser(res.data);
  };

  const updateProfile = async (id, data) => {
    const res = await axios.put(`/users/${id}`, data);
    setUser(res.data);
  };

  // Cargar usuario desde localStorage al iniciar
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "null") {
    setUser(JSON.parse(storedUser));
  }
}, []);

  // Persistir usuario en localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, fetchProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}