const MedicosService = require('../services/medicos.service');
const { MedicoDoesntExistError, DisponibilidadDoesntExistError } = require('../errors/medicos.errors');

class MedicosController {

    constructor(){
        this.medicosService = MedicosService.instance();
    }

    static instance() {
        if (!MedicosController._instance) {
        MedicosController._instance = new MedicosController();
        }
        return MedicosController._instance;
    }

    async createMedico(req, res, next){
        try{
            const medico = await this.medicosService.createMedico(req.body);
            return res.status(201).json(medico);
        }catch(error){
            return next(error);
        }
    }

    async findMedicos(res, next){
         try{
            const medicos = await this.medicosService.findMedicos();
            return res.status(200).json(medicos);
        }catch (error) {
            return next(error);
        }
    }

    async findById(req, res, next){
         try{
            const medicoId = req.params.id;
            const medico = await this.medicosService.findById(medicoId);
            return res.status(200).json(medico);
        }catch (error) {
            return next(error);
        }
    }
   
    // Disponibilidades
    async findDisponibilidadesByMedico(req, res, next) {
        try {
            const disponibilidades = await this.medicosService.findDisponibilidadesByMedico(req.params.id);
            return res.status(200).json(disponibilidades);
        } catch (error) {
            return next(error);
        }
    }

    async createDisponibilidad(req, res, next) {
        try {
            const disponibilidad = await this.medicosService.createDisponibilidad(req.params.id, req.body);
            return res.status(201).json(disponibilidad);
        } catch (error) {
            return next(error);
        }
    }

    async deleteDisponibilidadByID(req, res, next) {
        try {
            await this.medicosService.deleteDisponibilidadByID(req.params.id, req.params.disponibilidadHorariaID);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }


    // Practicas
    async findPracticasByMedico(req, res, next) {
        try {
            const practicas = await this.medicosService.findPracticasByMedico(req.params.id);
            return res.status(200).json(practicas);
        } catch (error) {
            return next(error);
        }
    }

    async addPractica(req, res, next) {
        try {
            const medico = await this.medicosService.addPractica(req.params.id, req.params.practicaId);
            return res.status(201).json(medico);
        } catch (error) {
            return next(error);
        }
    }

    async removePracticaById(req, res, next) {
        try {
            await this.medicosService.removePracticaById(req.params.id, req.params.practicaId);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }

     async findMedicosByPracticaId(req, res, next) {
        try {
            const medicos = await this.medicosService.findMedicosByPracticaId(req.params.practicaId);
            return res.status(200).json(medicos);
        } catch (error) {
            return next(error);
        }
    }

    // Especialidades
    async findEspecialidadesByMedico(req, res, next) {
        try {
            const especialidades = await this.medicosService.findEspecialidadesByMedico(req.params.id);
            return res.status(200).json(especialidades);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = MedicosController;