import React, { createContext, useContext, useState } from "react";
import turnos from "../../mocksData/mockTurnos";
import { createTurno } from "../../services/turnosService"

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (turno) => {

        const yaExiste = carrito.some(
        (t) => t.medicoId === turno.medicoId && 
               t.desde === turno.desde && 
               t.practicaId === turno.practicaId
        );
    
        if (yaExiste) return;

        setCarrito((prev) => [
        ...prev,
        {
        medicoId: turno.medicoId,
        pacienteId: turno.pacienteId,
        sedeId: turno.sedeId,
        practicaId: turno.practicaId,
        nombreMedico: turno.nombreMedico,
        nombrePractica: turno.nombrePractica,
        nombreSede: turno.nombreSede,
        duracionTurnoEnMins: turno.duracionTurnoEnMins,
        costo: turno.costo,
        desde: turno.desde
        }
        ]);
    };

    const eliminarDelCarrito = (index) => {
        setCarrito((prev) => prev.filter((_, i) => i !== index));
    };

    const estaEnCarrito = (medicoId, desde, practicaId) => {
    return carrito.some(
        (t) => t.medicoId === medicoId && 
               t.desde === desde && 
               t.practicaId === practicaId
        );
    };

    const confirmarTurno = async (turno, index) => {
        if (!turno) return;

        try{
            const response = await createTurno(
                {medicoId: turno.medicoId, 
                fechaHora: turno.desde, 
                sedeId: turno.sedeId, 
                practicaId: turno.practicaId})

            setCarrito((prev) => prev.filter((_, i) => i !== index));            
        } catch (error) {
            console.error("Error al confirmar turno:", error);
        }
        
    };

    const confirmarTodos = async () => {
        try {
            await Promise.all(
                carrito.map((turno) => createTurno({
                    medicoId: turno.medicoId,
                    fechaHora: turno.desde,
                    sedeId: turno.sedeId,
                    practicaId: turno.practicaId
                }))
            );

            setCarrito([]);
        } catch (error) {
            console.error("Error al confirmar todos los turnos:", error);
        }
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, confirmarTurno, estaEnCarrito, confirmarTodos }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => useContext(CarritoContext);