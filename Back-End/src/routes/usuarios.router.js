const express = require('express');
const UsuariosController = require('../controllers/usuarios.controller');

const usuariosController = UsuariosController.instance();

const router = express.Router();

router.route('/register')
    .post((req, res, next) => usuariosController.createUsuario(req, res, next));


router.route('/login')
    .post((req, res, next) => usuariosController.login(req, res, next));

router.route('/login/:id') 
    .get((req,res,next) => usuariosController.findUsuarioById(req,res,next)); 


module.exports = router;

