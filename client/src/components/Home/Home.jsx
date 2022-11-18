import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { gettAllVideoGames } from "../../redux/actions/index";
import ListGames from "../ListGames/ListGames";
import Paginado from "../Paginado/Paginado";
import "./home.css";

function Home() {
  const dispatch = useDispatch();

  // montamos el componente
  useEffect(() => {
    // Buscamos todos los videogames -> didMount
    dispatch(gettAllVideoGames());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="titulo">
        {/* <button type="button" onClick={() => window.location.reload()}>Reset</button> */}
        <hr id="espacio"/>
      </div>
      <ListGames />
      <Paginado />
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