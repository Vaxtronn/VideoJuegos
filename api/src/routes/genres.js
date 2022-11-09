const { Router } = require("express");
const { Genre } = require("../db");
const { listGenres } = require("../controllers/controller");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const listGenre = await listGenres();
    res.status(200).send(listGenre);
  } catch (error) {
    res.status(404).send(error.message || error);
  }
});

module.exports = router;
