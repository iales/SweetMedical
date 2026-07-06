const mongoose = require ('mongoose');
const Practica = require('../domain/entities/practica');

const practicaSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required:true,
        trim:true
    },
    duracionTurnoEnMins:{
        type: String,
        requiered:true,
        trim:true
    }, 
    especialidadId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especialidad',
        required: true
    },
    nombreEspecialidad:{
        type: String,
        required: true,   
        trim: true
    },
    costo:{
        type: Number,
        requiered:true
     }},
    {
        timestamps:true,
        collection: 'practicas',
        versionKey: false
    });

practicaSchema.loadClass(Practica);

const PracticaModel = mongoose.model('Practica', practicaSchema);
module.exports = PracticaModel;



