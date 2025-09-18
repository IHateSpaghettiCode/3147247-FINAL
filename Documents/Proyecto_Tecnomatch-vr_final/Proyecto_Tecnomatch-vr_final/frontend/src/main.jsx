import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FormularioPage from "./pages/FormularioPage.jsx";
import CareerModule from "./componentes/CareerModule.jsx";
import UserZonePage from "./pages/UserZonePage.jsx";
import QuizPage from "./pages/Quizpage.jsx";
import UsersAdmin from "./componentes/UsersAdmin";
import CareersAdmin from "./componentes/CareersAdmin";
import ReportsAdmin from "./componentes/ReportsAdmin";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/personality/:type" element={<FormularioPage />} />
          <Route path="/career/*" element={<CareerModule />} />
          <Route path="/User" element={<UserZonePage />} />
          <Route path="/Quiz/*" element={<QuizPage />} />
          <Route path="/users" element={<UsersAdmin />} />
          <Route path="/careers" element={<CareersAdmin />} />
          <Route path="/reports" element={<ReportsAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);