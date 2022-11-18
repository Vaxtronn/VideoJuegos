import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { gettVideoGameByName } from "../../redux/actions";
import "./SearchBar.css";

function SearchBar() {
  //Setear los hooks
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  // const searchGame = useSelector((state) => state.videogames);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(gettVideoGameByName(search))
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
        className="barra"
      />
      <button onClick={handleClick}>Go</button>
    </div>
  );
}

export default SearchBar;
