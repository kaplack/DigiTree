import React from "react";
import { Link } from "react-router-dom";
import Path from "../../components/Path";

function Compra() {
  return (
    <>
      <Path titulo={"Compras"} />
      <div className="home-menu">
        <Link to="/compras/regulares">
          <div className="home-menu__item">
            <h2>Compras regulares</h2>
          </div>
        </Link>
        <Link to="/compras/automaticas">
          <div className="home-menu__item">
            <h2>Compras automáticas</h2>
          </div>
        </Link>
        <Link to="/compras/configuracion">
          <div className="home-menu__item">
            <h2>Configuración</h2>
          </div>
        </Link>
        <Link to="/compras/estadisticas">
          <div className="home-menu__item">
            <h2> Estadísticas</h2>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Compra;
