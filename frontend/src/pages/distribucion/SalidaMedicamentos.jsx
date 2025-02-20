import React, { useRef, useState, useEffect } from "react";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";
import { useDispatch, useSelector } from "react-redux";
import { createMed, getAllMeds, updateMed } from "../../features/med/medSlice";
import { toast } from "react-toastify";
import { consultaFetch } from "../../app/utils";
import { getTransfer } from "../../features/transfer/transfSlice";

const SalidaMedicamento = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informeStock, setInformeStock] = useState([]);
  const [informeTransito, setInformeTransito] = useState([]);
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
    lote: "",
    docId: "",
  });

  const drugstore = useSelector((state) => state.drugstore);
  const warehouse = useSelector((state) => state.warehouse);
  const { allMeds } = useSelector((state) => state.med);
  const medsNombres = useSelector((state) => state.medicamento);

  const {
    medicamento,
    codigoItem,
    almacen,
    codigoFarmacia,
    stock,
    vencimiento,
    lote,
  } = formData;

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
      //console.log(data.payload);
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
    if (
      formData.codigoItem === "" &&
      formData.lote === "" &&
      formData.stock === "" &&
      formData.vencimiento === ""
    ) {
      return toast.error("Escanee el código de barras del medicamento");
    }
    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      const response = allMeds.filter(
        (e) =>
          e.codigoItem === formData.codigoItem &&
          e.codigoFarmacia === formData.codigoFarmacia &&
          e.lote === formData.lote
      );
      console.log(response);

      if (response.length > 0) {
        const existingMed = response[0];
        if (existingMed.stock > 0) {
          //console.log("existente", existingMed.stock + 1);

          const updateFormData = {
            ...formData,
            stock: existingMed.stock * 1 - formData.stock * 1,
          };
          setFormData(updateFormData);

          console.log("formData Actualizado", updateFormData);

          dispatch(updateMed(updateFormData)).then(() => {
            dispatch(getAllMeds());
            setFormData({
              medicamento: "",
              codigoItem: "",
              almacen: "",
              docId: "",
              codigoFarmacia: "",
              lote: "",
              stock: "",
              vencimiento: "",
            });
            console.log("Medicamento actualizado:", formData);
          });
        } else {
          throw new Error("El Stock es 0.");
        }
      } else {
        throw new Error(
          "Hubo un error al actualizar el medicamento en la farmacia designada."
        );
      }
    } catch (error) {
      toast.error(
        "Hubo un error al actualizar el medicamento. Por favor, inténtelo nuevamente." +
          error
      );
      console.error("Error al actualizar el medicamento:", error);
    }
  };

  const getReporte = () => {
    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      if (codigoItem !== "" && codigoFarmacia !== "") {
        const response =
          allMeds.filter(
            (e) =>
              e.codigoItem === codigoItem && e.codigoFarmacia === codigoFarmacia
          ) || [];
        console.log(response);
        if (Array.isArray(response) && response.length > 0) {
          console.log("Medicamento encontrado", response);
          //const InformeStock = response[0];
          setInformeStock(response);
          setIsModalOpen(true); // Abre el modal
          console.log(informeStock);
        } else {
          toast.error("No se encontró información de stock.");
        }
      } else {
        toast.error("Ingrese un código de ítem válido.");
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
            //stock: item.stock,
            lote: item.lote,
          });
        } else {
          setFormData({
            ...formData,
            medicamento: items[0].medicamento,
            codigoItem: items[0].codigoItem,
            vencimiento: items[0].vencimiento,
            almacen: items[0].almacen,
            codigoFarmacia: items[0].codigoFarmacia,
            //stock: items[0].stock,
            lote: items[0].lote,
          });
        }
      }
    }
  };

  return (
    <>
      <Path titulo={"Distribución"} pagina={"Salida de Medicamentos"} />
      <div className="med-container">
        <h2>Salida de Medicamentos</h2>
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
          </div>

          <BarcodeScanner setFormData={setFormData} formData={formData} />

          {/* lote y cantidad */}
          <div className="form-row">
            <div className="form-group" id="scan-section">
              <label htmlFor="lote">Lote</label>
              <input
                type="text"
                id="lote"
                name="lote"
                className="input"
                placeholder="Ingrese el lote del medicamento"
                onChange={onChange}
                value={formData.lote}
              />
            </div>
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
              />
            </div>
          </div>

          {/* Vencimiento */}

          <div className="form-group" id="scan-section">
            <label htmlFor="itemCode">Fecha de vencimiento</label>
            <input
              type="date"
              id="vencimiento"
              name="vencimiento"
              className="input"
              onChange={onChange}
              value={formData.vencimiento.split("T")[0]}
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
            {formData?.codigoFarmacia && (
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
            <label htmlFor="stock">
              Documento de identidad (DNI/CE/PASAPORTE)
            </label>
            <input
              type="number"
              id="docId"
              name="docId"
              className="input"
              placeholder="Ingrese Documento de Identidad"
              onChange={onChange}
              value={formData.docId}
            />
          </div>

          {/* Botones */}
          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-reverse"
              //onClick={getReporte}
            >
              Comprobante de No Stock
            </button>
            <button type="submit" className="btn " onClick={onSubmit}>
              Salida de Medicamento
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
                  <th>lote</th>
                  <th>CódigoItem</th>
                  <th>Medicamento</th>
                  <th>Stock</th>
                  <th>Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {informeStock.length > 0 ? (
                  informeStock.map((item, index) => {
                    const fecha = item.vencimiento.split("T")[0].split("-");
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
                          {fecha[2]}-{fecha[1]}-{fecha[0]}
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
                </tr>
              </thead>
              <tbody>
                {informeTransito.length > 0 ? (
                  informeTransito.map((item, index) => {
                    const origen = drugstore.find(
                      (e) =>
                        e.codigo ===
                        allMeds.find((e) => e._id === item.codigoOrigen)
                          .codigoFarmacia
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

export default SalidaMedicamento;
