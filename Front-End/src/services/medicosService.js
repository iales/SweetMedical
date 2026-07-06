import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL

export const findMedicosByPracticaId = async (practicaId) => {
    try{
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_BASE_URL}/medicos/practicas/${practicaId}`, {
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        console.error("Error obteniendo los medicos", error);
        throw error;
    }
}

export const findPracticasByMedicoId = async (medicoId) => {
    try{
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_BASE_URL}/medicos/${medicoId}/practicas`, {
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        console.error("Error obteniendo las practicas segun el medico", error);
        throw error;
    }
}

export const addPractica = async (medicoId, practicaId) => {
    try{
        const token = localStorage.getItem('token'); 
        const response = await axios.post(`${API_BASE_URL}/medicos/${medicoId}/practicas/${practicaId}`, {
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
    return response.data;
    }catch(error){
        console.log("error al agregar una nueva practica")
        throw error;
    }
};


export const removePractica = async (medicoId, practicaId) => {
    try{
        const token = localStorage.getItem('token'); 
        const response = await axios.delete(`${API_BASE_URL}/medicos/${medicoId}/practicas/${practicaId}`,{
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
        return response.data;
    }catch(error){
        console.log("Error al remover una practica del medico")
        throw error
    }
};

export const findMedicoById = async (medicoId) => {
    try{
        const token = localStorage.getItem('token'); 

        const response = await axios.get(`${API_BASE_URL}/medicos/${medicoId}`,
        {headers: { 'Cache-Control': 'no-cache', 
            'Authorization': `Bearer ${token}`  }});
        return response.data;
    }catch(error){
        console.error("Error obteniendo el medico", error);
        throw error; 
    }   
}

export const findEspecialidadBymedicoId = async (medicoId) => {
    try{
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/medicos/${medicoId}/especialidades`,
        {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }});
        return response.data; 
    }catch(error){
        console.error("Error obteniendo la especialidad del medico", error);        
        throw error;
    }
}

export const createDisponibilidad = async (medicoId, nuevaDisponibilidad) => {
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.post(`${API_BASE_URL}/medicos/${medicoId}/disponibilidades`, nuevaDisponibilidad,
            {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }}
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear disponibilidad:", error);
        throw error;
    }
};

export const deleteDisponibilidad = async (medicoId, disponibilidadId) => {
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.delete(`${API_BASE_URL}/medicos/${medicoId}/disponibilidad/${disponibilidadId}`,
            {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }}
        );
        return response.data;
    } catch (error) {
        console.error("Error al eliminar disponibilidad:", error);
        throw error;
    }
};

export const getDisponibilidadesByMedico = async (medicoId) => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_BASE_URL}/medicos/${medicoId}/disponibilidades`,
            {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }}
        );
        return response.data;
    } catch (error) {
        console.error("Error al traer disponibilidades:", error);
        throw error;
    }
};