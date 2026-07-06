const mongoose = require ('mongoose');
const Paciente = require('../domain/entities/paciente');

const pacienteSchema = new mongoose.Schema({

    usuarioId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    dni:{
        type: String,
        required:true,
        trim:true
    }, 
    nombre:{
        type: String,
        required:true,
        trim:true
    }, 
    obraSocialId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ObraSocial",
        required: true,
    },
    planId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
    }},
    {
        timestamps:true,
        collection: 'pacientes',
        versionKey: false
    });

pacienteSchema.loadClass(Paciente);

const PacienteModel = mongoose.model('Paciente', pacienteSchema);
module.exports = PacienteModel;



