import React from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { gettVideoGameById } from "../../redux/actions";
import "./card.css";


function VideoGame(props) {

  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(gettVideoGameById(id));
  }

  return(
    <div className="card">
      <Link to={`/videogames/${props.id}`} onClick={() => handleClick(props.id)}>
        <h3>{props.name}</h3>
        <img src={props.img} alt={props.name} />
      </Link>
        <h3>{props.genres}</h3>
    </div>
  )
}

export default VideoGame;