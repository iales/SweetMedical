const {TurnoDoesntExistError, DisponibilidadNotAvailableError, ModificacionNotPossibleError, InvalidDataError } = require('../../../errors/turnos.errors.js');
const {Turno, TrazabilidadEstadoTurno, EstadoTurno} = require('../index.js');


class ValidadorDeTurno{

    static validarDisponibilidad(fechaHora, duracionTurnoEnMins, disponibilidades, turnosDelMedico){
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const diaSemana = diasSemana[fechaHora.getUTCDay()];

        const fechaFin = new Date(fechaHora.getTime() + duracionTurnoEnMins * 60 * 1000);

        const disponibilidad = disponibilidades.find(d =>
            d.diaSemana === diaSemana &&
            d.horaDesde <= fechaHora.toISOString().substring(11,16) &&
            fechaFin.toISOString().substring(11,16) <= d.horaHasta
        );

        let conflicto = false;
        if(turnosDelMedico && turnosDelMedico.length > 0){
        conflicto = turnosDelMedico.some(t => {
            const inicioTurnoExistente = new Date(t.fechaHora);
            const duracion = t.duracionEnMins;
            const finTurnoExistente = new Date(inicioTurnoExistente.getTime() + duracion * 60 * 1000);
            return fechaHora < finTurnoExistente && fechaFin > inicioTurnoExistente;
        });
        }

        if (!disponibilidad || conflicto) {
            throw new DisponibilidadNotAvailableError();
        }
    }

   static validarFechaCoherente(fechaHora){
        const ahora = new Date();
        
        if (fechaHora < ahora) {
            throw new ModificacionNotPossibleError(fechaHora);
        }
    }

   static validarFechaTurno(turno){
        const ahora = new Date();
        const limite = new Date(turno.fechaHora.getTime() - 60 * 60 * 1000);

        if (ahora >= limite) {
            throw new ModificacionNotPossibleError(turno.fechaHora);
        }          
   }

   static validarEstado(turno){
        if (turno.estado === EstadoTurno.CANCELADO || turno.estado === EstadoTurno.ESPERANDO_CONFIRMACION){
            throw new ModificacionNotPossibleError(turno.fechaHora);
        }
   }
   
}

module.exports = ValidadorDeTurno; 