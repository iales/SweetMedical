const express = require('express');
const NotificacionesController = require('../controllers/notificaciones.controller');
const {verificarToken} = require('../middlewares/verificarToken');

const router = express.Router();
const notificacionesController = new NotificacionesController();

const urlBase = '/notificaciones';

router.route(urlBase)
    .get(verificarToken, (req, res, next) => notificacionesController.findMisNotificaciones(req, res, next));

router.route(urlBase + '/:usuarioId')
    .get((req, res, next) => notificacionesController.findNotificaciones(req, res, next))
    .post((req, res, next) => notificacionesController.createNotificacion(req, res, next));

router.route(urlBase + '/:notificacionId/leida')
    .patch(verificarToken, (req, res, next) => notificacionesController.marcarComoLeida(req, res, next));


module.exports = router;