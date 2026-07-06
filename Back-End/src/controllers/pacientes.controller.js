const { Paciente } = require('../domain/entities');
const PacientesService = require('../services/pacientes.service');

class PacientesController {

    constructor(){
        this.pacientesService = PacientesService.instance();
    }

    static instance() {
        if (!PacientesController._instance) {
        PacientesController._instance = new PacientesController();
        }
        return PacientesController._instance;
    }


    async findPacientes(res, next){
        try{
            const pacientes = await this.pacientesService.findPacientes();
            return res.status(200).json(pacientes);
        }catch(error){
            next(error);
        }
    }

    async findById(req, res, next){
        try{
            const pacienteId = req.params.id;
            const paciente = await this.pacientesService.findById(pacienteId);
            return res.status(200).json(paciente);
        }catch(error){
            next(error);
        }
    }


    async createPaciente(req, res, next){
        try{
            const paciente = await this.pacientesService.createPaciente(req.body);
            return res.status(201).json(paciente);
        }catch(error){
            next(error);
        }
    }

    async deletePaciente(req, res, next){
       try{
            await this.pacientesService.deletePaciente(req.params.id);
            return res.status(204).send();
       }catch(error){
            next(error);
        }
    }
}

module.exports = PacientesController;