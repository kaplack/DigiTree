import React, { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { QRCodeCanvas } from "qrcode.react";

const BarcodeScanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");
  const [isScannerStarted, setIsScannerStarted] = useState(false); // Nuevo estado para manejar el inicio del escáner

  // Detectar si es un móvil o tablet
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setIsMobile(/android|iphone|ipad|ipod/i.test(userAgent));

    // Generar URL para dispositivos móviles
    if (!/android|iphone|ipad|ipod/i.test(userAgent)) {
      setMobileUrl(`${window.location.origin}/mobile-scanner`);
    }
  }, []);

  // Función para iniciar el escáner en móvil/tablet
  const startScanner = async () => {
    try {
      const codeReader = new BrowserMultiFormatReader();
      const videoInputDevices = await codeReader.getVideoInputDevices();

      // Buscar la cámara principal (trasera) si está disponible
      const backCamera = videoInputDevices.find((device) =>
        device.label.toLowerCase().includes("back")
      );
      const firstDeviceId = backCamera
        ? backCamera.deviceId
        : videoInputDevices[0]?.deviceId;

      if (!firstDeviceId) {
        console.error("No se encontró una cámara disponible.");
        return;
      }

      // Iniciar el escáner con la cámara seleccionada
      await codeReader
        .decodeFromInputVideoDevice(firstDeviceId, "video")
        .then((result) => {
          setBarcode(result.text);
          codeReader.reset();
        });

      setIsScannerStarted(true); // Marcar que el escáner ha iniciado
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  return (
    <div>
      {isMobile ? (
        <div>
          <h3>Escanea el código de barras:</h3>
          {!isScannerStarted ? (
            <div>
              <video
                id="video"
                width="100%"
                style={{ border: "1px solid #ccc" }}
              ></video>
              <button onClick={startScanner}>Iniciar Escáner</button>
            </div>
          ) : (
            <p>
              Escáner iniciado. Por favor, apunte hacia un código de barras.
            </p>
          )}
          {barcode && <p>Código Detectado: {barcode}</p>}
        </div>
      ) : (
        <div>
          <h3>Escanea este código QR desde tu celular:</h3>
          {mobileUrl && <QRCodeCanvas value={mobileUrl} size={100} />}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
