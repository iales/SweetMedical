const mongoose = require('mongoose');
const PracticaModel = require('../../../schemas/practicaSchema');
const CoberturaModel = require('../../../schemas/coberturaPracticaSchema')
const {ObjectDoesntExistError} = require('../../../errors/app.errors');
const {Practica} = require('../../entities');

class PracticasRepository {

    constructor() {
            this.model = PracticaModel;
            this.coberturaModel = CoberturaModel;
        }

    static instance() {
    if (!PracticasRepository._instance) {
      PracticasRepository._instance = new PracticasRepository();
    }
    return PracticasRepository._instance;
    }


    // Practicas

    async savePractica(practica){
        this.validatePractica(practica);
        const nuevaPractica = new this.model(practica);
        return await nuevaPractica.save()
    }

    async findPracticas(){
        return await this.model.find();
    }


    async findById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
                
        return await this.model.findById(id);
    }

    async deletePractica(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }

        return await this.model.findByIdAndDelete(id);
    }

    
    // Coberturas
    async saveCobertura(cobertura){
        const nuevaCobertura = new this.coberturaModel(cobertura);
        return await nuevaCobertura.save()
    }

    
    async findCoberturaById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
                
        return await this.coberturaModel.findById(id);
    }

    validatePractica(practica){
        if (!(practica instanceof Practica)) {
            throw new Error('La practica es invalida');
        }
    }

}

module.exports = PracticasRepository;