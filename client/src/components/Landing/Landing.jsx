import "./landing.css";
import React from "react";
import { NavLink } from "react-router-dom";


function Landing() {
  return(
    <div className="landing">
        <a href="https://github.com/Vaxtronn?tab=repositories" target={"_blank"} rel="noreferrer">
          <button className="btn-git">
          </button>
        </a>

        <NavLink to={"/videogames"}>
          <button className="btn-inicio">Inicio</button>
        </NavLink>

        <a href="https://www.linkedin.com/in/miguel-villa-655899158/" target={"_blank"} rel="noreferrer">
          <button className="btn-linke">
          </button>
        </a>
    </div>
  )
}

export default Landing;