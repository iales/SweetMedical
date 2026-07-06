
class  VerificadorDeDisponibilidad{

    static diasMap = {
        domingo: 0,
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sábado: 6
    };

    static generarRangosDisponibles(turnosDelMedico, disponibilidades, duracionTurnoEnMins, fechaObjetivo) {
        const intervaloMins = duracionTurnoEnMins / 2;
        const disponibles = [];


        const fechaDia = new Date(fechaObjetivo + 'T00:00:00'); 
        const diaSemanaNum = fechaDia.getDay();  

        disponibilidades.forEach(disp => {
            const dispDiaNum = this.diasMap[disp.diaSemana.toLowerCase()];
            if (dispDiaNum !== diaSemanaNum) return;

            const inicio = new Date(`${fechaDia.toISOString().split('T')[0]}T${disp.horaDesde}Z`);
            const fin = new Date(`${fechaDia.toISOString().split('T')[0]}T${disp.horaHasta}Z`);

            for (let t = inicio.getTime(); t + duracionTurnoEnMins * 60000 <= fin.getTime(); t += intervaloMins * 60000) {
                const slotInicio = new Date(t);
                const slotFin = new Date(t + duracionTurnoEnMins * 60000);

                const ocupado = turnosDelMedico.some(turno => {
                    const turnoInicio = new Date(turno.fechaHora);
                    const turnoFin = new Date(turnoInicio.getTime() + turno.duracionEnMins * 60000);
                    return slotInicio < turnoFin && slotFin > turnoInicio;
                });

                if (!ocupado) {
                    disponibles.push({ desde: slotInicio, hasta: slotFin, diaSemana: disp.diaSemana });
                }
            }
        });

        return disponibles;
    }

    static hayConflicto(disponibilidades, diaSemana, horaDesde, horaHasta){
        return disponibilidades.some(d => {
        
        if (d.diaSemana !== diaSemana) {
            return false;
        }
    
        return (horaDesde < d.horaHasta) && (d.horaDesde < horaHasta);
        });
    }

}

module.exports = VerificadorDeDisponibilidad;