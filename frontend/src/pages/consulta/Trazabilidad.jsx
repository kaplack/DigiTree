import React from "react";
import Path from "../../components/Path";

const Trazabilidad = () => {
  return (
    <>
      <Path titulo={"Consultas"} pagina={"Trazabilidad"} />
      <div className="med-container">
        <h2 className="form-title">Trazabilidad</h2>
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

          {/* TRAZABILIDAD / FECHAS */}
          <div className="form-group">
            <label htmlFor="trazabilidadFechas" className="form-label">
              TRAZABILIDAD / FECHAS
            </label>
            <textarea
              id="trazabilidadFechas"
              name="trazabilidadFechas"
              className="form-textarea"
              placeholder="Ingrese la trazabilidad o fechas"
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

export default Trazabilidad;
