import React from "react";
import Path from "../../components/Path";

const Configuracion = () => {
  return (
    <>
      {/* Path Component */}
      <Path titulo="Compras" pagina="Configuración" />

      <div className="med-container">
        <h2 className="form-title">Configuración</h2>
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
              placeholder="Ingrese el código del ítem"
            />
          </div>

          {/* SCAN */}
          <div className="form-group">
            <label htmlFor="scan" className="form-label">
              SCAN
            </label>
            <input
              type="icon"
              id="scan"
              name="scan"
              className="form-input"
              placeholder="Escanee el código"
            />
          </div>

          {/* SELECCIONAR PROVEEDOR */}
          <div className="form-group">
            <label htmlFor="seleccionarProveedor" className="form-label">
              SELECCIONAR PROVEEDOR
            </label>
            <input
              type="text"
              id="seleccionarProveedor"
              name="seleccionarProveedor"
              className="form-input"
              placeholder="Seleccione el proveedor"
            />
          </div>

          <div className="form-row">
            {/* CONF. STOCK MÍNIMO */}
            <div className="form-group">
              <label htmlFor="confStockMinimo" className="form-label">
                CONF. STOCK MÍNIMO
              </label>
              <input
                type="text"
                id="confStockMinimo"
                name="confStockMinimo"
                className="form-input"
                placeholder="Configure el stock mínimo"
              />
            </div>

            {/* ESTADIST. (MIN) */}
            <div className="form-group">
              <label htmlFor="estadisticasMin" className="form-label">
                ESTADIST.
              </label>
              <input
                type="text"
                id="estadisticasMin"
                name="estadisticasMin"
                className="form-input"
                placeholder="Ingrese estadísticas"
              />
            </div>
          </div>

          <div className="form-row">
            {/* CONF. STOCK MÁXIMO */}
            <div className="form-group">
              <label htmlFor="confStockMaximo" className="form-label">
                CONF. STOCK MÁXIMO
              </label>
              <input
                type="text"
                id="confStockMaximo"
                name="confStockMaximo"
                className="form-input"
                placeholder="Configure el stock máximo"
              />
            </div>

            {/* ESTADIST. (MAX) */}
            <div className="form-group">
              <label htmlFor="estadisticasMax" className="form-label">
                ESTADIST.
              </label>
              <input
                type="text"
                id="estadisticasMax"
                name="estadisticasMax"
                className="form-input"
                placeholder="Ingrese estadísticas"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Configuración Avanzada
            </button>
            <button type="submit" className="btn btn-primary">
              Grabar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Configuracion;
