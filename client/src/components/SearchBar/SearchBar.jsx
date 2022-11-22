import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../../redux/actions";
import "./SearchBar.css";

function SearchBar() {
  //Setear los hooks
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getGameByName(search))
  }

  // funcion de busqueda
  const handleInput = (e) => {
    setSearch(e.target.value);
  };


  return (
    <div className="search">
      <input
        value={search}
        onChange={handleInput}
        type="text"
        placeholder="Search Game..."
        style={{color: "black"}}
        className="barra"
      />
      <button className="btn" onClick={handleClick}>Go</button>
    </div>
  );
}

export default SearchBar;
