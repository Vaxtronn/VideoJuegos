import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createVideoGames, getGenres } from "../../redux/actions/index";
import "./Form.css";

const Form = () => {
  const platformsRandom = [
    "PC",
    "Xbox Series S/X",
    "PlayStation 4",
    "PlayStation 3",
    "Xbox 360",
    "Xbox One",
    "PlayStation 5",
    "Android",
    "iOS",
    "macOs",
    "Linux",
    "Nintendo Switch",
    "PS Vita",
  ];

  const [input, setInput] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    platforms: [],
    genres: [],
  });

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);

  const genre1 = allGenres.slice(0, 10);
  const genre2 = allGenres.slice(11, 19);

  // montamos el componente
  useEffect(() => {
    // Buscamos todos los generos -> didMount
    dispatch(getGenres());
  }, [dispatch]);

  const handleChangeInput = (e) => {
    if (e.target.name === "genres" || e.target.name === "platforms") {
      const list = input[e.target.name];
      setInput({
        ...input,
        [e.target.name]: list.concat(e.target.value),
      });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    const game = {
      name: input.name,
      description: input.description,
      release_date: input.release_date,
      rating: input.rating,
      platforms: input.platforms,
      genres: input.genres,
    };

    // Validaciones
    if (!game.name) {
      alert("Name is required");
      return;
    }

    if (!game.description) {
      alert("Description is required");
      return;
    }

    if (!game.release_date) {
      alert("Release date is required");
      return;
    }

    if (!game.rating) {
      alert("Rating is required");
    } else if (
      Number(game.rating) > 5 ||
      Number(game.rating) < 1 ||
      isNaN(Number(game.rating))
    ) {
      alert("Rating is invalid");
      return;
    }
    // Creo el videogame en la BD
    dispatch(createVideoGames(game));
    // Reseto el formulario
    event.target.reset();
    alert("Videogame created succesfull");

    // Seteo el estado
    setInput({
      name: "",
      description: "",
      release_date: "",
      rating: 0,
      platforms: [],
      genres: [],
    });
  };
  // console.log("Name: ",input.name);  // OK
  // console.log("Release:", input.release); // OK
  // console.log("descri: ",input.description); // OK
  // console.log("ratig: ",input.rating); // OK
  // console.log("genre: ",input.genres); // OK
  // console.log("plat: ",input.platforms); // OK
  return (
    /**
     * Ruta de creación de videojuegos: debe contener

    [ ] Un formulario controlado con JavaScript con los siguientes campos:
    Nombre
    Descripción
    Fecha de lanzamiento
    Rating
    [ ] Posibilidad de seleccionar/agregar varios géneros
    [ ] Posibilidad de seleccionar/agregar varias plataformas
    [ ] Botón/Opción para crear un nuevo videojuego
     */
    <div className="form">
      <h3>Create a VideoGame</h3>
      <form
        className="formulario"
        noValidate
        onSubmit={(e) => handleSumbit(e)}
        onChange={(e) => handleChangeInput(e)}
      >
        <label>Name: </label>
        <input key="name" type="text" name="name" defaultValue={input.name} />
        <hr />

        <label>Description: </label>
        <input
          key="description"
          type="text"
          name="description"
          defaultValue={input.description}
        />
        <hr />

        <label>Released: </label>
        <input
          key="release_date"
          type="date"
          name="release_date"
          required
          defaultValue={input.release_date}
        />
        <hr />

        <label>Rating: </label>
        <input
          key="rating"
          type="number"
          step="any"
          name="rating"
          defaultValue={input.rating}
        />
        <hr />

        <div className="checks">
          <label>Platforms</label>
          <div>
            {platformsRandom.map((plat) => (
              <div key={plat}>
                <input type="checkbox" name="platforms" value={plat}></input>
                <label name={plat}>{plat}</label>
              </div>
            ))}
          </div>
        </div>
        <hr />

        <div className="checkbox">
          <label>Genres</label>
        </div>
        <div className="genresDiv">
          <div>
            {genre1.map((gen) => (
              <div key={gen.name}>
                <input type="checkbox" name="genres" value={gen.name}></input>
                <label name={gen}>{gen.name}</label>
              </div>
            ))}
          </div>
          <div>
            {genre2.map((gen) => (
              <div key={gen.name}>
                <input type="checkbox" name="genres" value={gen.name}></input>
                <label name={gen}>{gen.name}</label>
              </div>
            ))}
          </div>
        </div>
        <hr />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Form;
