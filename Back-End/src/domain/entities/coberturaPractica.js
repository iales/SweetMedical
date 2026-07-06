const NivelCobertura = require("./nivelCobertura");
const EstadoTurno = require("./nivelCobertura");

class CoberturaPractica{

    constructor(practicaId, nivelCobertura){
        this.practicaId = practicaId;
        
        const estadosPermitidos = Object.values(NivelCobertura);
        if (!estadosPermitidos.includes(nivelCobertura)) {
            throw new Error(`Cobertura no permitida: ${nivelCobertura}. Coberturas permitidas: ${estadosPermitidos.join(", ")}`);
        }
        this.nivelCobertura = nivelCobertura;
    }


}

module.exports = CoberturaPractica;