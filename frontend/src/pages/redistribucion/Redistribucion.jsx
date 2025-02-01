import React from "react";
import { Link } from "react-router-dom";
import Path from "../../components/Path";

function Redistribucion() {
  return (
    <>
      {/* <Slider /> */}
      <Path titulo={"Redistribución"} />
      <div className="home-menu">
        <Link to="/redistribucion/ingresomedicamentos">
          <div className="home-menu__item">
            <h2>Reasignación de Medicamentos</h2>
          </div>
        </Link>
        {/* <Link to="/redistribucion/salidademedicamentos">
          <div className="home-menu__item">
            <h2>Salida de Medicamentos</h2>
          </div>
        </Link> */}
        <Link to="/redistribucion/contabilizaciones">
          <div className="home-menu__item">
            <h2>Contabilizaciones</h2>
          </div>
        </Link>
        <Link to="/redistribucion/reportes">
          <div className="home-menu__item">
            <h2>Reportes</h2>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Redistribucion;
