import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || ""


export const findTurnoById = async (turnoId) => {
     try{

        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/turnos/${turnoId}`, {
         headers: { 'Cache-Control': 'no-cache',
                 'Authorization': `Bearer ${token}`}
        });

     return response.data;
    } catch (error) {
        console.error("Error obteniendo el turno", error);
        throw error;
    }
}


export const findTurnosByPacienteRequirements = async ({practicaId, fecha, medicoId, sedeId }) => {
     try{

        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/turnos/pacientes`, {
        params: {               
            practicaId,           
            fecha,       
            medicoId,
            sedeId
        }, headers: { 'Cache-Control': 'no-cache',
                 'Authorization': `Bearer ${token}`}
        });

     return response.data;
    } catch (error) {
        console.error("Error obteniendo las turnos", error);
        throw error;
    }
}

export const createTurno = async({medicoId, fechaHora, sedeId, practicaId}) => {
     try{

        const token = localStorage.getItem('token');

        const response = await axios.post(`${API_BASE_URL}/turnos`, 
            {
            practicaId,
            fechaHora,       
            medicoId,
            sedeId
        }, {
        headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`
         }});

     return response.data;
    } catch (error) {
        console.error("Error al crear el turno", error);
        throw error;
    }
}

export const cancelarTurno = async (turnoId, motivo) => {
    try{

        const token = localStorage.getItem('token');

        const response = await axios.delete(`${API_BASE_URL}/turnos/${turnoId}`, {
            data: { motivo },
            headers: { 'Cache-Control': 'no-cache',
                 'Authorization': `Bearer ${token}`
             }
        });
        return response.data;
    } catch (error) {
        console.error("Error al cancelar el turno", error);
        throw error;
    }
}

export const findHorariosDisponiblesParaModificar = async ({ turnoId, fecha }) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/turnos/${turnoId}/disponibles`, {
            params: { fecha },
            headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo horarios disponibles", error);
        throw error;
    }
}

export const findMisTurnos = async () => {
    try{
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/turnos/mis-turnos`, {
            headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error obteniendo mis turnos", error);
        throw error;
    }
}
export const actualizarTurno = async ({ turnoId, fechaHora, motivo, costo }) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_BASE_URL}/turnos/${turnoId}`,
            {
                fechaHora,
                motivo,
                costo
            },
            {
                headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el turno", error);
        throw error;
    }
}

export const confirmarModificacionTurno = async (turnoId) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${API_BASE_URL}/turnos/${turnoId}`, {}, {
            headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error al confirmar la modificacion del turno", error);
        throw error;
    }
}
export const findTurnosByMedicoId = async (medicoId) => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/turnos/medicos/${medicoId}`,
            {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }})
        
        return response.data;
    }catch(error){
        console.log("Error al obtener los turnos del medico", error);
        throw error
    }
} 

export const findTurnosByPacienteId = async (pacienteId) => {
    try{
        const token  = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/turnos/pacientes/${pacienteId}`,
            {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }})
        
            return response.data;
    }catch(error){
        console.log("Error al obtener los turnos del paciente", error);
        throw error
    }
}
