const mongoose = require('mongoose');
const SedeModel = require('../../../schemas/sedeSchema')
const {Sede} = require('../../entities')
const {ObjectDoesntExistError} = require('../../../errors/app.errors');


class SedesRepository{
    constructor() {
        this.model = SedeModel;
    }

    static instance() {
        if (!SedesRepository._instance) {
        SedesRepository._instance = new SedesRepository();
        }
        return SedesRepository._instance;
    }

    async findSedes(){
        return await this.model.find();
    }

    async findById(id) { 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        
        return await this.model.findById(id);
    }

    async saveSede(sede) {
        this.validateSede(sede);
        const nuevaSede = new this.model(sede);
        return await nuevaSede.save()
    }

    async deleteSede(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }

        return await this.model.findByIdAndDelete(id);
    }


    validateSede(sede) {
            if (!(sede instanceof Sede)) {
                throw new Error('La sede es invalida');
            }
        }



}

module.exports = SedesRepository;