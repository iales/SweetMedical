const { ObraSocial } = require('../domain/entities');
const ObrasSocialesService = require('../services/obrasSociales.service');

class ObrasSocialesController {

    constructor(){
        this.obrasSocialesService = ObrasSocialesService.instance();
    }

    static instance() {
        if (!ObrasSocialesController._instance) {
        ObrasSocialesController._instance = new ObrasSocialesController();
        }
        return ObrasSocialesController._instance;
    }

    // Obras sociales
    async findObrasSociales(res, next){
        try{
            const obrasSociales = await this.obrasSocialesService.findObrasSociales();
            return res.status(200).json(obrasSociales);
        }catch(error){
            next(error);
        }
    }

    async findById(req, res, next){
        try{
            const obraSocial = await this.obrasSocialesService.findById(req.params.id);
            return res.status(200).json(obraSocial);
        }catch(error){
            next(error);
        }
    }

    async createObraSocial(req, res, next){
        try{
            const obraSocial = await this.obrasSocialesService.createObraSocial(req.body);
            return res.status(201).json(obraSocial);
        }catch(error){
            next(error);
        }
    }

    // Planes

    async findPlanes(req, res, next){
        try{
            const planes = await this.obrasSocialesService.findPlanes();
            return res.status(200).json(planes);
        }catch(error){
            next(error);
        }
    }

    async createPlan(req, res, next){
        try{
            const plan = await this.obrasSocialesService.createPlan(req.body);
            return res.status(201).json(plan);
        }catch(error){
            next(error);
        }
    }

     async addPlan(req, res, next) {
        try {
            const obraSocial = await this.obrasSocialesService.addPlan(req.params.id, req.params.planId);
            return res.status(201).json(obraSocial);
        } catch (error) {
            return next(error);
        }
    }


    async removePlanById(req, res, next) {
        try {
            const obraSocial = await this.obrasSocialesService.removePlanById(req.params.id, req.params.planId);
            return res.status(204).json(obraSocial);
        } catch (error) {
            return next(error);
        }
    }


    // Coberturas

    async addCobertura(req, res, next) {
        try {
            const plan = await this.obrasSocialesService.addCobertura(req.params.id, req.params.coberturaId);
            return res.status(201).json(plan);
        } catch (error) {
            return next(error);
        }
    }


    async removeCoberturaById(req, res, next) {
        try {
            const plan = await this.obrasSocialesService.removeCoberturaById(req.params.id, req.params.coberturaId);
            return res.status(204).json(plan);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ObrasSocialesController;