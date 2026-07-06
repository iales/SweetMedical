const express = require('express');
const ObrasSocialesController = require('../controllers/obrasSociales.controller');

const obrasSocialesController = ObrasSocialesController.instance();

const router = express.Router();

// Obras sociales
router.route('/obrasSociales')
    .get((req, res, next) => obrasSocialesController.findObrasSociales(res, next))
    .post((req, res, next) => obrasSocialesController.createObraSocial(req, res, next));

router.route('/obrasSociales/:id')
    .get((req, res, next) => obrasSocialesController.findById(req, res, next))


// Planes
router.route('/planes')
    .get((req, res, next) => obrasSocialesController.findPlanes(req, res, next))
    .post((req, res, next) => obrasSocialesController.createPlan(req, res, next));

router.route('/obrasSociales/:id/planes/:planId')
    .post((req, res, next) => obrasSocialesController.addPlan(req, res, next))
    .delete((req, res, next) => obrasSocialesController.removePlanById(req, res, next));

router.route('/planes/:id/coberturas/:coberturaId')
    .post((req, res, next) => obrasSocialesController.addCobertura(req, res, next))
    .delete((req, res, next) => obrasSocialesController.removeCoberturaById(req, res, next));

//Agregar endpoint para crear cobertura 


module.exports = router;

