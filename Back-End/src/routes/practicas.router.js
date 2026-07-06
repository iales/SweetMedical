const express = require('express');
const PracticasController = require('../controllers/practicas.controller');
const {verificarToken} = require('../middlewares/verificarToken');

const practicasController = PracticasController.instance();

const router = express.Router();

router.route('/practicas')
    .get(verificarToken, (req, res, next) => practicasController.findPracticas(res, next))
    .post((req, res, next) => practicasController.createPractica(req, res, next));

router.route('/practicas/:id')
    .get(verificarToken, (req, res, next) => practicasController.findById(req, res, next))
    .delete((req, res, next) => practicasController.deletePractica(req, res, next));

router.route('/practicas/:id/coberturas')
    .post((req, res, next) => practicasController.createCobertura(req, res, next))



module.exports = router;

