import React from "react";
import styles from "../styles/App.module.css"; 
import Fondo from "/Fondo.png"
import { Link } from "react-router-dom";

const careers = [
  {
    name: "Ingeniería de Software",
    university: "Universidad Nacional de Colombia",
    image: "https://worldcampus.saintleo.edu/img/article/estudiar-ingenieria-en-sistemas-cuales-son-los-retos-de-ser-ingenierio-en-sistemas.webp",
    link: "/career/ingenieria-de-software"
  },
  {
    name: "Arquitectura de Software",
    university: "Universidad de los Andes",
    image: "https://pregrado.upc.edu.pe/facultad-de-ingenieria/ingenieria-de-software/img/Malla_curricular_especializada.jpg",
    link: "/career/arquitectura-de-software"
  },
  {
    name: "Ciencia de Datos",
    university: "Universidad Javeriana",
    image: "https://innovus.press/wp-content/uploads/2023/01/ciencia_datos.jpg",
    link: "/career/ciencia-de-datos"
  },
  {
    name: "Investigación en IA",
    university: "Universidad EAFIT",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURy8Uc-FfEra_f0Q1gpZ6oQD5RAxQpsKewA&s",
    link: "/career/investigacion-en-ia"
  },
];

function CareerCards() {
  return (
    <div className={styles.careerCards} style={{ backgroundImage: `url(${Fondo})` }}>
      {careers.map((career, index) => (
        <div className={styles.careerCard} key={index}>
          <Link to={career.link}>
            <img src={career.image} alt={career.name} className={styles.careerImage} />
          </Link>          
          <h3>{career.name}</h3>
          <p>{career.university}</p>
        </div>
      ))}
    </div>
  );
}

export default CareerCards;
