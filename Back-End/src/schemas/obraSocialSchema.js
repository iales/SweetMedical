const mongoose = require ('mongoose');
const ObraSocial = require('../domain/entities/obraSocial');

const obraSocialSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required:true,
        trim:true
    },
    planes: [
            {
            planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
            nombrePlan: { type: String, required: true }
            }
    ],},
    {
        timestamps:true,
        collection: 'obrasSociales',
        versionKey: false
    });

obraSocialSchema.loadClass(ObraSocial);

const ObraSocialModel = mongoose.model('ObraSocial', obraSocialSchema);
module.exports = ObraSocialModel;


