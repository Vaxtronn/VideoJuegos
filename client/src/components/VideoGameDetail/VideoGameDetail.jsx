import React, { useEffect } from "react";

import { gettVideoGameById } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const VideoGameDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  console.log(id);
  const videoGameDetail = useSelector((state) =>state.searchVideoGameById);
  
  console.log(videoGameDetail);

  useEffect(() => {
    dispatch(gettVideoGameById(id));
  },[dispatch, id]);

  if (videoGameDetail.hasOwnProperty("id")) {
    return(
      <div>
        <h1>Hola entre a detalle</h1>
        <h1>{videoGameDetail.name}</h1>
        <p>{videoGameDetail.genres}</p>
        <p>{videoGameDetail.rating}</p>
        <p>{videoGameDetail.release_date}</p>
        <p>{videoGameDetail.platforms}</p>
        <p>{videoGameDetail.description}</p>
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
