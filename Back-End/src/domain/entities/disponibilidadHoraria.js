
const diasSemana = require("./diaSemana.js");
const { DiaSemanaInvalido } = require("../../errors/medicos.errors.js")

class DisponibilidadHoraria{
    constructor(id, diaSemana, horaDesde, horaHasta){
        const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1).toLowerCase();
        const diasPermitidos = Object.values(diasSemana);
        if (!diasPermitidos.includes(diaSemanaCapitalizado)) {
            throw new DiaSemanaInvalido();
        }

        this.id = id;
        this.diaSemana = diaSemanaCapitalizado; 
        this.horaDesde = horaDesde; 
        this.horaHasta = horaHasta;
    }
}

module.exports = DisponibilidadHoraria;
