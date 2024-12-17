import React from "react";
import Path from "../../components/Path";

const Proveedores = () => {
  return (
    <div>
      {/* PATH */}
      <Path titulo="Consultas" pagina="Proveedores" />

      <div className="med-container">
        <h2 className="form-title">Proveedores</h2>
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

          {/* NOMBRE DEL PROVEEDOR */}
          <div className="form-group">
            <label htmlFor="nombreProveedor" className="form-label">
              NOMBRE DEL PROVEEDOR
            </label>
            <input
              type="text"
              id="nombreProveedor"
              name="nombreProveedor"
              className="form-input"
              placeholder="Ingrese el nombre del proveedor"
            />
          </div>

          {/* RUC DEL PROVEEDOR */}
          <div className="form-group">
            <label htmlFor="rucProveedor" className="form-label">
              RUC DEL PROVEEDOR
            </label>
            <input
              type="text"
              id="rucProveedor"
              name="rucProveedor"
              className="form-input"
              placeholder="Ingrese el RUC del proveedor"
            />
          </div>

          {/* DETALLE DE MEDICAMENTOS PROVEÍDOS */}
          <div className="form-group">
            <label htmlFor="detalleMedicamentos" className="form-label">
              DETALLE DE MEDICAMENTOS PROVEÍDOS
            </label>
            <input
              type="text"
              id="detalleMedicamentos"
              name="detalleMedicamentos"
              className="form-input"
              placeholder="Ingrese detalles de los medicamentos"
            />
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Incidencias Ocurridas
            </button>
            <button type="submit" className="btn btn-reverse">
              Informacion consolidada
            </button>
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Proveedores;
