
class FiltroPorFecha{

    filtrarTurnos(turnos, rango){
        const desde = new Date(rango.key[desde])
        const hasta = new Date(rango.key[hasta])
        return turnos.filter(desde < t.fechaHora && t.fechaHora < hasta )
    }


}

module.exports = FiltroPorFecha;