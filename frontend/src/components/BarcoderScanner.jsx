import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library"; // Usamos BrowserMultiFormatReader
import { QRCodeCanvas } from "qrcode.react";

const BarcodeScanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setIsMobile(/android|iphone|ipad|ipod/i.test(userAgent));

    if (!/android|iphone|ipad|ipod/i.test(userAgent)) {
      setMobileUrl(`${window.location.origin}/mobile-scanner`);
    }
  }, []);

  // Función para iniciar el escáner en móvil/tablet
  const startScanner = async () => {
    try {
      const codeReader = new BrowserMultiFormatReader(); // Usamos BrowserMultiFormatReader
      const videoInputDevices = await codeReader.listVideoInputDevices(); // listVideoInputDevices
      const firstDeviceId = videoInputDevices[0]?.deviceId;

      if (firstDeviceId) {
        // Usamos el método recomendado para la detección
        codeReader
          .decodeFromVideoInput(firstDeviceId, "video")
          .then((result) => {
            setBarcode(result.text); // Código detectado
            codeReader.reset(); // Reseteamos el lector después del escaneo
          })
          .catch((error) => {
            console.error("Error al escanear:", error);
          });
      } else {
        console.error("No se encontraron cámaras disponibles");
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  return (
    <div>
      {isMobile ? (
        <div>
          <h3>Escanea el código de barras:</h3>
          <video
            id="video"
            width="100%"
            style={{ border: "1px solid #ccc" }}
          ></video>
          <button onClick={startScanner}>Iniciar Escáner</button>
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
