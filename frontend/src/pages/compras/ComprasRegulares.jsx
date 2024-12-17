import React from "react";
import Path from "../../components/Path";

const ComprasRegulares = () => {
  return (
    <>
      {/* Path Component */}
      <Path titulo="Compras" pagina="Compras Regulares" />

      <div className="med-container">
        <h2 className="form-title">Compras Regulares</h2>
        <form className="form">
          {/* NUEVA ORDEN DE COMPRA */}
          <div className="form-group">
            <label htmlFor="nuevaOrdenCompra" className="form-label">
              NUEVA ORDEN DE COMPRA
            </label>
            <input
              type="text"
              id="nuevaOrdenCompra"
              name="nuevaOrdenCompra"
              className="form-input"
              placeholder="Ingrese una nueva orden de compra"
            />
          </div>

          {/* EDITAR ORDEN DE COMPRA */}
          <div className="form-group">
            <label htmlFor="editarOrdenCompra" className="form-label">
              EDITAR ORDEN DE COMPRA
            </label>
            <input
              type="text"
              id="editarOrdenCompra"
              name="editarOrdenCompra"
              className="form-input"
              placeholder="Editar orden de compra existente"
            />
          </div>

          {/* ELEGIR PROVEEDOR */}
          <div className="form-group">
            <label htmlFor="elegirProveedor" className="form-label">
              ELEGIR PROVEEDOR
            </label>
            <input
              type="text"
              id="elegirProveedor"
              name="elegirProveedor"
              className="form-input"
              placeholder="Seleccione el proveedor"
            />
          </div>

          {/* DETALLE */}
          <div className="form-group">
            <label htmlFor="detalle" className="form-label">
              DETALLE
            </label>
            <textarea
              id="detalle"
              name="detalle"
              className="form-textarea"
              placeholder="Ingrese los detalles de la compra"
            ></textarea>
          </div>

          {/* BOTONES */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-reverse">
              Reportar a CEABE
            </button>
            <button type="submit" className="btn btn-primary">
              Generación de compra
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ComprasRegulares;
