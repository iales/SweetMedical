const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosRepository = require('../domain/clients/repositories/usuarios.repository');
const {Usuario} = require('../domain/entities');
const {ObjectDoesntExistError, NotFoundError } = require('../errors/app.errors');
const PacientesService = require('./pacientes.service')
const MedicosService = require('./medicos.service')
const {CredencialesInvalidasError} = require('../errors/usuarios.errors')

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET

class UsuariosService{
    constructor(){
        this.usuariosRepository = UsuariosRepository.instance();
        this.medicosService = MedicosService.instance();
        this.pacientesService = PacientesService.instance();

    }
    static instance() {
    if (!UsuariosService._instance) {
      UsuariosService._instance = new UsuariosService();
    }
    return UsuariosService._instance;
    }

    
    toDTO(usuario){
        return{
            id: usuario.id || usuario._id,
            email: usuario.email
        }
    }

    generarToken(usuarioConRol, rol) {
        const payload = {
            id: usuarioConRol.id,                 // Esto representa el pacienteId o el medicoId
            rol
        };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
    }



    async createUsuario(usuarioData){
        try {
            const {nombre, email, dni, password, rol } = usuarioData;
            const passwordHasheado = await bcrypt.hash(password, SALT_ROUNDS);
            
            const usuario = new Usuario(email, passwordHasheado);

            const usuarioGuardado = await this.usuariosRepository.saveUsuario(usuario);

            let usuarioConRol;

    
            if (rol === 'paciente'){

                const pacienteData = {
                    usuarioId: usuarioGuardado.id,
                    dni: dni,
                    nombre:nombre,
                    obraSocialId: usuarioData.obraSocialId, 
                    planId: usuarioData.planId,

                }
                usuarioConRol = await this.pacientesService.createPaciente(pacienteData);

            }else{

                 const medicoData = {
                    usuarioId: usuarioGuardado.id,
                    dni: dni,
                    nombre:nombre,
                    matricula: usuarioData.matricula, 
                    sedes: usuarioData.sedes,
                }
                usuarioConRol = await this.medicosService.createMedico(medicoData);
            }

            const token = this.generarToken(usuarioConRol, rol);
            const dto = this.toDTO(usuarioGuardado);

            return { usuario: dto, token }
       }catch(error){
            throw new ObjectDoesntExistError();
     }
    }

    async login(email, password){
        const usuario = await this.usuariosRepository.findByEmail(email);
        if (!usuario) {
            throw new CredencialesInvalidasError();
        }
        
        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            throw new CredencialesInvalidasError();
        }

        let entidad;
        let rol;

        entidad = await this.pacientesService.findByUsuarioId(usuario.id);

        if (entidad) {
            rol = 'paciente';
        } else {
            entidad = await this.medicosService.findByUsuarioId(usuario.id);
            rol = 'medico';
        }

        const token = this.generarToken(entidad, rol);

        return {rol, token};               // Aclaracion: podriamos devolver mas cosas, como el nombre del usuario. Por ahora lo dejo con lo minimo indispensable

    }



    async findById(id){
        const usuario = await this.usuariosRepository.findById(id);
        if (!usuario){
            throw new ObjectDoesntExistError();
        }
        return this.toDTO(usuario);
    }
}

module.exports = UsuariosService;