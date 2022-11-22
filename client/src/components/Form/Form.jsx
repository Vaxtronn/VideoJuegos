import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import { createVideoGames, getGenres } from "../../redux/actions/index";
import "./Form.css";

function validate(input) {
  let error = {};
  // Validaciones
  if (!input.name) {
    error.name = "Name is required";
  }

  if (!input.description) {
    error.description = "Description is required";
  }

  if (!input.release_date) {
    error.release_date = "Release date is required";
  }

  if (!input.rating) {
    error.rating = "Rating is required";
  } else if (
    Number(input.rating) > 5 ||
    Number(input.rating) < 1 ||
    isNaN(Number(input.rating))
  ) {
    error.rating = "Rating is invalid";
  }

  if (!input.platforms.legth < 1) {
    error.platforms = "At least one platform";
  }

  if (!input.genres.legth < 1) {
    error.genres = "At least one platform";
  }

  return error;
}

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

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    platforms: [],
    background_image: "",
    genres: [],
  });

  const [input, setInput] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 0,
    platforms: [],
    background_image: "",
    genres: [],
  });

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);

  // montamos el componente
  useEffect(() => {
    // Buscamos todos los generos -> didMount
    dispatch(getGenres());
  }, [dispatch]);

  const handleChangeInput = (e) => {
    // if (e.target.name === "genres" || e.target.name === "platforms") {
    //   const list = input[e.target.name];
    //   setInput({
    //     ...input,
    //     [e.target.name]: list.concat(e.target.value),
    //   });
    // } else {
    //   setInput({ ...input, [e.target.name]: e.target.value });
    // }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    const game = {
      name: input.name,
      description: input.description,
      release_date: input.release_date,
      rating: input.rating,
      platforms: input.platforms,
      background_image: input.background_image,
      genres: input.genres,
    };

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
      background_image: "",
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
    <div className="fondo">
      <h3 className="titulo-form">Create a VideoGame</h3>
      <form
        className="formulario"
        onSubmit={(e) => handleSumbit(e)}
        onChange={(e) => handleChangeInput(e)}
      >
        <div className="name">
          <label>Name: </label>
          <input key="name" type="text" name="name" defaultValue={input.name} />
          {errors.name && <p className="danger"> {errors.name} </p>}
          {console.log(errors.name)}
          <hr />
        </div>

        <div className="description">
          <label>Description: </label>
          <hr />
          <textarea
            key="description"
            type="text"
            name="description"
            defaultValue={input.description}
            rows="6"
            cols="40"
          />
          {errors.description && (
            <p className="danger"> {errors.description} </p>
          )}
        </div>
        <hr />

        <div className="released">
          <label>Released: </label>
          <input
            key="release_date"
            type="date"
            name="release_date"
            required
            defaultValue={input.release_date}
          />
          {errors.released && <p className="danger"> {errors.released} </p>}
          <hr />
        </div>

        <div className="rating">
          <label>Rating: </label>
          <input
            key="rating"
            type="number"
            name="rating"
            defaultValue={input.rating}
            placeholder="1 to 5, example: 3.5"
          />
          <hr />
          {errors.rating && <p className="danger"> {errors.rating} </p>}
        </div>

        <div className="image">
          <label>Image: </label>
          <input
            key="background_image"
            type="text"
            name="background_image"
            defaultValue={input.background_image}
            placeholder="URL of an image"
          />
        </div>
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
          {errors.platforms && <p className="danger"> {errors.platforms} </p>}
        </div>
        <hr />

        <div className="genresDiv">
          <label>Genres</label>
          <div>
            {allGenres.map((gen) => (
              <div key={gen.name}>
                <input type="checkbox" name="genres" value={gen.name}></input>
                <label name={gen}>{gen.name}</label>
              </div>
            ))}
          </div>
        </div>
        {errors.genres && <p className="danger"> {errors.genres} </p>}
        <hr />

        <button className="btn" type="submit">Create</button>
      </form>
      <Link to={"/videogames"}>
        <button className="btn2">Home</button>
      </Link>
    </div>
  );
};

export default Form;
