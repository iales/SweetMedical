import React from 'react';
import './EstadoTurnoMain.css'

const EstadoTurnoMain = ({estado}) => {
    if(estado == 'RESERVADO'){
        return (
            <>
                <div className="tarjeta-estado">
                    <span>🟢</span>
                    <span className="texto-estado-confirmado">CONFIRMADO</span>
                </div>
            </>
        );
    }
    if(estado == 'CANCELADO'){
        return(
            <>
                <div className="tarjeta-estado">
                    <span>🔴</span>
                    <span className="texto-estado-cancelado">CANCELADO</span>
                </div>
            </>
        );
    }
    if(estado == 'ESPERANDO_CONFIRMACION'){
        return(
            <>
                <div className="tarjeta-estado">
                    <span>🔵</span>
                    <span className="texto-estado-esperando-confirmacion">ESPERANDO CONFIRMACION</span>
                </div>
            </>
        );
    }
    return(<h1>Turno Con Estado Invalido</h1>);
};

export default EstadoTurnoMain;