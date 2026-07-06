const mongoose = require('mongoose');
const Notificacion = require('../domain/entities/notificacion');

const notificacionSchema = new mongoose.Schema(
    {
        usuarioId: { type: mongoose.Schema.Types.ObjectId, required: true },
        mensaje:   { type: String, required: true },
        leida:     { type: Boolean, default: false },
        fecha:     { type: Date, default: Date.now }
    },
    {   timestamps:true,
        collection: 'notificaciones',
        versionKey: false }
);

notificacionSchema.loadClass(Notificacion);
const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);

module.exports = NotificacionModel;