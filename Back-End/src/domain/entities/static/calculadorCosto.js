const NivelCobertura = require("../../entities/nivelCobertura");
const {Plan, Practica, coberturaPractica} = require("../../entities");

class CalculadorCosto {
    static calcular(practica, plan) {
        const costo = practica.costo;

        if (!plan || !plan.coberturasPractica) {
            return costo;
        }
        
        // Buscamos la cobertura comparando directamente con el ID de la práctica (cp.practicaId)
        const coberturaAsociada = plan.coberturasPractica.find((cp) => cp.practicaId === practica.id);

        // Si la práctica no está en el plan, no está cubierta (paga 100%)
        if (!coberturaAsociada) {
            return costo;
        }

        switch (coberturaAsociada.nivelCobertura) {
            case NivelCobertura.TOTAL:
                return 0; // Cubierto al 100%, el paciente paga 0
                
            case NivelCobertura.PARCIAL:
                return costo * 0.5; // Paga el 50%
                
            case NivelCobertura.NO_CUBIERTO:
            default:
                return costo; // Paga el 100%
        }
    }
}

module.exports = CalculadorCosto;