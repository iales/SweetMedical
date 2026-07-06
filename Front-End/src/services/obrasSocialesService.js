import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL

export const findObrasSociales = async () => {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/obrasSociales`,{
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        console.error("Error obteniendo las obrasSociales", error);
        throw error;
    }
}

export const findObraSocialById = async (obraSocialId) => {
    try{
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/obrasSociales/${obraSocialId}`,{
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
        return response.data
    }catch(error){
        console.error("Error obteniendo la obraSocial", error);
        throw error;
    }
}

export const findPlanById = async (obraSocialId,planId) => {
    try{
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/obrasSociales/${obraSocialId}/planes/${planId}`,{
            headers: { 'Cache-Control': 'no-cache',
                'Authorization': `Bearer ${token}`}});
    }catch(error){
        console.error("Error obteniendo el plan", error);
        throw error;
    }
}