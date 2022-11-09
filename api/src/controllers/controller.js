const { Router } = require("express");
const { Op } = require("sequelize");
const { API_KEY, Videogame, Genre } = require("../db");
const fetch = require("node-fetch");

const link = "https://api.rawg.io/api/games";
const link2 = "https://api.rawg.io/api/genres";

const listVideoGames = async (search) => {
  try {
    // console.log(search);
    if (search) {
      search = search.toLowerCase();
      console.log(search);
      const apiQuery = await fetch(
        link + `?search=${search}&key=${API_KEY}`
      ).then((data) => data.json());

      console.log(apiQuery);
      const nameVideoGame = apiQuery.results.map((data) => {
        return {
          id: data.id,
          name: data.name,
          genres: data.genres.map((genero) => genero.name),
          rating: data.rating,
          release_date: data.released,
          platforms: data.platforms.map(
            (plataforma) => plataforma.platform.name
          ),
          img: data.background_image,
        };
      });

      const names = await Videogame.findAll();

      return [...nameVideoGame, ...names];
    } else {
      const api = await fetch(link + `?key=${API_KEY}`).then((data) =>
        data.json()
      );

      const apiResult = api.results.map((data) => {
        return {
          id: data.id,
          name: data.name,
          genres: data.genres.map((genero) => genero.name),
          rating: data.rating,
          release_date: data.released,
          platforms: data.platforms.map(
            (plataforma) => plataforma.platform.name
          ),
          img: data.background_image,
        };
      });

      const games = await Videogame.findAll();

      return [...games, ...apiResult];
    }
  } catch (error) {
    throw new Error("No se encontro un video juego");
  }
};

const listGenres = async () => {
  try {
    const api = await fetch(link2 + `?key=${API_KEY}`).then((data) =>
      data.json()
    );

    const apiResult = api.results.map((data) => {
      return {
        id: data.id,
        genres: data.name,
      };
    });
    const genres = await Genre.findAll();

    return [...genres, ...apiResult];
  } catch (error) {
    throw new Error("No se encontraron los genereos solicitados");
  }
};

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
const addVideoGames = async (body) => {
  try {
    // const { name, description, release_date, rating, platforms, genre } = body;
    if (!body.name || !body.description || !body.platforms) {
      throw new Error("No se agrego un video juego, faltan parametros");
    }

    const newGame = await Videogame.create(body);

    // let addGenre = genre.map((data) => {
    //   return Genre.findOne({
    //     where: {
    //       name: data,
    //     },
    //   });
    // });

    // let addPlatform = platforms.map((data) => {
    //   return;
    // });

    return newGame;
  } catch (error) {
    throw error;
  }
};

const detailVideoGame = async (id) => {
  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  const api = await fetch(link + `/${id}?key=${API_KEY}`).then((data) =>
    data.json()
  );

  try {
    if (!isNaN(id)) {
      if (!api.id) {
        throw new Error(`El id: ${id}, no corresponde a ningun Video Juego`);
      }
      if (api) {
        return {
          id: api.id,
          name: api.name_original,
          genres: api.genres.map((genero) => genero.name),
          rating: api.rating,
          release_date: api.released,
          platforms: api.platforms.map(
            (plataforma) => plataforma.platform.name
          ),
          img: api.background_image,
          description: api.description_raw,
        };
      }
    } else if (regex.test(id)) {
      const game = await Videogame.findByPk(id);
      return game;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { listVideoGames, listGenres, addVideoGames, detailVideoGame };
