import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css";

function Navbar() {
  return(
    <nav className="nav-options">
      <div className="left-nav">
        <NavLink to="/videogames" activeClassName="active">Inicio</NavLink>
        <NavLink to="/videogames/post" activeClassName="active">Create Videogame</NavLink>
        <SearchBar />
      </div>
    </nav>
  )

}

export default Navbar;