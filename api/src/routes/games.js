const { Router } = require("express");
const { Videogame } = require("../db");
const {
  getVideoGames,
  addVideoGames,
  detailVideoGame,
} = require("../controllers/controller");
const router = Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  try {
    const listVideoGame = await getVideoGames(search);
    res.status(200).send(listVideoGame);
  } catch (error) {
    res.status(404).send(error.message || error);
  }
});

router.post("/", async (req, res) => {
  // const { name, description, release_date, rating, platforms } = req.body;
  try {
    const newVideoGame = await addVideoGames(req.body);
    res.status(200).send(newVideoGame);
  } catch (error) {
    res.status(404).send(error.message || error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await detailVideoGame(id);
    res.status(200).json(detail);
  } catch (error) {
    res.status(404).send(error.message || error);
  }
});

module.exports = router;
