const EstadoTurno = Object.freeze({
    RESERVADO: 'RESERVADO',
    CANCELADO: 'CANCELADO',
    REALIZADO: 'REALIZADO',
    ESPERANDO_CONFIRMACION: 'ESPERANDO_CONFIRMACION'
});

module.exports = EstadoTurno;