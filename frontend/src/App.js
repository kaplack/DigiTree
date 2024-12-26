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
import MobileScannerForm from "./pages/MobileScannerForm";
import Consulta from "./pages/consulta/Consulta";
import Compra from "./pages/compras/Compra";
import Distribucion from "./pages/distribucion/Distribucion";
import Estimaciones from "./pages/estimaciones/Estimaciones";
import Redistribucion from "./pages/redistribucion/Redistribucion";
import PrivateRoute from "./components/PrivateRoute";

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

            <Route path="consultas" element={<Consulta />}></Route>
            <Route
              path="consulta/stock"
              element={
                <PrivateRoute>
                  <Stock />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="consulta/ubicacionvencimiento"
              element={
                <PrivateRoute>
                  <UbicacionVencimiento />
                </PrivateRoute>
              }
            />
            <Route
              path="consulta/trazabilidad"
              element={
                <PrivateRoute>
                  <Trazabilidad />
                </PrivateRoute>
              }
            />
            <Route
              path="consulta/marcos-contractuales"
              element={
                <PrivateRoute>
                  <MarcosContractuales />
                </PrivateRoute>
              }
            />
            <Route
              path="consulta/proveedores"
              element={
                <PrivateRoute>
                  <Proveedores />
                </PrivateRoute>
              }
            />

            {/* COMPRAS **********************************************************************/}
            <Route path="compras" element={<Compra />}></Route>
            <Route
              path="compras/regulares"
              element={
                <PrivateRoute>
                  <ComprasRegulares />
                </PrivateRoute>
              }
            />
            <Route
              path="compras/automaticas"
              element={
                <PrivateRoute>
                  <ComprasAutomaticas />
                </PrivateRoute>
              }
            />
            <Route
              path="compras/configuracion"
              element={
                <PrivateRoute>
                  <Configuracion />
                </PrivateRoute>
              }
            />
            <Route
              path="compras/estadisticas"
              element={
                <PrivateRoute>
                  <Estadistica />
                </PrivateRoute>
              }
            />

            {/* Distribución **********************************************************************/}
            <Route path="distribucion" element={<Distribucion />}></Route>
            <Route
              path="distribucion/ingresomedicamentos"
              element={
                <PrivateRoute>
                  <IngresoMedicamentos />
                </PrivateRoute>
              }
            />
            <Route
              path="distribucion/salidademedicamentos"
              element={
                <PrivateRoute>
                  <SalidaMedicamento />
                </PrivateRoute>
              }
            />
            <Route
              path="distribucion/contabilizaciones"
              element={
                <PrivateRoute>
                  <Contabilizaciones />
                </PrivateRoute>
              }
            />
            <Route
              path="distribucion/reportes"
              element={
                <PrivateRoute>
                  <Reportes />
                </PrivateRoute>
              }
            />

            {/* Re-Distribución **********************************************************************/}
            <Route path="redistribucion" element={<Redistribucion />}></Route>
            <Route
              path="redistribucion/ingresomedicamentos"
              element={
                <PrivateRoute>
                  <ReIngresoMedicamento />
                </PrivateRoute>
              }
            />
            <Route
              path="redistribucion/salidademedicamentos"
              element={
                <PrivateRoute>
                  <ReSalidaMedicamento />
                </PrivateRoute>
              }
            />
            <Route
              path="redistribucion/contabilizaciones"
              element={
                <PrivateRoute>
                  <ReContabilizaciones />
                </PrivateRoute>
              }
            />
            <Route
              path="redistribucion/reportes"
              element={
                <PrivateRoute>
                  <ReReportes />
                </PrivateRoute>
              }
            />

            {/* Estimaciones *************************************************************************/}

            <Route path="estimaciones" element={<Estimaciones />}></Route>
            <Route
              path="estimaciones/analisis"
              element={
                <PrivateRoute>
                  <Analisis />
                </PrivateRoute>
              }
            />
            <Route
              path="estimaciones/regresiondemanda"
              element={
                <PrivateRoute>
                  <RegresionDemanda />
                </PrivateRoute>
              }
            />
            <Route
              path="estimaciones/regresionoferta"
              element={
                <PrivateRoute>
                  <RegresionOferta />
                </PrivateRoute>
              }
            />
            <Route
              path="estimaciones/reportes"
              element={
                <PrivateRoute>
                  <EstReportes />
                </PrivateRoute>
              }
            />

            {/* <Route
              path="mobile-scanner"
              element={<MobileScannerForm />}
            ></Route> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
