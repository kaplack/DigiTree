import React, { useEffect, useState } from "react";
import { BrowserBarcodeReader } from "@zxing/library";
import { QRCodeCanvas } from "qrcode.react";

const BarcodeScanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");

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
      const codeReader = new BrowserBarcodeReader();
      const videoInputDevices = await codeReader.getVideoInputDevices();
      const firstDeviceId = videoInputDevices[0]?.deviceId;

      codeReader
        .decodeFromInputVideoDevice(firstDeviceId, "video")
        .then((result) => {
          setBarcode(result.text);
          codeReader.reset();
        });
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
