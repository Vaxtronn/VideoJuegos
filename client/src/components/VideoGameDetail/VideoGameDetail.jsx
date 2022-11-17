import React, { useEffect } from "react";

import { gettVideoGameById } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const VideoGameDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const videoGameDetail = useSelector((state) =>state.searchVideoGameById);

  useEffect(() => {
    dispatch(gettVideoGameById(id));
  },[dispatch, id]);

  if (Object.entries(videoGameDetail) !== 0 && videoGameDetail.hasOwnProperty("id")) {
    return(
      <div>
        <h1>Hola entre a detalle</h1>
        <h1>{videoGameDetail.name}</h1>
        <p>{`Generos: ${videoGameDetail.genres.join(", ")}`}</p>
        <p>{`Rating: ${videoGameDetail.rating}`}</p>
        <p>{`Fecha de lanzamiento: ${videoGameDetail.release_date}`}</p>
        <p>{`Plataformas: ${videoGameDetail.platforms.join(", ")}`}</p>
        <p>{`Descripción: ${videoGameDetail.description}`}</p>
        <img src={videoGameDetail.img} alt={videoGameDetail.name} />
      </div>
    )
  } else {
    return(
      <h1>Loading</h1>
    )
  }
};

export default VideoGameDetail;
