import React, { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { Link } from "react-router-dom";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";
import { useDispatch } from "react-redux";
import { createMed } from "../../features/med/medSlice";

const IngresoMedicamento = () => {
  const [formData, setFormData] = useState({
    medicamento: "",
    codigoItem: "",
    almacen: "",
    codigoAlmacen: "",
    ubigeoAlmacen: "",
    codigoFarmacia: "",
    ubigeoFarmacia: "",
  });

  const {
    medicamento,
    codigoItem,
    almacen,
    codigoAlmacen,
    ubigeoAlmacen,
    codigoFarmacia,
    ubigeoFarmacia,
  } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createMed(formData));
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
              name="medicamento"
              className="input"
              placeholder="Ingrese el nombre"
              onChange={onChange}
              value={formData.medicamento}
            />
          </div>

          {/* Código de Ítem y Scan */}

          <div className="form-group" id="scan-section">
            <label htmlFor="itemCode">Código de Ítem (Unidad / Lote)</label>
            <input
              type="text"
              id="itemCode"
              name="codigoItem"
              className="input"
              placeholder="Ingrese el código"
              onChange={onChange}
              value={formData.codigoItem}
            />
          </div>

          <BarcodeScanner setFormData={setFormData} formData={formData} />

          {/* Nombre de Almacén */}
          <div className="form-group">
            <label htmlFor="warehouseName">Nombre de Almacén</label>
            <input
              type="text"
              id="warehouseName"
              className="input"
              placeholder="Ingrese el nombre del almacén"
              name="almacen"
              onChange={onChange}
              value={formData.almacen}
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
                name="codigoAlmacen"
                onChange={onChange}
                value={formData.codigoAlmacen}
              />
            </div>
            <div className="form-group">
              <label htmlFor="warehouseUbigeo">Ubigeo Almacén</label>
              <input
                type="text"
                id="warehouseUbigeo"
                className="input"
                placeholder="Ingrese el ubigeo"
                name="ubigeoAlmacen"
                onChange={onChange}
                value={formData.ubigeoAlmacen}
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
                name="codigoFarmacia"
                onChange={onChange}
                value={formData.codigoFarmacia}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pharmacyUbigeo">Ubigeo Farmacia</label>
              <input
                type="text"
                id="pharmacyUbigeo"
                className="input"
                placeholder="Ingrese el ubigeo"
                name="ubigeoFarmacia"
                onChange={onChange}
                value={formData.ubigeoFarmacia}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="form-buttons">
            {/* <button type="button" className="btn btn-reverse">
              Reporte de Stock Vigente
            </button> */}
            <button type="submit" className="btn " onClick={onSubmit}>
              Registro
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default IngresoMedicamento;
