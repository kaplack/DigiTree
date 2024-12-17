import React from "react";
import Path from "../../components/Path";

const Estadistica = () => {
  return (
    <>
      {/* Path Component */}
      <Path titulo="Compras" pagina="Estadistica" />

      <div className="med-container">
        <h2 className="form-title">Estadistica</h2>
        <form className="form">
          {/* ORDEN DE COMPRA N° */}
          <div className="form-group">
            <label htmlFor="ordenCompra" className="form-label">
              ORDEN DE COMPRA N°
            </label>
            <input
              type="text"
              id="ordenCompra"
              name="ordenCompra"
              className="form-input"
              placeholder="Ingrese el número de orden de compra"
            />
          </div>

          {/* FILTRO POR FECHAS */}
          <div className="form-group">
            <label htmlFor="filtroFechas" className="form-label">
              FILTRO POR FECHAS
            </label>
            <input
              type="text"
              id="filtroFechas"
              name="filtroFechas"
              className="form-input"
              placeholder="Ingrese las fechas para filtrar"
            />
          </div>

          {/* FILTRO POR PRODUCTO */}
          <div className="form-group">
            <label htmlFor="filtroProducto" className="form-label">
              FILTRO POR PRODUCTO
            </label>
            <input
              type="text"
              id="filtroProducto"
              name="filtroProducto"
              className="form-input"
              placeholder="Ingrese el producto para filtrar"
            />
          </div>

          {/* FILTRO POR PROVEEDOR */}
          <div className="form-group">
            <label htmlFor="filtroProveedor" className="form-label">
              FILTRO POR PROVEEDOR
            </label>
            <input
              type="text"
              id="filtroProveedor"
              name="filtroProveedor"
              className="form-input"
              placeholder="Ingrese el proveedor para filtrar"
            />
          </div>

          {/* DETALLES E INCIDENCIAS */}
          <div className="form-group">
            <label htmlFor="detallesIncidencias" className="form-label">
              DETALLES E INCIDENCIAS
            </label>
            <textarea
              id="detallesIncidencias"
              name="detallesIncidencias"
              className="form-textarea"
              placeholder="Ingrese detalles e incidencias"
            ></textarea>
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Búsqueda Avanzada
            </button>
            <button type="submit" className="btn btn-primary">
              Consultar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Estadistica;
