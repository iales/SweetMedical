const { Sede } = require('../domain/entities');
const SedesService = require('../services/sedes.service');

class SedesController {

    constructor(){
        this.sedesService = SedesService.instance();
    }

    static instance() {
        if (!SedesController._instance) {
        SedesController._instance = new SedesController();
        }
        return SedesController._instance;
    }


    async findSedes(res, next){
        try{
            const sedes = await this.sedesService.findSedes();
            return res.status(200).json(sedes);
        }catch(error){
            next(error);
        }
    }

    async findById(req, res, next){
        try{
            const sede = await this.sedesService.findById(req.params.id);
            return res.status(200).json(sede);
        }catch(error){
            next(error);
        }
    }


    async createSede(req, res, next){
        try{
            const sede = await this.sedesService.createSede(req.body);
            return res.status(201).json(sede);
        }catch(error){
            next(error);
        }
    }

    async deleteSede(req, res, next){
       try{
            await this.sedesService.deleteSede(req.params.id);
            return res.status(204).send();
       }catch(error){
            next(error);
        }
    }
}

module.exports = SedesController;