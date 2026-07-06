const mongoose = require ('mongoose');
const Medico = require('../domain/entities/medico');
const { DiaSemana } = require('../domain/entities');
const diasValidos = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

const medicoSchema = new mongoose.Schema({

    usuarioId:{
        type: String,
        required:true,
        trim:true
    },
    nombre:{
        type: String,
        required:true,
        trim:true
    }, 
    matricula:{
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    dni:{
        type: String,
        required:true,
        trim:true
    }, 
    sedes: [
        {
        sedeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true },
        nombreSede: { type: String, required: true }
        }
    ],
    practicas: [
    {
        practicaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Practica', required: true },
        nombrePractica: { type: String, required: true },
        especialidadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad' }, 
        nombreEspecialidad: { type: String }
    }
  ],
    disponibilidades: [
    {
        diaSemana: { 
            type: String,
            enum: diasValidos, 
            required: true 
            },
        horaDesde: { type: String, required: true },
        horaHasta: { type: String, required: true }
    }
    ]},
    {
        timestamps:true,
        collection: 'medicos',
        versionKey: false
    });

medicoSchema.loadClass(Medico);

const MedicoModel = mongoose.model('Medico', medicoSchema);
module.exports = MedicoModel;



