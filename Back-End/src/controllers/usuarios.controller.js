const { Usuario } = require('../domain/entities');
const UsuariosService = require('../services/usuarios.service');

class UsuariosController {

    constructor(){
        this.usuariosService = UsuariosService.instance();
    }

    static instance() {
        if (!UsuariosController._instance) {
        UsuariosController._instance = new UsuariosController();
        }
        return UsuariosController._instance;
    }



    async createUsuario(req, res, next){
        try{
            const usuario = await this.usuariosService.createUsuario(req.body);
            return res.status(201).json(usuario);
        }catch(error){
            next(error);
        } 
    }

    async login(req, res, next){
        try{
            const { email, password } = req.body;
            const resultado = await this.usuariosService.login(email, password);
            return res.status(200).json(resultado);
        }catch(error){
            next(error);
        }
    }

    async findUsuarioById(req,res,next){
        try{
            const resultado = await this.usuariosService.findById(req.params.id);
            return res.status(200).json(resultado);
        }catch(error){
            return next(error);
        }
    }

}

module.exports = UsuariosController;