import React from "react";
import Path from "../../components/Path"; // Asegúrate de importar tu componente Path

const UbicacionVencimiento = () => {
  return (
    <>
      <Path titulo={"Consultas"} pagina={"Ubicacion / Vencimiento"} />
      <div className="med-container">
        <h2 className="form-title">Ubicación y Vencimiento</h2>
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
            <span className="form-input-icon">
              <i className="icon-scan"></i>
            </span>
          </div>

          {/* FECHA DE VENCIMIENTO */}
          <div className="form-group">
            <label htmlFor="fechaVencimiento" className="form-label">
              FECHA DE VENCIMIENTO
            </label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              className="form-input"
            />
          </div>

          {/* UBICACIÓN ACTUAL */}
          <div className="form-group">
            <label htmlFor="ubicacionActual" className="form-label">
              UBICACIÓN ACTUAL
            </label>
            <textarea
              id="ubicacionActual"
              name="ubicacionActual"
              className="form-textarea"
              placeholder="Ingrese la ubicación actual"
            ></textarea>
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Informacion consolidada
            </button>
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UbicacionVencimiento;
