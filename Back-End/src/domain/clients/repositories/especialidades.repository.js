const mongoose = require('mongoose');
const EspecialidadModel = require('../../../schemas/especialidadSchema');
const {Especialidad} = require('../../entities')
const {ObjectDoesntExistError} = require('../../../errors/app.errors');


class EspecialidadesRepository{
    constructor() {
        this.model = EspecialidadModel;
    }

    static instance() {
        if (!EspecialidadesRepository._instance) {
        EspecialidadesRepository._instance = new EspecialidadesRepository();
        }
        return EspecialidadesRepository._instance;
    }

    async findEspecialidades(){
        return await this.model.find();
    }

    async findById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
        
        return await this.model.findById(id);
    }

    async saveEspecialidad(especialidad) {
        this.validateEspecialidad(especialidad);
        const nuevaEspecialidad = new this.model(especialidad);
        return await nuevaEspecialidad.save()
    }

    async deleteEspecialidad(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }

        return await this.model.findByIdAndDelete(id);
    }


    validateEspecialidad(especialidad) {
        if (!(especialidad instanceof Especialidad)) {
            throw new Error('La especialidad es invalida');
        }
    }



}

module.exports = EspecialidadesRepository;