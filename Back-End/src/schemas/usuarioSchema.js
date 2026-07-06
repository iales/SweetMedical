const mongoose = require ('mongoose');
const Usuario = require('../domain/entities/usuario');

const usuarioSchema = new mongoose.Schema({

    email:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        trim:true
    }},
    {
        timestamps:true,
        collection: 'usuarios',
        versionKey: false
    });

usuarioSchema.loadClass(Usuario);

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);
module.exports = UsuarioModel;

