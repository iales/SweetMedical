
class FiltroPorSede{

    static filtrarTurnos(turnos, sedeId){
        return turnos.filter(t => (t.sedeId == sedeId))
    }

}

module.exports = FiltroPorSede;