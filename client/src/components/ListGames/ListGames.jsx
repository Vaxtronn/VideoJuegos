import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getViewGames } from "../../redux/actions";
import VideoGame from "../VideoGame/VideoGame";
import "./ListGames.css";

const ListGames = () => {
  const dispatch = useDispatch();

  const { videogames, searchVideoGameByName, viewGames, currentPage, filterGame, limitGames } = useSelector(
    (state) => state
  );

  useEffect(() => {
    dispatch(getViewGames())
  },[dispatch, videogames, filterGame, searchVideoGameByName, currentPage, limitGames])

  return (
    <div className="games">
      <div className="titulo-game">
        <h1>GamesTop</h1>
      </div>
      {
        viewGames.length ?
        viewGames.map(data => {
          return <VideoGame 
          key={data.id}
          id={data.id}
          img={data.img}
          name={data.name}
          genres={data.genres.join(" ")}
          rating={data.rating}
           />
        }): <h1>Loading</h1>
      }
    </div>
  );
};

export default ListGames;
