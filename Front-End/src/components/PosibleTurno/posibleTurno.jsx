import React, { useState } from "react";
import './posibleTurno.css'
import { useCarrito } from '../Carrito/carritoContext';

const PosibleTurno = ({medicoId, practicaId, sedeId, nombreMedico, nombrePractica, especialidad, desde, duracionTurnoEnMins, nombreSede, costo  }) => {

    const { agregarAlCarrito, estaEnCarrito } = useCarrito();
    const [agregado, setAgregado] = useState(false);

    const handleAgregar = () => {
        agregarAlCarrito({ medicoId, practicaId, sedeId,  nombreMedico, nombrePractica, especialidad, desde, duracionTurnoEnMins, nombreSede, costo });
        setAgregado(true);
    };

    if (!agregado && estaEnCarrito(medicoId, desde, practicaId)) return null;

    return (
    <div className="posible-turno-card">
      <p className="turno-medico">Médico: {nombreMedico}</p>
      <p className="turno-sede">Sede: {nombreSede}</p>
      <p className="turno-horario">Fecha: {desde.split("T")[0]} - Hora: {desde.split("T")[1].substring(0,5)}</p>
      <p className="turno-especialidad">Especialidad: {especialidad}</p>
      <p className="turno-duracion">Duración en minutos: {duracionTurnoEnMins}</p>
      <p className="turno-costo">Costo: ${costo}</p>
      <button className={`btn-reservar ${agregado ? 'btn-agregado' : ''}`}
        onClick={handleAgregar}        disabled={agregado}
      >
      {agregado ? '✓ Seleccionado' : 'Seleccionar Turno'}
      </button>
    </div>
  );

};

export default PosibleTurno;




