import React from "react";

function Report() {
  return (
    <div>
      {/* {isModalOpen && (
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
                  <th>Acción</th>
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
                        
                        <td>{origen.nombre}</td>
                        <td>{destino.nombre}</td>
                        <td>{medicamento.nombre}</td>
                        
                        <td className="action-buttons">
                          <button
                            className="btn"
                            onClick={() =>
                              aceptar(
                                item._id,
                                item.codigoDestino,
                                item.codigoItem,
                                item.lote,
                                item.stock
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
      )} */}
    </div>
  );
}

export default Report;
