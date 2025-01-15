import React from "react";
import { Link } from "react-router-dom";
import Path from "../../components/Path";

function Distribucion() {
  return (
    <>
      <Path titulo={"Distribución"} />
      <div className="home-menu">
        <Link to="/distribucion/ingresomedicamentos">
          <div className="home-menu__item">
            <h2>Ingreso de Medicamentos</h2>
          </div>
        </Link>
        <Link to="/distribucion/salidademedicamentos">
          <div className="home-menu__item">
            <h2>Salida de Medicamentos</h2>
          </div>
        </Link>
        <Link to="/distribucion/contabilizaciones">
          <div className="home-menu__item">
            <h2>Contabilizaciones</h2>
          </div>
        </Link>
        <Link to="/distribucion/reportes">
          <div className="home-menu__item">
            <h2>Reportes</h2>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Distribucion;
