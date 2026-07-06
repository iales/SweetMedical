const mongoose = require ('mongoose');
const CoberturaPractica = require('../domain/entities/coberturaPractica');

const coberturaSchema = new mongoose.Schema({

    practicaId:{
        type: String,
        required:true,
        trim:true
    },
    nivelCobertura:{
        type: String,
        requiered:true,
        trim:true
    }},
    {
        timestamps:true,
        collection: 'nivelesCobertura',
        versionKey: false
    });

coberturaSchema.loadClass(CoberturaPractica);

const CoberturaModel = mongoose.model('Cobertura', coberturaSchema);
module.exports = CoberturaModel;



