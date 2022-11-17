import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettAllVideoGames } from "../../redux/actions/index";
import VideoGame from "../VideoGame/VideoGame";
import "./home.css";

function Home() {
  const dispatch = useDispatch();

  // const filterVideoGames = useSelector((state) => state.filterVideoGames);
  // const filterBy = useSelector((state) => state.filterBy);
  // const orderBy = useSelector((state) => state.orderBy);
  let videogames = useSelector((state) => state.videogames);

  // montamos el componente
  useEffect(() => {
    // Buscamos todos los videogames -> didMount
    dispatch(gettAllVideoGames());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="titulo">
        <h1>Catalog VideoGame</h1>
        <button type="button" onClick={() => window.location.reload()}>Reset</button>
        <hr id="espacio"/>
      </div>
      {
        videogames.length ? videogames.map((game) => {
          return(
            <VideoGame
            key={game.id}
            id={game.id}
            img={game.img}
            name={game.name}
            genres={`Genres: ${game.genres.join(", ")}`}
            />
          )
        }): <h1>Loading</h1>
      }
    </div>
  )

  //Filtrado y Ordenado
  // let allVideoGames = null;
  // filterBy === "All" && orderBy === "Select"
  //   ? (allVideoGames = videoGames)
  //   : (allVideoGames = filterVideoGames);
}

export default Home;

// if (videogames.length) {
    
//   return videogames.map((game) => <VideoGame
//   key={game.id} 
//   id={game.id}
//   name={game.name}
//   img={game.img}
//   genres={`Generos: ${game.genres.join(", ")}`}
//   />);
// } else {
//   return <h1>Loading</h1>;
// }