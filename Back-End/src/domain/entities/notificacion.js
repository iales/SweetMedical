class Notificacion {

id;
usuarioId;
mensaje;
leida;

    constructor(usuarioId, mensaje) {
        this.usuarioId = usuarioId;
        this.mensaje = mensaje;
        this.leida = false;
        this.fecha = new Date();
    }

    marcarComoLeida(){
        this.leida = true;
    }
}

module.exports = Notificacion;