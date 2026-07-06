const express = require('express');
const SedesController = require('../controllers/sedes.controller');
const { verificarToken } = require('../middlewares/verificarToken');

const sedesController = SedesController.instance();

const router = express.Router();

router.route('/sedes')
    .get((req, res, next) => sedesController.findSedes(res, next))
    .post((req, res, next) => sedesController.createSede(req, res, next));

router.route('/sedes/:id')
    .get(verificarToken, (req, res, next) => sedesController.findById(req, res, next))
    .delete((req, res, next) => sedesController.deleteSede(req, res, next));



module.exports = router;

