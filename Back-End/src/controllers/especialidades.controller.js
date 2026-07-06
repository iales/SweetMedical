const { Especialidad } = require('../domain/entities');
const EspecialidadesService = require('../services/especialidades.service');

class EspecialidadesController {

    constructor(){
        this.especialidadesService = EspecialidadesService.instance();
    }

    static instance() {
        if (!EspecialidadesController._instance) {
        EspecialidadesController._instance = new EspecialidadesController();
        }
        return EspecialidadesController._instance;
    }


    async findEspecialidades(res, next){
        try{
            const sedes = await this.especialidadesService.findEspecialidades();
            return res.status(200).json(sedes);
        }catch(error){
            next(error);
        }
    }

    async findById(req, res, next){
        try{
            const sede = await this.especialidadesService.findById(req.params.id);
            return res.status(200).json(sede);
        }catch(error){
            next(error);
        }
    }


    async createEspecialidad(req, res, next){
        try{
            const sede = await this.especialidadesService.createEspecialidad(req.body);
            return res.status(201).json(sede);
        }catch(error){
            next(error);
        }
    }

    async deleteEspecialidad(req, res, next){
       try{
            await this.especialidadesService.deleteEspecialidad(req.params.id);
            return res.status(204).send();
       }catch(error){
            next(error);
        }
    }
}

module.exports = EspecialidadesController;