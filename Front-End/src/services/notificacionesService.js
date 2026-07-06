import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || ""

const getAuthHeaders = () => {
    const token = localStorage.getItem("token")

    return {
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${token}`
    }
}

export const findNotificaciones = async (leida) => {
    try{
        const params = {}

        if (leida !== undefined) {
            params.leida = leida
        }
        
        const response = await axios.get(`${API_BASE_URL}/notificaciones`, {
            params,
            headers: getAuthHeaders()
        })

        return response.data
    } catch (error) {
        console.error("Error obteniendo las notificaciones", error)
        throw error
    }
}

export const marcarNotificacionComoLeida = async (notificacionId) => {
    try{
        const response = await axios.patch(`${API_BASE_URL}/notificaciones/${notificacionId}/leida`, {}, {
            headers: getAuthHeaders()
        })

        return response.data
    } catch (error) {
        console.error("Error marcando la notificacion como leida", error)
        throw error
    }
}
