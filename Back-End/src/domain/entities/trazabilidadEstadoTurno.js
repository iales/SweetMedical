class TrazabilidadEstadoTurno{

    constructor(fechaHoraIngreso, estado, motivo){
        this.fechaHoraIngreso = fechaHoraIngreso;
        this.estado = estado;
        this.motivo = motivo || null;
    }

}

module.exports = TrazabilidadEstadoTurno;