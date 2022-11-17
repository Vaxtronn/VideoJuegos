import React from "react";
import { useDispatch } from "react-redux";
import {NavLink} from "react-router-dom";
import { gettVideoGameById } from "../../redux/actions";
import "./card.css";


function VideoGame(props) {

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(gettVideoGameById(id));
  }

  return(
    <div className="card">
      <div className="box">
        <NavLink to={`/videogames/detail/${props.id}`} onClick={() => handleClick(props.id)} className="barra">
          <img src={props.img} alt={props.name} />
          <h3>{props.name}</h3>
        </NavLink>
        <p>{props.genres}</p>
      </div>
      
    </div>
  )
}

export default VideoGame;