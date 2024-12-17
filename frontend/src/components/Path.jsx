import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaQuestion,
  FaCartPlus,
  FaAmbulance,
  FaRecycle,
  FaChartLine,
} from "react-icons/fa";

function Path({ titulo, pagina }) {
  const namesLinks = [
    { titulo: "Home", link: "/", icon: <FaHome /> },
    { titulo: "Consultas", link: "/consultas", icon: <FaQuestion /> },
    { titulo: "Compras", link: "/compras", icon: <FaCartPlus /> },
    { titulo: "Distribución", link: "/distribucion", icon: <FaAmbulance /> },
    { titulo: "Redistribución", link: "/redistribucion", icon: <FaRecycle /> },
    { titulo: "Estimaciones", link: "/estimaciones", icon: <FaChartLine /> },
  ];

  // Buscar el enlace y el icono correspondientes al título
  const currentLink = namesLinks.find((item) => item.titulo === titulo);

  return (
    <div className="path">
      <p>
        <Link to="/">
          <FaHome />
          Inicio
        </Link>{" "}
        &gt;{" "}
        {currentLink ? (
          <Link to={currentLink.link}>
            {currentLink.icon} {currentLink.titulo}
          </Link>
        ) : (
          titulo // En caso de que el título no se encuentre
        )}{" "}
        &gt; {pagina}
      </p>
    </div>
  );
}

export default Path;
