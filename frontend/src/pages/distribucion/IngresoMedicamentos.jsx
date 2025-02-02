import React, { useRef, useState, useEffect } from "react";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";
import { useDispatch, useSelector } from "react-redux";
import { createMed, updateMed, getMeds } from "../../features/med/medSlice";
import { toast } from "react-toastify";
import { consultaFetch } from "../../app/utils";
import {
  getTransfer,
  updateTransfer,
} from "../../features/transfer/transfSlice";

const IngresoMedicamento = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informeStock, setInformeStock] = useState([]);
  const [informeTransito, setInformeTransito] = useState([]);
  //const meds = useSelector((state) => state.med.allMeds);

  const [formData, setFormData] = useState({
    medicamento: "",
    codigoItem: "",
    almacen: "",
    codigoAlmacen: "",
    ubigeoAlmacen: "",
    codigoFarmacia: "",
    ubigeoFarmacia: "",
    stock: 0,
    vencimiento: "",
  });

  const drugstore = useSelector((state) => state.drugstore);
  const warehouse = useSelector((state) => state.warehouse);
  const medsNombres = useSelector((state) => state.medicamento);
  const { allMeds } = useSelector((state) => state.med);

  const barcodeInputRef = useRef(null);
  useEffect(() => {
    // Enfoca automáticamente el input al cargar la página
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
    setFormData((prevData) => ({
      ...prevData,
      codigoFarmacia: "00060",
    }));

    dispatch(getTransfer()).then((data) => {
      setInformeTransito(data.payload);
      console.log(data.payload);
    });
  }, []);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      const response = await consultaFetch(
        process.env.REACT_APP_API_URL +
          "/api/med/meds/" +
          formData.codigoItem +
          "/" +
          formData.codigoFarmacia,
        JSON.parse(localStorage.getItem("user")).token
      );
      console.log(response);

      if (response.ok) {
        const existingMed = await response.json();
        console.log("existente", existingMed.stock + 1);

        const updateFormData = {
          ...formData,
          stock: existingMed.stock + 1,
        };
        setFormData(updateFormData);

        console.log("formData Actualizado", updateFormData);

        dispatch(updateMed(updateFormData)).then(() => {
          setFormData({
            medicamento: "",
            codigoItem: "",
            almacen: "",
            codigoAlmacen: "",
            ubigeoAlmacen: "",
            codigoFarmacia: "",
            ubigeoFarmacia: "",
            stock: "",
            vencimiento: "",
          });
          console.log("Medicamento actualizado:", formData);
        });
      } else if (response.status === 404) {
        const updateFormData = {
          ...formData,
          stock: 1,
        };
        //Si no existe, crea el nuevo medicamento
        dispatch(createMed(updateFormData)).then(() => {
          setFormData({
            medicamento: "",
            codigoItem: "",
            almacen: "",
            codigoAlmacen: "",
            ubigeoAlmacen: "",
            codigoFarmacia: "",
            ubigeoFarmacia: "",
            stock: "",
            vencimiento: "",
          });
        });
        console.log("Nuevo medicamento registrado:", formData);
      } else {
        throw new Error("Error al verificar el medicamento");
      }
    } catch (error) {
      toast.error(
        "Hubo un error al registrar el medicamento. Por favor, inténtelo nuevamente."
      );
      console.error("Error al registrar el medicamento:", error);
    }
  };

  const getMedReport = () => {
    if (formData.codigoItem === "") {
      return toast.error("Ingrese un código de ítem válido.");
    } else {
      try {
        dispatch(getMeds({ codigoItem: formData.codigoItem })).then((data) => {
          //console.log("Medicamento encontrado", data.payload);
          setInformeStock(data.payload);
          setIsModalOpen(true); // Abre el modal
          //console.log(informeStock);
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const getPharmacyMeds = async () => {
    try {
      dispatch(getMeds({ codigoFarmacia: formData.codigoFarmacia })).then(
        (data) => {
          //console.log("Medicamento encontrado", data.payload);
          setInformeStock(data.payload);
          setIsModalOpen(true); // Abre el modal
          //console.log(informeStock);
        }
      );
    } catch (error) {
      console.log("error", error);
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
      const items = allMeds.filter((e) => e.codigoItem === formData.codigoItem);
      console.log(items);
      if (items.length > 0) {
        const item = items.filter((e) => e.codigoFarmacia === "00060")[0];
        console.log(item);
        if (item) {
          setFormData({
            ...formData,
            medicamento: item.medicamento,
            codigoItem: item.codigoItem,
            vencimiento: item.vencimiento,
            almacen: item.almacen,
            codigoFarmacia: item.codigoFarmacia,
            stock: item.stock,
          });
        } else {
          setFormData({
            ...formData,
            medicamento: items[0].medicamento,
            codigoItem: items[0].codigoItem,
            vencimiento: items[0].vencimiento,
            almacen: items[0].almacen,
            codigoFarmacia: items[0].codigoFarmacia,
            stock: items[0].stock,
          });
        }
      }
    }
  };

  const aceptar = (transfId, destino, codigoItem) => {
    console.log("aceptar", destino, codigoItem);
    try {
      dispatch(
        updateTransfer({
          estado: "Recibido",
          transfId,
          codigoFarmacia: destino,
        })
      ).then((data) => {
        console.log("Medicamento Aceptado ", data);
        dispatch(getTransfer()).then((data) => {
          setInformeTransito(data.payload);
          console.log(data.payload);
        });
      });
    } catch (error) {
      console.log("error al actualizar el registro de transferencia", error);
    }
    const medId = allMeds.filter(
      (e) => e.codigoItem === codigoItem && e.codigoFarmacia === destino
    )[0];
    console.log("medId", medId);

    if (medId) {
      const update = {
        ...medId,
        stock: medId.stock + 1,
      };
      dispatch(updateMed(update)).then(() => {
        console.log("Medicamento actualizado:", update);
        getPharmacyMeds();
        dispatch(getTransfer());
      });
    } else {
      const newOne = allMeds.filter((e) => e.codigoItem === codigoItem)[0];
      console.log("newOne", newOne);
      const newMed = {
        medicamento: newOne.medicamento,
        codigoItem: newOne.codigoItem,
        almacen: newOne.almacen,

        codigoFarmacia: destino,
        stock: 1,
        vencimiento: newOne.vencimiento,
      };
      dispatch(createMed(newMed)).then(() => {
        console.log("Nuevo medicamento registrado:", newMed);
        getPharmacyMeds();
        dispatch(getTransfer());
      });
    }
  };

  const rechazado = (transfId, origen, codigoItem) => {
    console.log("rechazado", origen, codigoItem);
    try {
      dispatch(
        updateTransfer({
          estado: "Cancelado",
          transfId,
        })
      ).then((data) => {
        console.log("Medicamento Rechazado ", data);
        dispatch(getTransfer()).then((data) => {
          setInformeTransito(data.payload);
          console.log(data.payload);
        });
      });
    } catch (error) {
      console.log("error", error);
    }

    const medId = allMeds.filter(
      (e) => e.codigoItem === codigoItem && e.codigoFarmacia === origen
    )[0];
    console.log("medId", medId);

    if (medId) {
      const update = {
        ...medId,
        stock: medId.stock + 1,
      };
      dispatch(updateMed(update)).then(() => {
        console.log("Medicamento actualizado:", update);
        getPharmacyMeds();
        dispatch(getTransfer());
      });
    }
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
              ref={barcodeInputRef}
              type="text"
              id="itemCode"
              name="codigoItem"
              className="input"
              placeholder="Ingrese el código"
              onChange={onChange}
              value={formData.codigoItem}
              onKeyDown={handleKeyDown}
            />
            {/* <FaSearch className="search-icon" /> */}
          </div>

          <BarcodeScanner setFormData={setFormData} formData={formData} />

          {/* {enTramiteCount > 0 ? (
            <button
              type="button"
              className="btn btn-reverse"
              onClick={cargarMedTrans}
            >
              Cargar Medicamento en Transito
            </button>
          ) : null} */}

          {/* Vencimiento */}

          <div className="form-group" id="scan-section">
            <label htmlFor="itemCode">Fecha de vencimiento</label>
            <input
              type="date"
              id="vencimiento"
              name="vencimiento"
              className="input"
              onChange={onChange}
              value={formData?.vencimiento.split("T")[0]}
            />
          </div>

          {/* Nombre de Farmacia */}
          <div className="form-group">
            <label htmlFor="farmaciaSelect">Farmacia:</label>
            <select
              id="farmaciaSelect"
              value={formData.codigoFarmacia || "00060"}
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
                  drugstore.find((f) => f.codigo === formData.codigoFarmacia)
                    ?.codigo
                }
              </p>
            )}
          </div>

          {/* Nombre de Almacén*/}
          <div className="form-group">
            <label htmlFor="warehouseSelect">Almacén:</label>
            <select
              id="warehouseSelect"
              value={formData.almacen}
              onChange={onChange}
              name="almacen"
            >
              <option value="" disabled>
                Seleccione un almacén
              </option>
              {warehouse.map((almacen) => (
                <option key={almacen.codigo} value={almacen.codigo}>
                  {almacen.nombre}
                </option>
              ))}
            </select>
            {formData.almacen && (
              <p>
                Almacén seleccionado:{" "}
                {warehouse.find((w) => w.codigo === formData.almacen)?.codigo}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-reverse"
              onClick={getMedReport}
            >
              Información Consolidada
            </button>
            <button
              type="button"
              className="btn btn-reverse"
              onClick={getPharmacyMeds}
            >
              Información Farmacia
            </button>
            <button type="submit" className="btn " onClick={onSubmit}>
              Validar ingreso
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
                  <th>Código Ubicación</th>
                  <th>Ubicación</th>
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
                        <td>{item.codigoFarmacia}</td>
                        <td>
                          {ubicacion
                            ? ubicacion.nombre
                            : "Ubicación no encontrada"}
                        </td>
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

            <h3>Medicamentos en Tránsito</h3>
            <table>
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Medicamento</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {informeTransito.length > 0 ? (
                  informeTransito.map((item, index) => {
                    const origen = drugstore.find(
                      (e) => e.codigo === item.codigoOrigen
                    ); // Busca la ubicación correspondiente
                    const destino = drugstore.find(
                      (e) => e.codigo === item.codigoDestino
                    );
                    const medicamento = medsNombres.find(
                      (e) => e.codigo === item.codigoItem
                    );
                    //console.log(item._id);
                    return (
                      <tr key={index}>
                        {/* <td>{item.codigoFarmacia}</td> */}
                        <td>{origen.nombre}</td>
                        <td>{destino.nombre}</td>
                        <td>{medicamento.nombre}</td>
                        {/* <td>{item.stock}</td> */}
                        <td className="action-buttons">
                          <button
                            className="btn"
                            onClick={() =>
                              aceptar(
                                item._id,
                                item.codigoDestino,
                                item.codigoItem
                              )
                            }
                          >
                            Aceptar
                          </button>
                          <button
                            className="btn btn-reverse"
                            onClick={() =>
                              rechazado(
                                item._id,
                                item.codigoOrigen,
                                item.codigoItem
                              )
                            }
                          >
                            Rechazar
                          </button>
                        </td>
                        {/* <td>
                          {new Date(item.vencimiento).toLocaleDateString()}
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">No hay medicamentos en tránsito.</td>
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

export default IngresoMedicamento;
