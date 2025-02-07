import { useEffect, useState } from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaHome,
  FaQuestion,
  FaCartPlus,
  FaAmbulance,
  FaRecycle,
  FaChartLine,
  FaBell,
} from "react-icons/fa";
import { FaTruckMedical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { getAllMeds } from "../features/med/medSlice";
import { getTransfer } from "../features/transfer/transfSlice";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { transfers } = useSelector((state) => state.transfers);
  const { allMeds } = useSelector((state) => state.med);
  const drugstore = useSelector((state) => state.drugstore);
  const medsNombres = useSelector((state) => state.medicamento);
  //const meds = useSelector((state) => state.med.allMeds);
  const [transferCount, setTransferCount] = useState(0);
  const [informeTransito, setInformeTransito] = useState([]);

  useEffect(() => {
    dispatch(getTransfer()).then((data) => {
      setTransferCount(data.payload.length);
    });
    dispatch(getAllMeds());
  }, [transfers.length]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleMenuToggle = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  };

  const showTransfers = () => {
    setInformeTransito(transfers);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    <header className="header">
      <div className="nav">
        <FaBars
          className="nav__bars"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Link to="/">DigiTree</Link>
      </div>
      <ul className="auth-links">
        {user ? (
          <>
            {transferCount > 0 && (
              <li className="transfer" onClick={showTransfers}>
                <FaTruckMedical size="1.6rem" />
                <span className="transfer__count">{transferCount}</span>
              </li>
            )}
            <li className="user">
              <FaUser />
              <span className="user__name">{user.email.split("@")[0]}</span>
            </li>

            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Ingresar
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Registro
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className={`menu ${isMenuOpen ? "menu--open" : ""}`}>
        <ul className="menu__list">
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FaHome className="home-icon" />
              Inicio
            </Link>
          </li>
          <li>
            <button
              className="menu__parent"
              onClick={() => handleMenuToggle(0)}
            >
              <FaQuestion />
              Consultas{" "}
              <span className={activeMenu === 0 ? "derecha rotate" : "derecha"}>
                {" "}
                &#62;
              </span>
            </button>
            {activeMenu === 0 && (
              <ul className="submenu">
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="consulta/stock"
                  >
                    Stock del medicamento
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="consulta/ubicacionvencimiento"
                  >
                    Ubicación / vencimiento
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="consulta/trazabilidad"
                  >
                    Trazabilidad
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="consulta/marcos-contractuales"
                  >
                    Marcos contractuales
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="consulta/proveedores"
                  >
                    Proveedores
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="menu__parent"
              onClick={() => handleMenuToggle(1)}
            >
              <FaCartPlus />
              Compras
              <span className={activeMenu === 1 ? "derecha rotate" : "derecha"}>
                {" "}
                &#62;
              </span>
            </button>
            {activeMenu === 1 && (
              <ul className="submenu">
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="compras/regulares"
                  >
                    Compras regulares
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="compras/automaticas"
                  >
                    Compras automáticas
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="compras/configuracion"
                  >
                    Configuración
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="compras/estadisticas"
                  >
                    Estadísticas
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="menu__parent"
              onClick={() => handleMenuToggle(2)}
            >
              <FaAmbulance />
              Distribución
              <span className={activeMenu === 2 ? "derecha rotate" : "derecha"}>
                {" "}
                &#62;
              </span>
            </button>
            {activeMenu === 2 && (
              <ul className="submenu">
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="distribucion/ingresomedicamentos"
                  >
                    Ingreso de Medicamentos
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="distribucion/salidademedicamentos"
                  >
                    Salida de Medicamentos
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="distribucion/contabilizaciones"
                  >
                    Contabilizaciones
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="distribucion/reportes"
                  >
                    Reportes
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="menu__parent"
              onClick={() => handleMenuToggle(3)}
            >
              <FaAmbulance />
              Redistribución
              <span className={activeMenu === 3 ? "derecha rotate" : "derecha"}>
                {" "}
                &#62;
              </span>
            </button>
            {activeMenu === 3 && (
              <ul className="submenu">
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="redistribucion/ingresomedicamentos"
                  >
                    Reasignación de Medicamentos
                  </Link>
                </li>
                {/* <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="redistribucion/salidademedicamentos"
                  >
                    Salida de Medicamentos
                  </Link>
                </li> */}
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="redistribucion/contabilizaciones"
                  >
                    Contabilizaciones
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="redistribucion/reportes"
                  >
                    Reportes
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="menu__parent"
              onClick={() => handleMenuToggle(4)}
            >
              <FaChartLine />
              Estimaciones
              <span className={activeMenu === 4 ? "derecha rotate" : "derecha"}>
                {" "}
                &#62;
              </span>
            </button>
            {activeMenu === 4 && (
              <ul className="submenu">
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="estimaciones/analisis"
                  >
                    Análisis de estimaciones
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="estimaciones/regresiondemanda"
                  >
                    Regresión de demanda
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="estimaciones/regresionoferta"
                  >
                    Regresión de oferta
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    to="estimaciones/reportes"
                  >
                    Reportes
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Medicamentos en Tránsito</h3>
            <table>
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Medicamento</th>
                  {/* <th>Acción</th> */}
                </tr>
              </thead>
              <tbody>
                {informeTransito.length > 0 ? (
                  informeTransito.map((item, index) => {
                    console.log("item", item);
                    const origen = drugstore.find(
                      (e) =>
                        e.codigo ===
                        allMeds.find((e) => e._id === item.codigoOrigen)
                          ?.codigoFarmacia
                    ); // Busca la ubicación correspondiente
                    console.log(origen);
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
                        <td>{origen?.nombre}</td>
                        <td>{destino.nombre}</td>
                        <td>{medicamento.nombre}</td>
                        {/* <td>{item.stock}</td> */}
                        {/* <td>
                          <button
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
                        </td> */}
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
    </header>
  );
}

export default Header;
