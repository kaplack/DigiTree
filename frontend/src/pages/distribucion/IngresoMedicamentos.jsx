import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";

const IngresoMedicamento = () => {
  const [formData, setFormData] = useState({
    medicamento: "",
    codigoItem: "",
    scan: "",
    almacen: "",
    codigoAlmacen: "",
    ubigeo1: "",
    codigoFarmacia: "",
    ubigeo2: "",
  });

  const {
    medicamento,
    codigoItem,
    scan,
    almacen,
    codigoAlmacen,
    ubigeo1,
    codigoFarmacia,
    ubigeo2,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <>
      <Path titulo={"Distribución"} pagina={"Ingreso de Medicamentos"} />
      <div className="med-container">
        <h2>Ingreso de Medicamentos</h2>
        <form className="form">
          {/* Nombre del medicamento */}
          <div className="form-group">
            <label htmlFor="medicationName">Nombre del Medicamento</label>
            <input
              type="text"
              id="medicationName"
              className="input"
              placeholder="Ingrese el nombre"
            />
          </div>

          {/* Código de Ítem y Scan */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemCode">Código de Ítem (Unidad / Lote)</label>
              <input
                type="text"
                id="itemCode"
                className="input"
                placeholder="Ingrese el código"
              />
            </div>
            <BarcodeScanner />
          </div>

          {/* Nombre de Almacén */}
          <div className="form-group">
            <label htmlFor="warehouseName">Nombre de Almacén</label>
            <input
              type="text"
              id="warehouseName"
              className="input"
              placeholder="Ingrese el nombre del almacén"
            />
          </div>

          {/* Código de Almacén y Ubigeo */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="warehouseCode">Código de Almacén</label>
              <input
                type="text"
                id="warehouseCode"
                className="input"
                placeholder="Ingrese el código"
              />
            </div>
            <div className="form-group">
              <label htmlFor="warehouseUbigeo">Ubigeo</label>
              <input
                type="text"
                id="warehouseUbigeo"
                className="input"
                placeholder="Ingrese el ubigeo"
              />
            </div>
          </div>

          {/* Código de Farmacia y Ubigeo */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pharmacyCode">Código de Farmacia</label>
              <input
                type="text"
                id="pharmacyCode"
                className="input"
                placeholder="Ingrese el código"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pharmacyUbigeo">Ubigeo</label>
              <input
                type="text"
                id="pharmacyUbigeo"
                className="input"
                placeholder="Ingrese el ubigeo"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button type="button" className="btn btn-reverse">
              Reporte de Stock Vigente
            </button>
            <button type="submit" className="btn ">
              Registro
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default IngresoMedicamento;
