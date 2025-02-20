import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { FaQrcode, FaStop, FaBarcode } from "react-icons/fa6";
import { CiBarcode } from "react-icons/ci";
import { toast } from "react-toastify";
import { consultaFetch } from "../app/utils";
import axios from "axios";

const BarcodeScannerAll = ({ meds, setMeds }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState(null); // Usar el estado para el escáner

  // Efecto para inicializar el scanner después de que el componente esté montado
  useEffect(() => {
    const qrScanner = new Html5Qrcode("reader");
    setScanner(qrScanner);

    // Limpiar el escáner al desmontar el componente
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  const handleScan = async () => {
    try {
      setIsScanning(true);

      if (scanner) {
        await scanner.start(
          { facingMode: "environment" }, // Usar la cámara trasera
          {
            fps: 60, // Velocidad de escaneo
            qrbox: { width: 250, height: 250 }, // Tamaño del área de escaneo
          },
          async (decodedText) => {
            console.log(`Código detectado: ${decodedText}`);
            // Asegúrate de detener el escáner solo si está activo
            if (decodedText) {
              console.log("escaneando true");
              scanner.stop().then(() => setIsScanning(false));
            }

            try {
              // Realizamos la solicitud POST a la API
              const responseb = await axios.post(
                process.env.REACT_APP_API_URL + "/api/med/",
                { codigoItem: decodedText }
              );

              // Accedemos a los datos de la respuesta
              const existingMed = responseb.data;

              // Mostramos los datos en la consola
              console.log(existingMed);
              setMeds(existingMed);

              // Si necesitas realizar algo adicional con los datos:
              if (existingMed) {
                console.log("Medicamento encontrado:", existingMed);
              }
            } catch (error) {
              // Mostramos un mensaje de error en caso de que falle la solicitud
              console.error("Error al buscar el medicamento:", error);

              // Mostramos una notificación al usuario
              toast.error("Hubo un error al buscar este itemcode");
            }
          },
          (error) => {
            console.warn(`Error de escaneo: ${error}`);
          }
        );
      }
    } catch (err) {
      console.error("Error al iniciar el escáner:", err);
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (scanner) {
      // Detener primero el escáner y luego limpiarlo
      scanner
        .stop()
        .then(() => {
          setIsScanning(false);
        })
        .catch((error) => {
          console.error("Error al detener el escáner:", error);
        });
    }
  };

  return (
    <div className="barcode-scanner">
      {isScanning ? (
        <button type="button" onClick={stopScanner} className="btn btn-scan">
          <FaStop size={40} /> <span>Detener scanner</span>
        </button>
      ) : (
        <button type="button" onClick={handleScan} className="btn btn-scan">
          <CiBarcode size={40} /> <span>Iniciar scanner</span>
        </button>
      )}

      <div
        id="reader"
        style={isScanning ? { width: "300px" } : { display: "none" }}
      ></div>
    </div>
  );
};

export default BarcodeScannerAll;
