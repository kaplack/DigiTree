import React, { useRef, useState, useEffect } from "react";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";
import { useDispatch, useSelector } from "react-redux";
import { createMed, updateMed } from "../../features/med/medSlice";
import { toast } from "react-toastify";
import { consultaFetch } from "../../app/utils";

const SalidaMedicamento = () => {
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
    stock: 0,
    vencimiento: "",
  });

  const drugstore = useSelector((state) => state.drugstore);
  const warehouse = useSelector((state) => state.warehouse);

  const {
    medicamento,
    codigoItem,
    almacen,
    codigoAlmacen,
    ubigeoAlmacen,
    codigoFarmacia,
    ubigeoFarmacia,
    stock,
    vencimiento,
  } = formData;

  const barcodeInputRef = useRef(null);
  useEffect(() => {
    // Enfoca automáticamente el input al cargar la página
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
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
          "/api/med/" +
          formData.codigoItem +
          "/" +
          formData.codigoFarmacia,
        JSON.parse(localStorage.getItem("user")).token
      );
      console.log(response);

      if (response.ok) {
        const existingMed = await response.json();
        if (existingMed.stock > 0) {
          console.log("existente", existingMed.stock + 1);

          const updateFormData = {
            ...formData,
            stock: existingMed.stock - 1,
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
        "Hubo un error al actualizar el medicamento. Por favor, inténtelo nuevamente."
      );
      console.error("Error al actualizar el medicamento:", error);
    }
  };

  const getReporte = async () => {
    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      const response = await consultaFetch(
        process.env.REACT_APP_API_URL +
          "/api/med/" +
          formData.codigoItem +
          "/" +
          formData.codigoFarmacia,
        JSON.parse(localStorage.getItem("user")).token
      );
      if (response.ok) {
        const InformeStock = await response.json();
        setInformeStock([InformeStock]);
        setIsModalOpen(true); // Abre el modal
        console.log(informeStock);
      } else {
        toast.error("No se encontró información de stock.");
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
        const response = await consultaFetch(
          process.env.REACT_APP_API_URL + "/api/med/" + formData.codigoItem,
          JSON.parse(localStorage.getItem("user")).token
        );
        if (response.ok) {
          const existingMed = await response.json();
          console.log(existingMed);
          setFormData({
            ...formData,
            medicamento: existingMed.medicamento,
            codigoItem: formData.codigoItem,
            vencimiento: existingMed.vencimiento,
            almacen: existingMed.almacen,
            codigoFarmacia: existingMed.codigoFarmacia,
            stock: existingMed.stock,
          });
        }
      } catch (error) {
        toast.error("Hubo un error al buscar este itemcode");
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
              value={formData.codigoFarmacia}
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
              onClick={getReporte}
            >
              Reporte de Stock Vigente
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
          </div>
        </div>
      )}
    </>
  );
};

export default SalidaMedicamento;
