class Plan {

id;
nombre;
coberturasPractica;

    constructor(nombre){
        this.nombre = nombre;
        this.coberturasPractica = [];
    }

    agregarCobertura(cobertura) {
        this.coberturasPractica.push({ 
        coberturaId: cobertura.id,
        practicaId: cobertura.practicaId,
        nivelCobertura: cobertura.nivelCobertura  
    });
    }

    removerCobertura(coberturaId) {
        const index = this.coberturasPractica.findIndex(c => c.coberturaId === coberturaId);
        this.coberturasPractica.splice(index, 1);
    }

}

module.exports = Plan;