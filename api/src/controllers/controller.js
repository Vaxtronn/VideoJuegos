const { Router } = require("express");
const { Op } = require("sequelize");
const { API_KEY, Videogame, Genre } = require("../db");
const fetch = require("node-fetch");

const link = "https://api.rawg.io/api/games";

let genreIncluded = {
  model: Genre,
  attributes: ["name"],
  through: {
    attributes: [],
  },
};

const listVideoGames = async (name) => {
  try {
    const api = await fetch(link + `?key=${API_KEY}`).then((data) =>
      data.json()
    );

    const apiResult = api.results.map((data) => {
      return {
        id: data.id,
        name: data.name,
        genres: data.genres.map((genero) => genero.name),
        img: data.background_image,
      };
    });
    const games = await Videogame.findAll();

    return [...games, ...apiResult];
  } catch (error) {
    throw new Error("No se encontro un video juego");
  }
};

const addVideoGames = async (body) => {
  try {
    const { name, description, release_date, rating, platforms } = body;

    if (!name || !description || !platforms) {
      throw new Error("No se agrego un video juego, faltan parametros");
    }

    const newGame = await Videogame.create(body);
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
          img: api.background_image,
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

module.exports = { listVideoGames, addVideoGames, detailVideoGame };
