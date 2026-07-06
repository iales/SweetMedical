const mongoose = require ('mongoose');
const Plan = require('../domain/entities/plan');

const planSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required:true,
        trim:true
    },
    coberturasPractica: [
            {
            coberturaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cobertura', required: true },
            practicaId: { type: String, required: true },
            nivelCobertura: { type: String, required: true },
            }
    ]},
    {
        timestamps:true,
        collection: 'planes',
        versionKey: false
    });

planSchema.loadClass(Plan);

const PlanModel = mongoose.model('Plan', planSchema);
module.exports = PlanModel;
