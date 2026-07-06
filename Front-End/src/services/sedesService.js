import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL

export const findSedes = async () => {
    try{

        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/sedes`, {
            headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`
             }});
        return response.data;
    } catch (error) {
        console.error("Error obteniendo las sedes", error);
        throw error;
    }
}


export const findSedeById = async (sedeId) => {
    try{
        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/sedes/${sedeId}`, {
            headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`}});
        return response.data;
    }catch(error){
        console.error("Error obteniendo la sede", error);
        throw error;
    }
}