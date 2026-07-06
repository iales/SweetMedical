
class PosibleTurno{

    constructor(medicoId, nombreMedico, practicaId, nombrePractica, duracionTurnoEnMins, especialidadId, nombreEspecialidad, desde, sedeId, nombreSede, costo) {
        this.medicoId = medicoId;
        this.nombreMedico = nombreMedico;
        this.practicaId = practicaId;
        this.nombrePractica = nombrePractica;
        this.duracionTurnoEnMins = duracionTurnoEnMins;
        this.especialidadId = especialidadId;
        this.nombreEspecialidad = nombreEspecialidad;
        this.desde = desde;
        this.sedeId = sedeId;
        this.nombreSede = nombreSede;
        this.costo = costo;
    }




}

module.exports = PosibleTurno;