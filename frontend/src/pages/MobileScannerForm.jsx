import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const MobileScannerForm = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let selectedDeviceId = null;

    const startScanner = async () => {
      try {
        // Lista los dispositivos de video (cámaras disponibles)
        const videoInputDevices = await codeReader.listVideoInputDevices();
        console.log("Cámaras disponibles:", videoInputDevices);

        // Busca una cámara trasera
        const rearCamera = videoInputDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );

        // Si no se encuentra cámara trasera, usa la primera disponible
        selectedDeviceId =
          rearCamera?.deviceId || videoInputDevices[0]?.deviceId;

        if (!selectedDeviceId) {
          throw new Error("No se pudo encontrar una cámara compatible.");
        }

        // Inicia el escáner en la cámara seleccionada
        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              setScanResult(result.text); // Muestra el resultado escaneado
              console.log("Código escaneado:", result.text);
            }
            if (err && !(err instanceof codeReader.NotFoundException)) {
              console.error("Error al escanear:", err);
            }
          }
        );
      } catch (err) {
        console.error("Error al iniciar el escáner:", err);
        setError(
          "No se pudo acceder a la cámara. Asegúrate de otorgar permisos."
        );
      }
    };

    startScanner();

    return () => {
      // Detener el escáner al desmontar el componente
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h1>Lector de Códigos de Barra</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <>
          <video
            ref={videoRef}
            style={{ width: "100%", maxHeight: "400px" }}
            autoPlay
            muted
          ></video>
          {scanResult && (
            <div>
              <h2>Resultado Escaneado:</h2>
              <p>{scanResult}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileScannerForm;
