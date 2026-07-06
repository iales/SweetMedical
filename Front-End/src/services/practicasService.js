import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL

export const findAllPracticas = async () => {
    try{

        const token = localStorage.getItem('token');

        const response = await axios.get(`${API_BASE_URL}/practicas`, {
            headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const findPracticaById = async (practicaID) => {
    try{
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_BASE_URL}/practicas/${practicaID}`,
            {headers: { 'Cache-Control': 'no-cache', 'Authorization': `Bearer ${token}`  }});
        return response.data; 
    }catch(error){
        throw error
    }
}