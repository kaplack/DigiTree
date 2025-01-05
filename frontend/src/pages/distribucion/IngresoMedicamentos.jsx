import React, { useState } from "react";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";
import { useDispatch, useSelector } from "react-redux";
import { createMed, updateMed } from "../../features/med/medSlice";
import { toast } from "react-toastify";

const IngresoMedicamento = () => {
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/med/${formData.codigoItem}`,
        {
          method: "GET",
          headers: {
            //"Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`, // Si usas autenticación
          },
        }
      );

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
        //Si no existe, crea el nuevo medicamento
        dispatch(createMed(formData)).then(() => {
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

  const getReporte = async () => {
    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/med/${formData.codigoItem}`,
        {
          method: "GET",
          headers: {
            //"Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`, // Si usas autenticación
          },
        }
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
          </div>
        </div>
      )}
    </>
  );
};

export default IngresoMedicamento;
