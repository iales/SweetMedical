
class FiltroPorMedico{

    filtrarTurnos(turnos, medicoId){

        return turnos.filter(t.medicoId = Number(medicoId))
    }

}

module.exports = FiltroPorMedico;