const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require("./games");
const genresRouter = require("./genres");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", gamesRouter);
router.use("/genres", genresRouter);

module.exports = router;
