import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


function Navbar() {
  return(
    <nav>
      <div className="nav">
        <p><NavLink to="/videogames" >Inicio</NavLink></p>
        <p><NavLink to="/videogames/post">Create VideoGame</NavLink></p>
      </div>
      <SearchBar />
    </nav>
  )

}

export default Navbar;