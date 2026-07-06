const NotificacionesService = require('../services/notificaciones.service');

class NotificacionesController {

    constructor() {
        this.notificacionesService = NotificacionesService.instance();
    }

    obtenerFiltroLeida(req) {
        const leida = req.query.leida;

        if (leida === 'true') {
            return true;
        }

        if (leida === 'false') {
            return false;
        }

        return undefined;
    }

    async findMisNotificaciones(req, res, next) {
        try {
            const filtroLeida = this.obtenerFiltroLeida(req);
            const notificaciones = await this.notificacionesService.findMisNotificaciones(req.user, filtroLeida);
            return res.status(200).json(notificaciones);
        } catch (error) {
            return next(error);
        }
    }

    async findNotificaciones(req, res, next) {
        try {
            const usuarioId = req.params.usuarioId;
            const filtroLeida = this.obtenerFiltroLeida(req);

            const notificaciones = await this.notificacionesService.findNotificaciones(usuarioId,filtroLeida);
            return res.status(200).json(notificaciones);
        } catch (error) {
            return next(error);
        }
    }

    
    async marcarComoLeida(req, res, next) {
        try {
            await this.notificacionesService.marcarComoLeida(req.params.notificacionId, req.user);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }

    async createNotificacion(req, res, next){
        try{
            const notificacion = await this.notificacionesService.createNotificacion(req.params.usuarioId, req.body);
            return res.status(201).json(notificacion);
        }catch(error){
            return next(error);
        }
    }
}

module.exports = NotificacionesController;