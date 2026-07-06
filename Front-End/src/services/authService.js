import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL

export const register = async(formData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Error en el registro");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

export const login = async(formData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "Error en el login");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}

export const findEmailUsuario = async(id) => {
  try{
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_BASE_URL}/login/${id}`, {
              headers: { 'Cache-Control': 'no-cache',
                  'Authorization': `Bearer ${token}`}});
    return response.data.email;
  }catch(error){
    console.log("Error al obtner el mail del usuario")
    throw error
  }
}