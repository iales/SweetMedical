const NivelCobertura = require('../../entities/nivelCobertura');
const {Paciente, Usuario, Plan, CoberturaPractica} = require('../../entities');
const PacienteModel = require('../../../schemas/pacienteSchema');
const mongoose = require('mongoose');


class PacientesRepository{
    constructor(){
        this.model = PacienteModel;
    }

    static instance() {
    if (!PacientesRepository._instance) {
      PacientesRepository._instance = new PacientesRepository();
    }
    return PacientesRepository._instance;

    }


    async savePaciente(paciente){
        const nuevoPaciente = this.model(paciente);
        return await nuevoPaciente.save();
    }

    async findById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
                        
        return await this.model.findById(id);
    }

     async findByUsuarioId(usuarioId){                
        return await this.model.findOne({usuarioId: usuarioId});
    }

    async findPacientes(){
        return await this.model.find();
    }

    //Agregar Paginacion en findPacientes para poder obtener todos los pacientes



}

module.exports = PacientesRepository;