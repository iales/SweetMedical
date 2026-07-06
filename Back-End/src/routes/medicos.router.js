const express = require('express');
const MedicosController = require('../controllers/medicos.controller');
const {verificarToken} = require('../middlewares/verificarToken');
const {verificarMedico} = require('../middlewares/verificarMedico');

const medicosController = MedicosController.instance();

const router = express.Router();
const urlBase = '/medicos/:id'

// Medicos
router.route('/medicos')
    .get((req, res, next) => medicosController.findMedicos(res, next))
    .post((req, res, next) => medicosController.createMedico(req, res, next));

router.route(urlBase)
    .get(verificarToken, (req, res, next) => medicosController.findById(req, res, next));  

    
// Disponibilidades
router.route(urlBase + '/disponibilidades')
    .get((req, res, next) => medicosController.findDisponibilidadesByMedico(req, res, next))
    .post((req, res, next) => medicosController.createDisponibilidad(req, res, next));
    
router.route(urlBase + '/disponibilidad/:disponibilidadHorariaID')
    .delete(verificarToken,(req, res, next) => medicosController.deleteDisponibilidadByID(req, res, next));


// Prácticas
router.route(urlBase + '/practicas')
    .get(verificarToken, (req, res, next) => medicosController.findPracticasByMedico(req, res, next));
    
router.route(urlBase + '/practicas/:practicaId')
    .post((req, res, next) => medicosController.addPractica(req, res, next))
    .delete(verificarToken, (req, res, next) => medicosController.removePracticaById(req, res, next));

router.route('/medicos/practicas/:practicaId')
    .get(verificarToken, (req, res, next) => medicosController.findMedicosByPracticaId(req, res, next))

 
// Especialidades
router.route(urlBase + '/especialidades')
    .get((req, res, next) => medicosController.findEspecialidadesByMedico(req, res, next));

module.exports = router;

