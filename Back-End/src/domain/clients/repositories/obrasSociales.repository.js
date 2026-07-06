const mongoose = require('mongoose');
const {ObraSocial, Plan, CoberturaPractica} = require('../../entities');
const ObraSocialModel = require('../../../schemas/obraSocialSchema');
const PlanModel = require('../../../schemas/planSchema');

class ObrasSocialesRepository {

    constructor(){
        this.model = ObraSocialModel;
        this.planModel = PlanModel;
    }

    static instance() {
    if (!ObrasSocialesRepository._instance) {
      ObrasSocialesRepository._instance = new ObrasSocialesRepository();
    }
    return ObrasSocialesRepository._instance;
    }

    // Obras sociales
    async saveObraSocial(obraSocial){
        const nuevaObraSocial = new this.model(obraSocial);
        return await nuevaObraSocial.save()
    }

    async findObrasSociales(){
        return await this.model.find();
    }

    async findById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
                
        return await this.model.findById(id);
    }

    async updateObraSocial(obraSocial) {
    return await this.model.findByIdAndUpdate(obraSocial.id,
        { nombre: obraSocial.nombre,
          planes: obraSocial.planes },
        { new: true });
    }

    // Planes
    async savePlan(plan){
        const nuevoPlan = new this.planModel(plan);
        return await nuevoPlan.save()
    }

    async findPlanes(){
        return await this.planModel.find();
    }

    async findPlanById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ObjectDoesntExistError(); 
        }
                
        return await this.planModel.findById(id);
    }

    async updatePlan(plan) {
        return await this.planModel.findByIdAndUpdate(plan.id,
            { nombre: plan.nombre,
            coberturasPractica: plan.coberturasPractica },
            { new: true });
        
    

}
}

module.exports = ObrasSocialesRepository;