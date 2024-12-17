import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stock from "./pages/consulta/Stock";
import Header from "./components/Header";
import UbicacionVencimiento from "./pages/consulta/UbicacionVencimiento";
import Trazabilidad from "./pages/consulta/Trazabilidad";
import MarcosContractuales from "./pages/consulta/MarcosContractuales";
import Proveedores from "./pages/consulta/Proveedores";
import ComprasRegulares from "./pages/compras/ComprasRegulares";
import ComprasAutomaticas from "./pages/compras/ComprasAutomaticas";
import Configuracion from "./pages/compras/Configuracion";
import Estadistica from "./pages/compras/Estadisticas";
import IngresoMedicamentos from "./pages/distribucion/IngresoMedicamentos";
import SalidaMedicamento from "./pages/distribucion/SalidaMedicamentos";
import Contabilizaciones from "./pages/distribucion/Contabilizaciones";
import Reportes from "./pages/distribucion/Reportes";
import ReIngresoMedicamento from "./pages/redistribucion/IngresoMedicamentos";
import ReSalidaMedicamento from "./pages/redistribucion/SalidaMedicamentos";
import ReContabilizaciones from "./pages/redistribucion/Contabilizaciones";
import ReReportes from "./pages/redistribucion/Reportes";
import Analisis from "./pages/estimaciones/Analisis";
import RegresionDemanda from "./pages/estimaciones/RegresionDemanda";
import RegresionOferta from "./pages/estimaciones/RegresionOferta";
import EstReportes from "./pages/estimaciones/Reportes";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            {/* CONSULTA **********************************************************************/}
            <Route path="consulta/stock" element={<Stock />}></Route>
            <Route
              path="consulta/ubicacionvencimiento"
              element={<UbicacionVencimiento />}
            ></Route>
            <Route
              path="consulta/trazabilidad"
              element={<Trazabilidad />}
            ></Route>
            <Route
              path="consulta/marcos-contractuales"
              element={<MarcosContractuales />}
            ></Route>
            <Route
              path="consulta/proveedores"
              element={<Proveedores />}
            ></Route>

            {/* COMPRAS **********************************************************************/}
            <Route
              path="compras/regulares"
              element={<ComprasRegulares />}
            ></Route>
            <Route
              path="compras/automaticas"
              element={<ComprasAutomaticas />}
            ></Route>
            <Route
              path="compras/configuracion"
              element={<Configuracion />}
            ></Route>
            <Route
              path="compras/estadisticas"
              element={<Estadistica />}
            ></Route>

            {/* Distribución **********************************************************************/}
            <Route
              path="distribucion/ingresomedicamentos"
              element={<IngresoMedicamentos />}
            ></Route>
            <Route
              path="distribucion/salidademedicamentos"
              element={<SalidaMedicamento />}
            ></Route>
            <Route
              path="distribucion/contabilizaciones"
              element={<Contabilizaciones />}
            ></Route>
            <Route path="distribucion/reportes" element={<Reportes />}></Route>

            {/* Re-Distribución **********************************************************************/}
            <Route
              path="redistribucion/ingresomedicamentos"
              element={<ReIngresoMedicamento />}
            ></Route>
            <Route
              path="redistribucion/salidademedicamentos"
              element={<ReSalidaMedicamento />}
            ></Route>
            <Route
              path="redistribucion/contabilizaciones"
              element={<ReContabilizaciones />}
            ></Route>
            <Route
              path="redistribucion/reportes"
              element={<ReReportes />}
            ></Route>

            {/* Estimaciones *************************************************************************/}
            <Route path="estimaciones/analisis" element={<Analisis />}></Route>
            <Route
              path="estimaciones/regresiondemanda"
              element={<RegresionDemanda />}
            ></Route>
            <Route
              path="estimaciones/regresionoferta"
              element={<RegresionOferta />}
            ></Route>
            <Route
              path="estimaciones/reportes"
              element={<EstReportes />}
            ></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
