import React from "react";
import { Link } from "react-router-dom";
import Path from "../../components/Path";

function Consulta() {
  return (
    <>
      <Path titulo={"Consultas"} />
      <div className="home-menu">
        <Link to="/consulta/stock">
          <div className="home-menu__item">
            <h2>Stock del medicamento</h2>
          </div>
        </Link>
        <Link to="/consulta/ubicacionvencimiento">
          <div className="home-menu__item">
            <h2>Ubicación / vencimiento</h2>
          </div>
        </Link>
        <Link to="/consulta/trazabilidad">
          <div className="home-menu__item">
            <h2>Trazabilidad</h2>
          </div>
        </Link>
        <Link to="/consulta/marcos-contractuales">
          <div className="home-menu__item">
            <h2> Marcos contractuales</h2>
          </div>
        </Link>
        <Link to="/consulta/proveedores">
          <div className="home-menu__item">
            <h2>Proveedores</h2>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Consulta;
