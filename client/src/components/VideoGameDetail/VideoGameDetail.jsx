import React, { useEffect } from "react";
import { getGameById, cleanUp } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./videoGameDetail.css";

const VideoGameDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const videoGameDetail = useSelector((state) =>state.searchVideoGameById);

  useEffect(() => {
    dispatch(getGameById(id)) && dispatch(cleanUp());
  },[dispatch, id]);

  if (Object.entries(videoGameDetail) !== 0 && videoGameDetail.hasOwnProperty("id")) {
    return(
      <div className="detail">
        <div id="detail-props">
          <h1>{videoGameDetail.name}</h1>
          <p>{`Genres: ${videoGameDetail.genres.join(", ")}`}</p>
          <p>{`Rating: ${videoGameDetail.rating}`}</p>
          <p>{`Release date: ${videoGameDetail.release_date}`}</p>
          <p>{`Platforms: ${videoGameDetail.platforms.join(", ")}`}</p>
          <div id="detail-descrip">
            <p>{`Description: ${videoGameDetail.description}`}</p>
          </div>
        </div>

        <div className="detail-img">
          <img id="imagen-game" src={videoGameDetail.img} alt={videoGameDetail.name} />
        </div>
      </div>
    )
  } else {
    return(
      <h1>Loading</h1>
    )
  }
};

export default VideoGameDetail;
