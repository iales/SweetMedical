const ObrasSocialesRepository = require('../domain/clients/repositories/obrasSociales.repository');
const {ObraSocial, Plan} = require('../domain/entities');
const {ObjectDoesntExistError, NotFoundError} = require('../errors/app.errors');
const PracticasService = require('./practicas.service');


class ObrasSocialesService {

  constructor(){
      this.obrasSocialesRepository = ObrasSocialesRepository.instance();
      this.practicasService = PracticasService.instance();
  }

  static instance() {
      if (!ObrasSocialesService._instance) {
        ObrasSocialesService._instance = new ObrasSocialesService();
      }
      return ObrasSocialesService._instance;
  }

  toDTO(obraSocial){
        return{
            id: obraSocial.id || obraSocial._id,
            nombre: obraSocial.nombre,
            planes: obraSocial.planes?.map(p => ({
              planId: p.planId,
              nombrePlan: p.nombrePlan
            }))
        }
    }

    toPlanDTO(plan){
        return{
            id: plan.id || plan._id,
            nombre: plan.nombre,
            coberturasPractica: plan.coberturasPractica?.map(c => ({
              coberturaId: c.coberturaId,
              practicaId: c.practicaId,
              nivelCobertura: c.nivelCobertura
            }))
        }
    }

    // Obras sociales
    async createObraSocial(obraSocialData){
        const obraSocial = new ObraSocial(obraSocialData.nombre); 

        const obraSocialGuardada = await this.obrasSocialesRepository.saveObraSocial(obraSocial);
        return this.toDTO(obraSocialGuardada);
    }

  
    async findObrasSociales(){
        const obrasSociales = await this.obrasSocialesRepository.findObrasSociales();
        return obrasSociales.map(o => this.toDTO(o))
    }      
       
    async findById(id){
        const obraSocial = await this.obrasSocialesRepository.findById(id);

        if (!obraSocial){
            throw new ObjectDoesntExistError();
        }
        return this.toDTO(obraSocial);
  }


  // Planes

    async findPlanes(id){
        const planes = await this.obrasSocialesRepository.findPlanes();
        return planes.map(p => this.toPlanDTO(p));
    }
    
    async createPlan(planData){
        const plan = new Plan(planData.nombre); 
        const planGuardado = await this.obrasSocialesRepository.savePlan(plan);
        return this.toDTO(planGuardado);
    }


    async findPlanById(planId){
        const plan = await this.obrasSocialesRepository.findPlanById(planId);
        if (!plan){
            throw new ObjectDoesntExistError();
        }

        return this.toPlanDTO(plan)
    }


    async addPlan(obraSocialId, planId){
        const obraSocial = await this.obrasSocialesRepository.findById(obraSocialId);
        if (!obraSocial){
            throw new ObjectDoesntExistError();
        }

        const plan = await this.findPlanById(planId);

        // Agregar verificacion por si ya tiene el plan
        obraSocial.agregarPlan(plan);
        await this.obrasSocialesRepository.updateObraSocial(obraSocial);

        return this.toDTO(obraSocial);
    }


    async removePlanById(obraSocialId, planId){
        const obraSocial = await this.obrasSocialesRepository.findById(obraSocialId);
        if (!obraSocial){
            throw new ObjectDoesntExistError();
        }

        const plan = await this.findPlanById(planId);

        // Agregar verificacion por si no tiene el plan

        obraSocial.removerPlan(plan.id);
      await this.obrasSocialesRepository.updateObraSocial(obraSocial);
    }


    // Coberturas (solo agregar y quitar de un plan)

    async addCobertura(planId, coberturaId){
        const plan = await this.obrasSocialesRepository.findPlanById(planId);
        if (!plan){
            throw new ObjectDoesntExistError();
        }

        const cobertura = await this.practicasService.findCoberturaById(coberturaId);

        // Agregar verificacion por si ya tiene la cobertura

        plan.agregarCobertura(cobertura);
        await this.obrasSocialesRepository.updatePlan(plan);

        return this.toPlanDTO(plan);
    }


    async removeCoberturaById(planId, coberturaId){
        const plan = await this.obrasSocialesRepository.findPlanById(planId);
        if (!plan){
            throw new ObjectDoesntExistError();
        }

        const cobertura = this.practicasService.findCoberturaById(coberturaId);

        // Agregar verificacion por si no tiene la cobertura
        plan.removerCobertura(coberturaId);
        await this.obrasSocialesRepository.updatePlan(plan);
     
    }


}
module.exports = ObrasSocialesService;

