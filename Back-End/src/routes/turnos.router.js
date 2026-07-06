const express = require('express');
const TurnosController = require('../controllers/turnos.controller');
const {TurnoDoesntExistError, DisponibilidadNotAvailableError} = require('../errors/turnos.errors');
const {verificarToken} = require('../middlewares/verificarToken');
const {verificarPaciente} = require('../middlewares/verificarPaciente');
const {verificarMedico} = require('../middlewares/verificarMedico');

const turnosController = TurnosController.instance();

const router = express.Router();

// Rutas para gestionar las disponibilidades de los médicos
router.route('/turnos')
    .get((req, res, next) => turnosController.findTurnos(res, next))
    .post(verificarToken, verificarPaciente, (req, res, next) => turnosController.createTurno(req, res, next));

router.route('/turnos/pacientes')
    .get(verificarToken, verificarPaciente, (req, res, next) => turnosController.findTurnosByPacienteRequirements(req, res, next));  

router.route('/turnos/mis-turnos')
    .get(verificarToken, (req, res, next) => turnosController.findMisTurnos(req, res, next));

router.route('/turnos/:id/disponibles')
    .get(verificarToken, verificarMedico, (req, res, next) => turnosController.findHorariosDisponiblesParaModificar(req, res, next));
router.route('/turnos/:id')
    .get(verificarToken, (req, res, next) => turnosController.findById(req, res, next))
    .put(verificarToken, verificarMedico, (req, res, next) => turnosController.updateTurno(req, res, next))
    .patch(verificarToken, verificarPaciente, (req, res, next) => turnosController.confirmarTurno(req, res, next))
    .delete(verificarToken, (req, res, next) => turnosController.deleteTurno(req, res, next)); 
 
router.route('/turnos/pacientes/:id')
    .get((req,res,next) => turnosController.findTurnosByPacienteId(req,res,next));

router.route('/turnos/medicos/:id')
    .get((req,res,next) => turnosController.findTurnosActivosByMedicoId(req,res,next));

module.exports = router;

