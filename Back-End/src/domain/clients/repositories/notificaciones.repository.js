const NotificacionModel = require('../../../schemas/notificacionSchema');
const Notificacion = require('../../entities/notificacion');
const { ObjectDoesntExistError } = require('../../../errors/app.errors');

class NotificacionesRepository {

    constructor(){
        this.model = NotificacionModel;
    }

    static instance() {
        if (!NotificacionesRepository._instance) {
            NotificacionesRepository._instance = new NotificacionesRepository();
        }
        return NotificacionesRepository._instance;
    }

    async findByUsuarioId(usuarioId) {
        return await this.model.find({ usuarioId: usuarioId });
    }

    async findByUsuarioIdAndLeida(usuarioId, bool) {
        return await this.model.find({ usuarioId: usuarioId, 
            leida: bool});
    }

    async findById(notificacionId) {
        return await this.model.findById(notificacionId);
    }

    async updateNotificacion(notificacion){
            return await this.model.findByIdAndUpdate(notificacion.id,
            { leida: notificacion.leida},
            { new: true });
    }

    async save(notificacion) {
        const nuevaNotificacion = new this.model(notificacion);
        return await nuevaNotificacion.save();
    }
}

module.exports = NotificacionesRepository;