const express = require('express');
const EspecialidadesController = require('../controllers/especialidades.controller');

const especialidadesController = EspecialidadesController.instance();

const router = express.Router();

router.route('/especialidades')
    .get((req, res, next) => especialidadesController.findEspecialidades(res, next))
    .post((req, res, next) => especialidadesController.createEspecialidad(req, res, next));

router.route('/especialidades/:id')
    .get((req, res, next) => especialidadesController.findById(req, res, next))
    .delete((req, res, next) => especialidadesController.deleteEspecialidad(req, res, next));



module.exports = router;

