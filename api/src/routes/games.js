const { Router } = require("express");
const { Videogame } = require("../db");
const {
  listVideoGames,
  addVideoGames,
  detailVideoGame,
} = require("../controllers/controller");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    const listVideoGame = await listVideoGames(name);
    res.status(200).send(listVideoGame);
  } catch (error) {
    res.status(404).send(error.message || error);
  }
});

router.post("/", async (req, res) => {
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
