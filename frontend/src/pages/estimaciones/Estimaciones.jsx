import React from "react";
import { Link } from "react-router-dom";
import Path from "../../components/Path";

function Estimaciones() {
  return (
    <>
      <Path titulo={"Estimaciones"} />
      <div className="home-menu">
        <Link to="/estimaciones/analisis">
          <div className="home-menu__item">
            <h2>Análisis de estimaciones</h2>
          </div>
        </Link>
        <Link to="/estimaciones/regresiondemanda">
          <div className="home-menu__item">
            <h2>Regresión de demanda</h2>
          </div>
        </Link>
        <Link to="/estimaciones/regresionoferta">
          <div className="home-menu__item">
            <h2>Regresión de oferta</h2>
          </div>
        </Link>
        <Link to="/estimaciones/reportes">
          <div className="home-menu__item">
            <h2>Reportes</h2>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Estimaciones;
