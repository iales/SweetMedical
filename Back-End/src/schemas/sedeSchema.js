const mongoose = require ('mongoose');
const Sede = require('../domain/entities/sede');

const sedeSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required:true,
        trim:true
    },
    direccion:{
        type: String,
        requiered:true,
        trim:true
    }},
    {
        timestamps:true,
        collection: 'sedes',
        versionKey: false
    });

sedeSchema.loadClass(Sede);

const SedeModel = mongoose.model('Sede', sedeSchema);
module.exports = SedeModel;



