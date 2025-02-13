import React, { useRef, useState, useEffect } from "react";
import Path from "../../components/Path";
import BarcodeScanner from "../../components/BarcoderScanner";
import { useDispatch, useSelector } from "react-redux";
import { getMeds } from "../../features/med/medSlice";
import { toast } from "react-toastify";
import { getTransfer } from "../../features/transfer/transfSlice";

const IngresoMedicamento = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informeStock, setInformeStock] = useState([]);
  const [informeTransito, setInformeTransito] = useState([]);
  const [formData, setFormData] = useState({
    medicamento: "",
    codigoItem: "",
    codigoFarmacia: "",
  });

  const drugstore = useSelector((state) => state.drugstore);
  //const warehouse = useSelector((state) => state.warehouse);
  const { allMeds } = useSelector((state) => state.med);
  const medsNombres = useSelector((state) => state.medicamento);

  const { medicamento, codigoItem, codigoFarmacia } = formData;

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
  }, []);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getMedReport = async () => {
    if (formData.codigoItem === "") {
      return toast.error("Ingrese un código de ítem válido.");
    } else {
      try {
        dispatch(getMeds({ codigoItem: codigoItem })).then((data) => {
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

  const getPharmacyMeds = () => {
    try {
      dispatch(getMeds({ codigoFarmacia: codigoFarmacia })).then((data) => {
        setInformeStock(data.payload);
        setIsModalOpen(true); // Abre el modal
      });
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
        dispatch(getTransfer()).then((data) => {
          setInformeTransito(data.payload);
          //console.log(data.payload);
        });
      }
    }
  };

  return (
    <>
      <Path titulo={"Consultas"} pagina={"Consulta de Stock"} />
      <div className="med-container">
        <h2>Consulta Stock de Medicamentos</h2>
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

          {/* Botones */}
          <div className="form-buttons">
            <button
              type="button"
              className="btn btn-reverse"
              onClick={getMedReport}
            >
              Stock Medicamento en Hospital
            </button>
            <button type="button" className="btn" onClick={getPharmacyMeds}>
              Inventario en Farmacia
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

export default IngresoMedicamento;
