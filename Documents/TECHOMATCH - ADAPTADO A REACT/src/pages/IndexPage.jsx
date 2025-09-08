import React from "react";
import Header from "../componentes/Header";
import Welcome from "../componentes/Welcome";
import MainContent from "../componentes/MainContent";
import CareerCards from "../componentes/CareerCards";
import Carousel from "../componentes/Carousel";
import Footer from "../componentes/Footer";
import Fondo from "/Fondo.png";
import { useAuth } from "../context/AuthContext"; // 🔹 usamos el contexto

function IndexPage() {
  return (
    <>
    <div style={{ 
      backgroundImage: `url(${Fondo})`,
      backgroundSize: 'cover'}}>
      <Header />
      <Welcome />
      <Carousel />
      <MainContent />
      <Footer />
    </div>
    </>
  );
}

export default IndexPage;
