import React from "react";
import { NavLink } from "react-router-dom";


function Navbar() {
  return(
    <div className="nav">
      <p><NavLink to="/videogames">Inicio</NavLink></p>
      <p><NavLink to="/videogames/post">Create VideoGame</NavLink></p>
    </div>
  )

}

export default Navbar;