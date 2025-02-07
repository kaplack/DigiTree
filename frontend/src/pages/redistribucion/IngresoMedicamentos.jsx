import React, { useRef, useEffect, useState } from "react";
import Path from "../../components/Path";
import BarcodeScannerAll from "../../components/BarcoderScannerAll";
import { useDispatch, useSelector } from "react-redux";
import { updateMed } from "../../features/med/medSlice";
import { toast } from "react-toastify";

import axios from "axios";
import {
  createTranfer,
  getTransfer,
} from "../../features/transfer/transfSlice";

const ReIngresoMedicamento = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informeStock, setInformeStock] = useState([]);

  const [formData, setFormData] = useState({
    medicamento: "",
    codigoItem: "",
    almacen: "",
    codigoAlmacen: "",
    ubigeoAlmacen: "",
    codigoFarmacia: "",
    ubigeoFarmacia: "",
    stock: "",
    vencimiento: "",
    codigoOrigen: "",
    lote: "",
  });

  const [meds, setMeds] = useState([]);

  const drugstore = useSelector((state) => state.drugstore);
  const warehouse = useSelector((state) => state.warehouse);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (meds.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        medicamento: prevState.medicamento || meds[0]?.medicamento || "",
        codigoItem: prevState.codigoItem || meds[0]?.codigoItem || "",
      }));
    }
  }, [meds]);

  const barcodeInputRef = useRef(null);
  useEffect(() => {
    // Enfoca automáticamente el input al cargar la página
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.codigoItem === "" ||
      formData.lote === "" ||
      formData.stock === "" ||
      formData.codigoOrigen === "" ||
      formData.codigoFarmacia === ""
    ) {
      return toast.error(
        "Escanee el código de barras del medicamento o falta información para realizar la reasignación."
      );
    }

    if (formData.stock <= 0) {
      toast.error("Por favor ingrese una cantidad válida");
      return;
    }
    const origen = meds.find((item) => item._id === formData.codigoOrigen);
    console.log("origen", origen);

    if (origen.stock >= formData.stock) {
      const updateOrigen = {
        ...origen,
        stock: origen.stock * 1 - formData.stock * 1,
      };

      // funcion updateMed para Actualizar aumenta en uno el stock de la farmacia origen
      try {
        dispatch(updateMed(updateOrigen));
        console.log("Origen Actualizado:", updateOrigen);
      } catch (error) {
        console.log(error);
      }

      const transfer = {
        codigoItem: formData.codigoItem,
        codigoDestino: formData.codigoFarmacia,
        codigoOrigen: formData.codigoOrigen,
        stock: formData.stock,
        lote: origen.lote,
        estado: "En Tránsito",
      };

      try {
        dispatch(createTranfer(transfer)).then(() => {
          console.log("transfer creado");
          setFormData({
            medicamento: "",
            codigoItem: "",
            almacen: "",
            codigoAlmacen: "",
            ubigeoAlmacen: "",
            codigoFarmacia: "",
            ubigeoFarmacia: "",
            stock: 0,
            vencimiento: "",
            codigoOrigen: "",
          }); // Limpia el formulario
          setMeds([]); // Limpia los medicamentos
          dispatch(getTransfer());
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(
        "La cantidad a transferir supera el stock de la farmacia origen."
      );
    }
  };

  const getReporte = async () => {
    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/med/meds",
        { codigoItem: formData.codigoItem }
      );
      if (response.data.length > 0) {
        const InformeStock = response.data;
        setInformeStock(InformeStock);
        setIsModalOpen(true); // Abre el modal
        console.log(informeStock);
      } else {
        toast.error("Esta farmacia no tiene este medicamento en Stock.");
      }
    } catch (error) {
      console.log("error! ", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setInformeStock(null);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que el formulario se envíe si está en un form
      //console.log("Código escaneado:", barcode);

      // Aquí haces la llamada Axios para obtener los datos
      try {
        // Realizamos la solicitud POST a la API
        const responseb = await axios.post(
          process.env.REACT_APP_API_URL + "/api/med/meds",
          { codigoItem: formData.codigoItem }
        );

        // Accedemos a los datos de la respuesta
        const existingMed = responseb.data;

        // Mostramos los datos en la consola
        console.log(existingMed);
        setMeds(existingMed);
        setFormData({
          ...formData,
          medicamento: existingMed[0]?.medicamento || "",
          lote: existingMed[0]?.lote || "",
        });

        // Si necesitas realizar algo adicional con los datos:
        if (existingMed.length > 0) {
          console.log("Medicamento encontrado:", existingMed);
        } else {
          toast.error(
            "No se encontró el medicamento, verifique el código de barras"
          );
        }
      } catch (error) {
        // Mostramos un mensaje de error en caso de que falle la solicitud
        console.error("Error al buscar el medicamento:", error);

        // Mostramos una notificación al usuario
        toast.error("Hubo un error al buscar este itemcode");
      }
    }
  };

  return (
    <>
      <Path titulo={"Redistribución"} pagina={"Reasignación de Medicamentos"} />
      <div className="med-container">
        <h2>Reasignación de Medicamentos</h2>
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
              value={formData?.medicamento}
            />
          </div>

          {/* Código de Ítem y Scan */}

          <div className="form-group" id="scan-section">
            <label htmlFor="itemCode">Código de Ítem (Unidad / Lote)</label>
            <input
              ref={barcodeInputRef}
              type="text"
              id="itemCode"
              name="codigoItem"
              className="input"
              placeholder="Ingrese el código"
              onChange={onChange}
              value={formData?.codigoItem}
              onKeyDown={handleKeyDown}
            />
          </div>

          <BarcodeScannerAll setMeds={setMeds} meds={meds} />

          {/* lote y cantidad */}

          <div className="form-group" id="scan-section">
            <label htmlFor="stock">Cantidad</label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="input"
              placeholder="Ingrese la cantidad del medicamento"
              onChange={onChange}
              value={formData.stock}
              min="1"
            />
          </div>

          {/* Farmacia Origen */}
          <div className="form-group">
            <label htmlFor="farmaciaSelectO">Farmacia Origen:</label>
            <select
              id="farmaciaSelectO"
              value={formData?.codigoOrigen}
              onChange={onChange}
              name="codigoOrigen"
            >
              <option value="" disabled>
                Seleccione una farmacia
              </option>
              {drugstore
                .filter((farmacia) =>
                  meds.some((med) => med.codigoFarmacia === farmacia.codigo)
                )
                .flatMap((filteredFarmacia) => {
                  // Filtrar todos los medicamentos relacionados con la farmacia
                  const medsRelacionados = meds.filter(
                    (med) => med.codigoFarmacia === filteredFarmacia.codigo
                  );

                  // Retornar una opción por cada medicamento relacionado
                  return medsRelacionados
                    .filter((item) => item.stock > 0)
                    .map((med) => (
                      //console.log("farmaciaFiltrada", med),
                      <option
                        key={`${filteredFarmacia.codigo}-${med.lote}`}
                        value={med._id}
                      >
                        {filteredFarmacia.nombre} - Lote: {med.lote} - Stock:{" "}
                        {med.stock}
                      </option>
                    ));
                })}
            </select>
            {formData.codigoOrigen && (
              <p>
                Código de Farmacia:{" "}
                {
                  drugstore.find((f) => f.codigo === formData.codigoOrigen)
                    ?.codigo
                }
              </p>
            )}
          </div>

          {/* Farmacia Destino */}
          <div className="form-group">
            <label htmlFor="farmaciaSelect">Farmacia Destino:</label>
            <select
              id="farmaciaSelect"
              value={formData?.codigoFarmacia}
              onChange={onChange}
              name="codigoFarmacia"
            >
              <option value="" disabled>
                Seleccione una farmacia
              </option>
              {drugstore.map((e) => (
                <option key={e.codigo} value={e.codigo}>
                  {e.nombre}
                </option>
              ))}
            </select>
            {formData.codigoFarmacia && (
              <p>
                Código de Farmacia:{" "}
                {
                  drugstore.find((f) => f.codigo === formData?.codigoFarmacia)
                    ?.codigo
                }
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-reverse"
              onClick={getReporte}
            >
              Información consolidada
            </button>
            <button type="submit" className="btn " onClick={onSubmit}>
              Reasignar
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reporte de Stock Vigente</h3>
            <table>
              <thead>
                <tr>
                  <th>Ubicación</th>
                  <th>Lote</th>
                  <th>CódigoItem</th>
                  <th>Medicamento</th>
                  <th>Stock</th>
                  <th>Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {informeStock.length > 0 ? (
                  informeStock.map((item, index) => {
                    const ubicacion = drugstore.find(
                      (e) => e.codigo === item.codigoFarmacia
                    ); // Busca la ubicación correspondiente
                    return (
                      <tr key={index}>
                        <td>
                          {item.codigoFarmacia + " "}
                          {ubicacion
                            ? ubicacion.nombre
                            : "Ubicación no encontrada"}
                        </td>
                        <td>{item.lote}</td>
                        <td>{item.codigoItem}</td>
                        <td>{item.medicamento}</td>
                        <td>{item.stock}</td>
                        <td>
                          {new Date(item.vencimiento).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">No hay datos disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button onClick={closeModal} className="btn btn-close">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReIngresoMedicamento;
