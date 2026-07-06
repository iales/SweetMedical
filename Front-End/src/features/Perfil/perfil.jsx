import React, { useState, useEffect } from "react";
import './perfil.css';
import { useSession } from "../../components/SessionContext/sessionContext";
import { findPacienteById } from "../../services/pacientesService";
import { findMedicoById } from "../../services/medicosService";
import PerfilPaciente from "../../components/PerfilPaciente/perfilPaciente";
import PerfilMedico from "../../components/PerfilMedico/perfilMedico";
import { findEmailUsuario } from "../../services/authService";

const Perfil = () => {
    const { user } = useSession();
    const [usuarioData, setUsuarioData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Perfil";
      }, []);

    useEffect(() => {
        const cargarDatos = async () => {
            try { 
                if (user?.rol === 'paciente') {
                    const data = await findPacienteById(user.id);
                    const email = await findEmailUsuario(data.usuarioId);
                    setUsuarioData({ ...data, tipo: 'PACIENTE', email: email });
                } else if (user?.rol === 'medico') {
                    const data = await findMedicoById(user.id);
                    const email = await findEmailUsuario(data.usuarioId);
                    setUsuarioData({ ...data, tipo: 'MEDICO', email: email });
                }
            } catch (error) {
                console.error("Error cargando perfil:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) cargarDatos();
        else setLoading(false);
    }, [user]);

    if (loading) return <p>Cargando...</p>;
    if (!usuarioData) return <h1>No se pudo cargar el perfil</h1>;

    if(usuarioData.tipo == 'PACIENTE') return (<PerfilPaciente user={usuarioData}/>);
    if(usuarioData.tipo == 'MEDICO') return (<PerfilMedico user={usuarioData}/>);
    
    return <h1>Usuario Invalido</h1>
}

export default Perfil;;