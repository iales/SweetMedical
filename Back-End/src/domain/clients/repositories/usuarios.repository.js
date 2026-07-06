const mongoose = require('mongoose');
const UsuarioModel = require('../../../schemas/usuarioSchema');
const {Usuario} = require('../../entities')
const {ObjectDoesntExistError} = require('../../../errors/app.errors');
const {EmailDuplicadoError} = require('../../../errors/usuarios.errors')

class UsuariosRepository{
    constructor() {
        this.model = UsuarioModel;
    }

    static instance() {
        if (!UsuariosRepository._instance) {
        UsuariosRepository._instance = new UsuariosRepository();
        }
        return UsuariosRepository._instance;
    }

  
    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        
        return await this.model.findById(id);
    }

    async findByEmail(email){
        return await this.model.findOne({email: email})
    }

    async saveUsuario(usuario) {
        this.validateUsuario(usuario);
        const nuevoUsuario = new this.model(usuario);

          try {
            return await nuevoUsuario.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new EmailDuplicadoError(); 
            }
            throw error;
        }
      
    }

   

    validateUsuario(usuario) {
        if (!(usuario instanceof Usuario)) {
            throw new Error('El usuario es invalido');
        }
    }



}

module.exports = UsuariosRepository;