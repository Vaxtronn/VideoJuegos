import "./landing.css";
import React from "react";
import { Link } from "react-router-dom";


function Landing() {
  return(
    <div className="landing">
      <a href="https://github.com/Vaxtronn" target={"_blank"} rel="noreferrer">
        <button>
          <ion-icon name="logo-github" >GitHub</ion-icon>
        </button>
      <button>
        <Link to={"/videogames"}>Inicio</Link>
      </button>
      </a>
      <a href="https://www.linkedin.com/in/miguel-villa-655899158/" target={"_blank"} rel="noreferrer">
        <button>
          <ion-icon name="logo-linkedin"></ion-icon>
        </button>
      </a>
      <h1>Hola soy Lading Page</h1>
    </div>
  )
}

export default Landing;