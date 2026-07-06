const {FiltroPorFecha, FiltroPorPractica, FiltroPorSede} = require("../../entities")

class FiltradorDeTurnos{

    static filtros = {
        sedeId: new FiltroPorSede(),
        fechaDesde: new FiltroPorFecha(),
        fechaHasta: new FiltroPorFecha()
    };

static filtrarTurnos(turnos, queryParams){
    const parametrosEnviados = Object.keys(queryParams);

    parametrosEnviados.forEach(key => {
        const filtro = this.filtros[key];
        if (filtro) {
            let value;

            if (filtro instanceof FiltroPorFecha) {
                value = { 
                    desde: queryParams.fechaDesde, 
                    hasta: queryParams.fechaHasta 
                };
            } else {
                    value = queryParams[key];
                }
                
            turnos = filtro.filtrarTurnos(turnos, value); 
        }
        });

    return turnos;    

    }  

    
    

}






module.exports = FiltradorDeTurnos;