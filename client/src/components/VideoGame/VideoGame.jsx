import React from "react";
import { useDispatch } from "react-redux";
import {NavLink} from "react-router-dom";
import { getGameById } from "../../redux/actions";
import "./card.css";


function VideoGame(props) {

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(getGameById(id));
  }

  return(
    <div className="card">
      <div className="box">
        <div className="top-card">
          <p>{props.rating}</p>
        </div>
        <NavLink to={`/videogames/detail/${props.id}`} onClick={() => handleClick(props.id)} className="barra">
          <img src={props.img} alt={props.name} />
          <h3>{props.name}</h3>
        </NavLink>
        <p className="genres">{props.genres}</p>
        
      </div>
      
    </div>
  )
}

export default VideoGame;