import React, {useState}from "react";
import './carrito.css';
import HeaderApp from "../../components/HeaderApp/headerApp";
import { useCarrito } from '../../components/Carrito/carritoContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
    const { carrito, eliminarDelCarrito, confirmarTurno, confirmarTodos } = useCarrito();
    const navigate = useNavigate();

    const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");

    const costoTotal = carrito.reduce((acc, turno) => acc + turno.costo, 0);

    const handleConfirmar = async(turno, index) => {
        try{
        await confirmarTurno(turno);
        eliminarDelCarrito(index);

        setMensajeConfirmacion("Turno confirmado");
        setTimeout(() => setMensajeConfirmacion(""), 3000);

        }catch (error) {
            console.error("Error al confirmar turno:", error);
        }
    };

    return (
        <div className="carrito-page">
            <h2 className="carrito-titulo">Turnos preseleccionados</h2>

             {mensajeConfirmacion && (
                    <div className="notificacion-flotante">
                        {mensajeConfirmacion}
                    </div>
                )}

            {carrito.length === 0 ? (
                <div className="carrito-vacio">
                    <p>No tenés turnos preseleccionados.</p>
                    <button className="btn-volver" onClick={() => navigate('/sacar-turno')}> Buscar turnos</button>
                </div>
            ) : (
                <>
                <div className="carrito-lista">
                {carrito.map((turno, index) => (
                    <div key={index} className="carrito-card">
                        <div className="carrito-card-info">
                            <p className="carrito-medico">{turno.nombreMedico}</p>
                            <p className="carrito-practica">{turno.nombrePractica}</p>
                            <p className="carrito-detalle">Fecha: {turno.desde.split("T")[0]} - Hora: {turno.desde.split("T")[1].substring(0,5)}</p>
                            <p className="carrito-detalle">Duración: {turno.duracionTurnoEnMins} min</p>
                            <p className="carrito-detalle">Sede: {turno.nombreSede}</p>
                            <p className="carrito-costo">Costo: ${turno.costo}</p>
                        </div>
                        <div className="carrito-card-acciones">
                            <button className="btn-confirmar" onClick={() => handleConfirmar(turno, index)}> Confirmar turno</button>
                            <button className="btn-eliminar" onClick={() => eliminarDelCarrito(index)}> Eliminar</button>
                        </div>
                    </div>
                ))}
                </div>
                <div className="carrito-resumen">
                    <div className="resumen-info">
                        <p className="resumen-cantidad">{carrito.length} turno{carrito.length !== 1 ? 's' : ''} preseleccionado{carrito.length !== 1 ? 's' : ''}</p>
                        <p className="resumen-total">Total estimado: ${costoTotal.toLocaleString('es-AR')}</p>
                    </div>
                    <button className="btn-confirmar-todos" onClick={confirmarTodos}>Confirmar todos</button>
                </div>
                </>
            )}
        </div>
    );
};

export default Carrito;