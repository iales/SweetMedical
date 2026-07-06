const mongoose = require ('mongoose');
const Especialidad = require('../domain/entities/especialidad');

const especialidadSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required:true,
        trim:true
    },
    descripcion:{
        type: String,
        requiered:true,
        trim:true
    }},
    {
        timestamps:true,
        collection: 'especialidades',
        versionKey: false
    });

especialidadSchema.loadClass(Especialidad);

const EspecialidadModel = mongoose.model('Especialidad', especialidadSchema);
module.exports = EspecialidadModel;



