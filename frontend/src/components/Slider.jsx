import React, { useState } from "react";

const medicamentos = [
  {
    id: 1,
    nombre: "Distribución",
    descripcion: "Distribución de los medicamentos",
    imagen: "img/distribucion.jpeg",
  },
  {
    id: 2,
    nombre: "Ibuprofeno",
    descripcion: "Antiinflamatorio no esteroideo",
    imagen: "ibuprofeno.jpg",
  },
  {
    id: 3,
    nombre: "Amoxicilina",
    descripcion: "Antibiótico de amplio espectro",
    imagen: "amoxicilina.jpg",
  },
  {
    id: 4,
    nombre: "Omeprazol",
    descripcion: "Inhibidor de la bomba de protones",
    imagen: "omeprazol.jpg",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % medicamentos.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + medicamentos.length) % medicamentos.length
    );
  };

  return (
    <div className="slider-medicamentos">
      <button className="slider-button prev" onClick={handlePrev}>
        ❮
      </button>
      <div
        className="slider-content"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {medicamentos.map((medicamento, index) => (
          <div key={medicamento.id} className="slider-item">
            <div className="slider-item__text">
              <h3>{medicamento.nombre}</h3>
              <p>{medicamento.descripcion}</p>
            </div>
            <img
              src={medicamento.imagen}
              alt={medicamento.nombre}
              className="medicamento-imagen"
            />
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={handleNext}>
        ❯
      </button>
    </div>
  );
};

export default Slider;
