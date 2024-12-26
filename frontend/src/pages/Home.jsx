import React from "react";
import {
  FaQuestion,
  FaCartPlus,
  FaAmbulance,
  FaRecycle,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function Home() {
  return (
    <>
      {/* <Slider /> */}
      <div className="home-menu">
        <Link to="/consultas">
          <div className="home-menu__item">
            <FaQuestion className="home-menu__item--icon" />
            <h2>Consultas</h2>
          </div>
        </Link>
        <Link to="/compras">
          <div className="home-menu__item">
            <FaCartPlus className="home-menu__item--icon" />
            <h2>Compras</h2>
          </div>
        </Link>
        <Link to="/distribucion">
          <div className="home-menu__item">
            <FaAmbulance className="home-menu__item--icon" />
            <h2>Distribución</h2>
          </div>
        </Link>
        <Link to="/redistribucion">
          <div className="home-menu__item">
            <h2>Redistribución</h2>
            <FaRecycle className="home-menu__item--icon" />
          </div>
        </Link>
        <Link to="/estimaciones">
          <div className="home-menu__item">
            <FaChartLine className="home-menu__item--icon" />
            <h2>Estimaciones</h2>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
