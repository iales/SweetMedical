
class FiltroPorPractica{

    filtrarTurnos(turnos, practicaId){
        return turnos.filter(t.practicaId = Number(practicaId))
    }

}

module.exports = FiltroPorPractica;