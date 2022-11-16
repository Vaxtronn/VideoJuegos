const { Router } = require("express");
const { Op } = require("sequelize");
const { API_KEY, Videogame, Genre } = require("../db");
const fetch = require("node-fetch");


const getVideoGames = async (search) => {
  try {
    if (search) {
      search = search.toLowerCase();

      // Organizado valores de la BD
      let game = await Videogame.findAll({
        where: {
          name: { [Op.substring]: search },
        },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      
      game = game.map((data) => {
        return {
          id: data.dataValues.id,
          name: data.dataValues.name,
          genres: data.dataValues.genres.map((genero) => genero.name),
          description: data.dataValues.description,
          release_date: data.dataValues.release_date,
          rating: data.dataValues.rating,
          platforms: data.dataValues.platforms.map((plataforma) => plataforma),
        };
      });
      
      // Buscar y editar info de la api
      
      let apiGames = await fetch(
        `https://api.rawg.io/api/games?search=${search}&key=${API_KEY}&page_size=15`
      ).then((data) => data.json());

      apiGames = apiGames.results
        .map((data) => {
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
        })
        .filter((game) =>
          game.name.toLowerCase().includes(search.toLowerCase())
        );

      // Crea generos en BD
      let apiGenres = apiGames
        .map((gen) => gen.genres)
        .flat()
        .reduce((ac, a) => {
          if (ac.includes(a)) return ac;
          else {
            ac.push(a);
            return ac;
          }
        }, []);

      let promise = apiGenres.map((genre) => {
        Genre.findOrCreate({
          where: {
            name: genre,
          },
          default: { name: genre },
        }).then(([user, created]) => user);
      });

      await Promise.all(promise);

      //Uniendo las dos busquedas en una sola
      const allGames = [...game, ...apiGames];

      if (allGames.length === 0) throw new Error(`${name} didn't found`);

      return allGames;
    } else {
      // Buscar y editar info de la api

      let apiGames = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=15`
      ).then((data) => data.json());

      apiGames = apiGames.results.map((data) => {
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

      // Crea generos en BD

      let apiGenres = apiGames
        .map((gen) => gen.genres)
        .flat()
        .reduce((ac, a) => {
          if (ac.includes(a)) return ac;
          else {
            ac.push(a);
            return ac;
          }
        }, []);
      let promise = apiGenres.map((genre) => {
        Genre.findOrCreate({
          where: {
            name: genre,
          },
          default: { name: genre },
        }).then(([user, created]) => user);
      });
      await Promise.all(promise);

      let games = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      games = games.map((game) => {
        return {
          id: game.dataValues.id,
          name: game.dataValues.name,
          genres: game.dataValues.genres.map((genero) => genero.name),
          description: game.dataValues.description,
          release_date: game.dataValues.release_date,
          rating: game.dataValues.rating,
          platforms: game.dataValues.platforms,
        };
      });

      // Uniendo los valores
      const allGames = [...games, ...apiGames];
      return allGames;
    }
  } catch (error) {
    throw error;
  }
};

const addVideoGames = async (body) => {
  const { name, description, release_date, rating, platforms, genres } = body;
  // console.log(body);
  if (!name || !description || !platforms) {
    throw new Error("No se agrego un video juego, faltan parametros");
  }
  try {
    let newGame = await Videogame.findOrCreate({
      where: {
        name,
        description,
        release_date,
        rating,
        platforms,
      },
    }).then(([newGame, created]) => newGame);
    let promise = genres.map( (name) => 
      Genre.findOrCreate({
        where: {name: name},
      }).then(([genre, created]) => genre));
    let result = await Promise.all(promise);
    await newGame.addGenres(result);
    return newGame;
  } catch (error) {
    throw error;
  }
};

const listGenres = async () => {
  try {
    const api = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`).then((data) =>
      data.json()
    );
    let apiResult = api.results.map((data) => {
      return {
        id: data.id,
        name: data.name,
      };
    });
    let promise = apiResult.map( (data) => 
      Genre.findOrCreate({
        where: {name: data.name},
        defaults: {
          name: data.name
        }
      }).then(([genre, created]) => genre)
    );
    const result = await Promise.all(promise);
    return [...result];
  } catch (error) {
    throw new Error("No se encontraron los genereos solicitados");
  }
};

const detailVideoGame = async (id) => {
  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  const api = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`).then((data) =>
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
      const game = await Videogame.findOne({
        where: {id: id},
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      });
      console.log(game);
      if(game) {
        return {
          id: game.dataValues.id,
          name: game.dataValues.name,
          genres: game.dataValues.genres.map((genero) => genero.name),
          description: game.dataValues.description,
          release_date: game.dataValues.release_date,
          rating: game.dataValues.rating,
          platforms: game.dataValues.platforms,
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getVideoGames, listGenres, addVideoGames, detailVideoGame };
