import React, { useState } from "react";
import { BrowserBarcodeReader } from "@zxing/library";

const MobileScannerForm = () => {
  const [barcode, setBarcode] = useState("");

  const startMobileScanner = async () => {
    const codeReader = new BrowserBarcodeReader();
    const videoInputDevices = await codeReader.getVideoInputDevices();
    const firstDeviceId = videoInputDevices[0]?.deviceId;

    codeReader
      .decodeFromInputVideoDevice(firstDeviceId, "video")
      .then((result) => {
        setBarcode(result.text);
        codeReader.reset();
      });
  };

  return (
    <div>
      <h3>Escanea el código de barras</h3>
      <video
        id="video"
        width="100%"
        style={{ border: "1px solid #ccc" }}
      ></video>
      <button onClick={startMobileScanner}>Iniciar Cámara</button>
      {barcode && <p>Código Detectado: {barcode}</p>}
      <button onClick={() => console.log("Enviar código:", barcode)}>
        Enviar Código
      </button>
    </div>
  );
};

export default MobileScannerForm;
