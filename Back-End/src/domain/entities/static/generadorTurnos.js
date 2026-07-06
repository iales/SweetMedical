const PosibleTurno = require('../PosibleTurno.js');
const VerificadorDeDisponibilidad = require ('./verificadorDeDisponibilidad.js');

class GeneradorTurnos {

    static generarPosiblesTurnos(medico, practica, fechaObjetivo, turnosActivos, costo) {
    const posiblesTurnos = [];


    const rangosDisponibles = VerificadorDeDisponibilidad.generarRangosDisponibles(turnosActivos, medico.disponibilidades, practica.duracionTurnoEnMins, fechaObjetivo);

    rangosDisponibles.forEach(rango => {
        medico.sedes.forEach(sede => {
            posiblesTurnos.push(
                new PosibleTurno(
                    medico.id,
                    medico.nombre,
                    practica.id,
                    practica.nombre,
                    practica.duracionTurnoEnMins,
                    practica.especialidadId,
                    practica.nombreEspecialidad,
                    rango.desde,
                    sede.sedeId,
                    sede.nombreSede,
                    costo
                ));
            });
        });
        
        return posiblesTurnos;
    }
}

module.exports = GeneradorTurnos;