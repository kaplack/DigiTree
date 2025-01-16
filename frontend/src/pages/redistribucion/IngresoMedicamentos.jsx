import React, { useEffect, useState } from "react";
import Path from "../../components/Path";
import BarcodeScannerAll from "../../components/BarcoderScannerAll";
import { useDispatch, useSelector } from "react-redux";
import { createMed, getAllMeds, updateMed } from "../../features/med/medSlice";
import { toast } from "react-toastify";
import { consultaFetch } from "../../app/utils";

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
    stock: 0,
    vencimiento: "",
    codigoOrigen: "",
  });

  const [meds, setMeds] = useState([]);

  const drugstore = useSelector((state) => state.drugstore);
  const warehouse = useSelector((state) => state.warehouse);

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

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //consulta si la farmacia destino existe
    if (formData.codigoFarmacia && formData.codigoOrigen) {
      const response = await consultaFetch(
        process.env.REACT_APP_API_URL +
          "/api/med/" +
          formData.codigoItem +
          "/" +
          formData.codigoFarmacia,
        JSON.parse(localStorage.getItem("user")).token
      );
      const dataResponse = await response.json();
      console.log(dataResponse);

      //manejo de respuesta
      if (response.ok) {
        // funcion updateMed para Actualizar aumentando en uno el stock de la farmacia destino

        const origen = meds.find(
          (item) => item.codigoFarmacia === formData.codigoOrigen
        );
        console.log(origen);

        const updateOrigen = {
          ...origen,
          stock: origen.stock - 1,
        };

        // funcion updateMed para Actualizar disminye en uno el stock de la farmacia origen
        dispatch(updateMed(updateOrigen));
        console.log("Origen Actualizado:", updateOrigen);

        const updateDestino = {
          ...dataResponse,
          stock: dataResponse.stock + 1,
          codigoOrigen: formData.codigoOrigen,
          estado: "En Transito",
        };

        dispatch(updateMed(updateDestino)).then(() => {
          dispatch(getAllMeds());
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
            codigoOrigen: "",
          });
        });

        console.log("Destino actualizado", updateDestino);
      } else if (response.status === 404) {
        // si el medicamento no existe en la farmacia
        // Actualiza origen
        const origen = meds.find(
          (item) => item.codigoFarmacia === formData.codigoOrigen
        );
        console.log(origen);

        const updateOrigen = {
          ...origen,
          stock: origen.stock - 1,
        };
        dispatch(updateMed(updateOrigen));
        console.log("Origen Actualizado:", updateOrigen);

        //Crea Destino
        console.log("crear nuevo registro");
        const NewDestino = {
          almacen: origen.almacen,
          codigoItem: origen.codigoItem,
          medicamento: origen.medicamento,
          vencimiento: origen.vencimiento,
          stock: 1,
          codigoFarmacia: formData.codigoFarmacia,
          codigoOrigen: formData.codigoOrigen,
          estado: "En Transito",
        };

        dispatch(createMed(NewDestino)).then(() => {
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
            codigoOrigen: "",
          });
        });
        console.log("Nuevo medicamento registrado:", NewDestino);
      } else {
        throw new Error("Error al verificar el medicamento");
      }
    }
  };

  const getReporte = async () => {
    try {
      // Realiza la consulta al backend para verificar si el medicamento ya existe
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/med/${formData.codigoItem}/${formData.codigoFarmacia}`,
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
              type="text"
              id="itemCode"
              name="codigoItem"
              className="input"
              placeholder="Ingrese el código"
              onChange={onChange}
              value={formData?.codigoItem}
            />
          </div>

          <BarcodeScannerAll setMeds={setMeds} meds={meds} />

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
                .map((filteredFarmacia) => {
                  // Buscar el medicamento relacionado para obtener el stock
                  const medRelacionado = meds.find(
                    (med) => med.codigoFarmacia === filteredFarmacia.codigo
                  );
                  return (
                    <option
                      key={filteredFarmacia.codigo}
                      value={filteredFarmacia.codigo}
                    >
                      {filteredFarmacia.nombre} - Stock:{" "}
                      {medRelacionado?.stock || 0}
                    </option>
                  );
                })}
            </select>
            {formData.codigoFarmacia && (
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
              Reporte de Stock Vigente
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

export default ReIngresoMedicamento;
