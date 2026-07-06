const { Practica } = require('../domain/entities');
const PracticasService = require('../services/practicas.service');

class PracticasController {

    constructor(){
        this.practicasService = PracticasService.instance();
    }

    static instance() {
        if (!PracticasController._instance) {
        PracticasController._instance = new PracticasController();
        }
        return PracticasController._instance;
    }


    async findPracticas(res, next){
        try{
            const practicas = await this.practicasService.findPracticas();
            return res.status(200).json(practicas);
        }catch(error){
            next(error);
        }
    }

    async findById(req, res, next){
        try{
            const practica = await this.practicasService.findById(req.params.id);
            return res.status(200).json(practica);
        }catch(error){
            next(error);
        }
    }


    async createPractica(req, res, next){
        try{
            const practica = await this.practicasService.createPractica(req.body);
            return res.status(201).json(practica);
        }catch(error){
            next(error);
        }
    }

    async deletePractica(req, res, next){
       try{
            await this.practicasService.deletePractica(req.params.id);
            return res.status(204).send();
       }catch(error){
            next(error);
        }
    }

    // Coberturas
     async createCobertura(req, res, next){
       try{
            const cobertura = await this.practicasService.createCobertura(req.params.id, req.body);
            return res.status(201).json(cobertura);
       }catch(error){
            next(error);
        }
    }




}

module.exports = PracticasController;