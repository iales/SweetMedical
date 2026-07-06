const EstadoTurno = require("./estadoTurno");

class Turno {

id;
medicoId;
pacienteId;
fechaHora;
sedeId;
practicaId;
nombrePractica;
duracionEnMins;
estado;
historialEstados;
costo;

    constructor(medicoId, pacienteId, fechaHora, sedeId, practicaId, nombrePractica, duracionEnMins, estado, costo) {
        this.medicoId = medicoId;
        this.pacienteId = pacienteId;
        this.fechaHora = fechaHora;
        this.sedeId = sedeId;
        this.practicaId = practicaId;
        this.nombrePractica = nombrePractica;
        this.duracionEnMins = duracionEnMins;

        const estadosPermitidos = Object.values(EstadoTurno);
        if (!estadosPermitidos.includes(estado)) {
            throw new Error(`Estado no permitido: ${estado}. Estados permitidos: ${estadosPermitidos.join(", ")}`);
        }

        this.estado = estado;
        this.historialEstados = [];
        this.costo = costo;
    }

    actualizarEstado(trazabilidadEstadoTurno){
        this.historialEstados.push(trazabilidadEstadoTurno);
    }

}

module.exports = Turno;