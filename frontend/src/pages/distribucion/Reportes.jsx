import React from "react";
import Path from "../../components/Path";

const Reportes = () => {
  return (
    <>
      {/* Path Component */}
      <Path titulo="Distribución" pagina="Reportes" />

      <div className="med-container">
        <h2 className="form-title">Reportes</h2>
        <form className="form">
          {/* DETALLES E INCIDENCIAS */}
          <div className="form-group">
            <label htmlFor="detallesIncidencias" className="form-label">
              Reportes
            </label>
            <textarea
              id="detallesIncidencias"
              name="detallesIncidencias"
              className="form-textarea"
            ></textarea>
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Filtros Avanzados
            </button>
            <button type="submit" className="btn btn-primary">
              Busqueda
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Reportes;
