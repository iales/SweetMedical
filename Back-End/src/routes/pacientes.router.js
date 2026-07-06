const express = require('express');
const {verificarToken} = require('../middlewares/verificarToken');
const {verificarPaciente} = require('../middlewares/verificarPaciente');
const TurnosController = require('../controllers/turnos.controller');
const PacientesController = require('../controllers/pacientes.controller');
const {TurnoDoesntExistError, DisponibilidadNotAvailableError} = require('../errors/turnos.errors');

const pacientesController = PacientesController.instance();

const router = express.Router();
const urlBase = '/pacientes/:id'


router.route('/pacientes')
    .post((req, res, next) => pacientesController.createPaciente(req, res, next))
    .get((req, res, next) => pacientesController.findPacientes(res, next));

router.route(urlBase)
    .get(verificarToken, (req, res, next) => pacientesController.findById(req, res, next));


module.exports = router;