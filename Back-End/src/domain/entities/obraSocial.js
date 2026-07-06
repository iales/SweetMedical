class ObraSocial{

id;
nombre;
planes;    

    constructor(nombre){
        this.nombre = nombre;
        this.planes = [];
    }
    

    agregarPlan(plan) {
        this.planes.push({ 
        planId: plan.id,
        nombrePlan: plan.nombre  
    });
    }

    removerPlan(planId) {
        const index = this.planes.findIndex(p => p.planId === planId);
        this.planes.splice(index, 1);
    }
    
}

module.exports = ObraSocial;