import { useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleMenuToggle = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
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
      {isMenuOpen && (
        <div className={`menu ${isMenuOpen ? "menu--open" : ""}`}>
          <ul className="menu__list">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <button
                className="menu__parent"
                onClick={() => handleMenuToggle(0)}
              >
                Consultas
              </button>
              {activeMenu === 0 && (
                <ul className="submenu">
                  <li>
                    <Link to="/stock">Stock del medicamento</Link>
                  </li>
                  <li>
                    <Link to="/ubicacion">Ubicación / vencimiento</Link>
                  </li>
                  <li>
                    <Link to="/trazabilidad">Trazabilidad</Link>
                  </li>
                  <li>
                    <Link to="/marcos">Marcos contractuales</Link>
                  </li>
                  <li>
                    <Link to="/proveedores">Proveedores</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="menu__parent"
                onClick={() => handleMenuToggle(1)}
              >
                Compras
              </button>
              {activeMenu === 1 && (
                <ul className="submenu">
                  <li>
                    <Link to="/compras-regulares">Compras regulares</Link>
                  </li>
                  <li>
                    <Link to="/compras-automaticas">Compras automáticas</Link>
                  </li>
                  <li>
                    <Link to="/configuracion">Configuración</Link>
                  </li>
                  <li>
                    <Link to="/estadisticas">Estadísticas</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="menu__parent"
                onClick={() => handleMenuToggle(2)}
              >
                Distribución
              </button>
              {activeMenu === 2 && (
                <ul className="submenu">
                  <li>
                    <Link to="/compras-regulares">Compras regulares</Link>
                  </li>
                  <li>
                    <Link to="/compras-automaticas">Compras automáticas</Link>
                  </li>
                  <li>
                    <Link to="/configuracion">Configuración</Link>
                  </li>
                  <li>
                    <Link to="/estadisticas">Estadísticas</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="menu__parent"
                onClick={() => handleMenuToggle(3)}
              >
                Redistribución
              </button>
              {activeMenu === 3 && (
                <ul className="submenu">
                  <li>
                    <Link to="/compras-regulares">Compras regulares</Link>
                  </li>
                  <li>
                    <Link to="/compras-automaticas">Compras automáticas</Link>
                  </li>
                  <li>
                    <Link to="/configuracion">Configuración</Link>
                  </li>
                  <li>
                    <Link to="/estadisticas">Estadísticas</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="menu__parent"
                onClick={() => handleMenuToggle(4)}
              >
                Estimaciones
              </button>
              {activeMenu === 4 && (
                <ul className="submenu">
                  <li>
                    <Link to="/analisis">Análisis de estimaciones</Link>
                  </li>
                  <li>
                    <Link to="/regresion-demanda">Regresión de demanda</Link>
                  </li>
                  <li>
                    <Link to="/regresion-oferta">Regresión de oferta</Link>
                  </li>
                  <li>
                    <Link to="/reportes">Reportes</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
