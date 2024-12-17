import React from "react";
import Path from "../../components/Path";

const Analisis = () => {
  return (
    <>
      {/* Path Component */}
      <Path titulo="Estimaciones" pagina="Análisis de Estimaciones" />

      <div className="med-container">
        <h2 className="form-title">Análisis de Estimaciones</h2>
        <form className="form">
          {/* IDENTIFICACION DE VARIABLES */}
          <div className="form-group">
            <label htmlFor="identificacionVariables" className="form-label">
              IDENTIFICACION DE VARIABLES
            </label>
            <input
              type="text"
              id="identificacionVariables"
              name="identificacionVariables"
              className="form-input"
              placeholder="Ingrese la identificación de variables"
            />
          </div>

          {/* MÉTODO DE ESTIMACIÓN */}
          <div className="form-group">
            <label htmlFor="metodoEstimacion" className="form-label">
              MÉTODO DE ESTIMACIÓN
            </label>
            <input
              type="text"
              id="metodoEstimacion"
              name="metodoEstimacion"
              className="form-input"
              placeholder="Ingrese el método de estimación"
            />
          </div>

          {/* ERROR DE PRECISIÓN */}
          <div className="form-group">
            <label htmlFor="errorPrecision" className="form-label">
              ERROR DE PRECISIÓN
            </label>
            <input
              type="text"
              id="errorPrecision"
              name="errorPrecision"
              className="form-input"
              placeholder="Ingrese el error de precisión"
            />
          </div>

          {/* PRUEBA DE ESTIMACIÓN */}
          <div className="form-group">
            <label htmlFor="pruebaEstimacion" className="form-label">
              PRUEBA DE ESTIMACIÓN
            </label>
            <textarea
              id="pruebaEstimacion"
              name="pruebaEstimacion"
              className="form-textarea"
              placeholder="Ingrese la prueba de estimación"
            ></textarea>
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Configuración de Escenario
            </button>
            <button type="submit" className="btn btn-primary">
              Registro
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Analisis;
