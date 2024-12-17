import React from "react";
import Path from "../../components/Path";

const RegresionDemanda = () => {
  return (
    <>
      {/* Path Component */}
      <Path titulo="Estimaciones" pagina="Regresión de la Demanda" />

      <div className="med-container">
        <h2 className="form-title">Regresión de la Demanda</h2>
        <form className="form">
          {/* NOMBRE DEL MEDICAMENTO */}
          <div className="form-group">
            <label htmlFor="nombreMedicamento" className="form-label">
              NOMBRE DEL MEDICAMENTO
            </label>
            <input
              type="text"
              id="nombreMedicamento"
              name="nombreMedicamento"
              className="form-input"
              placeholder="Ingrese el nombre del medicamento"
            />
          </div>

          {/* CÓDIGO DE ITEM (UNIDAD / LOTE) */}
          <div className="form-group">
            <label htmlFor="codigoItem" className="form-label">
              CÓDIGO DE ITEM (UNIDAD / LOTE)
            </label>
            <input
              type="text"
              id="codigoItem"
              name="codigoItem"
              className="form-input"
              placeholder="Ingrese el código de item"
            />
          </div>

          {/* SCAN */}
          <div className="form-group">
            <label htmlFor="scan" className="form-label">
              SCAN
            </label>
            <div className="form-scan">
              <i className="icon-scan"></i>
            </div>
          </div>

          {/* DETALLE DE REGISTRO */}
          <div className="form-group">
            <label htmlFor="detalleRegistro" className="form-label">
              DETALLE DE REGISTRO
            </label>
            <input
              type="text"
              id="detalleRegistro"
              name="detalleRegistro"
              className="form-input"
              placeholder="Ingrese el detalle de registro"
            />
          </div>

          {/* DETALLE DE CONTABILIZACIÓN */}
          <div className="form-group">
            <label htmlFor="detalleContabilizacion" className="form-label">
              DETALLE DE CONTABILIZACIÓN
            </label>
            <input
              type="text"
              id="detalleContabilizacion"
              name="detalleContabilizacion"
              className="form-input"
              placeholder="Ingrese el detalle de contabilización"
            />
          </div>

          {/* INFORMACIÓN AVANZADA */}
          <div className="form-group">
            <label htmlFor="infoAvanzada" className="form-label">
              INFORMACIÓN AVANZADA
            </label>
            <input
              type="text"
              id="infoAvanzada"
              name="infoAvanzada"
              className="form-input"
              placeholder="Ingrese información avanzada"
            />
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Configuración de la Estimación
            </button>
            <button type="submit" className="btn btn-primary">
              Resultados
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegresionDemanda;
