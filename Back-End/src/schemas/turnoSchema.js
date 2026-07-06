const mongoose = require ('mongoose');
const Turno = require('../domain/entities/turno');

const trazabilidadEstadoTurnoSchema = new mongoose.Schema({
  fechaHoraIngreso: { type: Date, required: true },
  estado: { type: String, required: true },
  motivo: { type: String, default: null }
}, { _id: false }); 


const turnoSchema = new mongoose.Schema({

    medicoId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medico', 
        required: true 
    },
    pacienteId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    }, 
    fechaHora:{
        type: Date,
        required: true,
        trim:true
    },
    sedeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sede',
        required: true
    }, 
    practicaId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practica',
        required: true
    }, 
    nombrePractica:{
        type: String,
        required: true,
        trim:true
    },
    duracionEnMins:{
        type: Number,
        required: true,
        trim:true
    },
    estado:{
        type: String,
        required: true,
        trim:true
    },
    historialEstados:{
        type: [trazabilidadEstadoTurnoSchema], 
        default: []
    },
    costo: {
        type: Number,
        required: true
    },
    }, {
        timestamps:true,
        collection: 'turnos',
        versionKey: false
    });

turnoSchema.loadClass(Turno);

const TurnoModel = mongoose.model('Turno', turnoSchema);
module.exports = TurnoModel;



