import React from "react";
import {  useDispatch, useSelector } from "react-redux";
import { sumPage, decPage, updatePage } from "../../redux/actions";
import "./Paginado.css";

const Paginado = () => {
  const dispatch = useDispatch();

  const {currentPage, videogames, limitGames} = useSelector(state => state);

  const handleClick = (e) => {
    e.target.name === "plus" ? dispatch(sumPage()) : dispatch(decPage())
  }

  const handlePageClick = (e) => {
    dispatch(updatePage(e.target.name));
  }


  const pageNumber = new Array(
    Math.ceil(videogames.length / limitGames)
  ).fill(1);
  return (
    <div className="pagination">
      <button key="less" disabled={currentPage === 0} name="less" onClick={handleClick}>{"<"}</button>
      {pageNumber.map((value, index) => (
        <button key={index} name={index} onClick={handlePageClick}>
          {index + 1}
        </button>
      ))}
      <button key="plus" disabled={currentPage === 5} name="plus" onClick={handleClick}>{">"}</button>
    </div>
  );
};

export default Paginado;
