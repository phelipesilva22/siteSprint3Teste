var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de dashboardController.js
router.post("/cadastrarInfoFabrica", function (req, res) {
    dashboardController.cadastrarInfoFabrica(req, res);
})

router.post("/cadastrarInfoEndereco", function (req, res) {
    dashboardController.cadastrarInfoEndereco(req, res);
})

router.get("/calcularMediaDia", function (req, res) {
    dashboardController.calcularMediaDia(req, res);
})

router.get("/calcularMediaSemana", function (req, res) {
    dashboardController.calcularMediaDia(req, res);
})

router.get("/captarCOV", function (req, res) {
    dashboardController.captarCOV(req, res);
})

module.exports = router;