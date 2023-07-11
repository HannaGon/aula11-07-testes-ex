const express = require("express");
const router = express.Router();

const filmesController = require("../controllers/filmesControllers")


//rotas comuns
router.get("/mostratodos", filmesController.exibeTodos)
router.post("/novofilme", filmesController.cadastraFilme)
router.patch("/editafilme/:id", filmesController.atualizaFilme)
router.delete("/deletafilme/:id", filmesController.deletaFilme)

module.exports = router;