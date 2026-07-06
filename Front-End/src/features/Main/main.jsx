import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Container, Grid, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeaderApp from '../../components/HeaderApp/headerApp'; 
import FooterMain from '../../components/FooterMain/FooterMain.jsx';
import TarjetaTurnoMain from '../../components/TarjetaTurnoMain/tarjetaTurnoMain.jsx'; 
import turnos from '../../mocksData/mockTurnos.js';
import Loader from '../../components/Loader/loader.jsx'
import {paciente, turnosPendientes} from '../../mocksData/mockPacienteData.js';
import { useSession } from '../../components/SessionContext/sessionContext';
import { findMedicoById } from '../../services/medicosService.js';
import { findPacienteById } from '../../services/pacientesService.js';
import UserDataMain from '../../components/UserDataMain/userDataMain.jsx';
import {findEspecialidadBymedicoId} from '../../services/medicosService';
import { findTurnosByMedicoId, findTurnosByPacienteId } from '../../services/turnosService.js';
import { formatFechaHora } from '../../utils/dateUtils.js';

const BotonRojo = styled(Button)({
  backgroundColor: 'var(--color-acento)',
  color: 'var(--color-primario)',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: 'none',
  textTransform: 'none', 
  fontFamily: 'inherit', 
  fontSize: '1rem',
  boxShadow: 'none', 
  '&:hover': { 
    backgroundColor: '#a00b0b', 
    boxShadow: 'none'
  }
});

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { user } = useSession();

  useEffect(() => {
        document.title = "Sweet Medical | Inicio"; 
  }, []);
 
    useEffect(() => { 
      const getUserData = async () => {
        try{
          let datosUsuario = null;
          if(user.rol=="medico"){ 
            const datosMedicos = await findMedicoById(user.id);
            const turnosMedico = await findTurnosByMedicoId(user.id);
            datosUsuario = {...datosMedicos, turnos: turnosMedico};
          }

          if(user.rol=="paciente"){
            const paciente = await findPacienteById(user.id);
            const turnosPaciente = await findTurnosByPacienteId(user.id);
            datosUsuario = {...paciente, turnos: turnosPaciente};
          }
          
          setUserData(datosUsuario);
        }
        catch(error){} finally{setLoading(false);}
      }
  
      if (user?.id && user?.rol) {
        getUserData();
      } else {
        setLoading(false);
      }
    
    }, [user]);
    

  if (loading) {return <Loader texto= "Cargando datos principales" />;}
  
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: '40px', paddingBottom: '40px' }}>
        <Box mb={5}>
          <Typography variant="h4" fontWeight="normal" gutterBottom>
            Panel de Control
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Revisá tus turnos pendientes y gestioná tu cuenta.
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '3rem', 
          flexDirection: { xs: 'column', md: 'row' } 
        }}>
          
          <UserDataMain user={user} userData={userData} />
           
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
              {user?.rol === "paciente" && (
              <Link to="/sacar-turno" style={{ textDecoration: 'none' }}>
              
                <BotonRojo variant="contained" sx={{ padding: '0.8rem 2.5rem', fontSize: '1.2rem' }}>
                  Sacar Nuevo Turno
                </BotonRojo>
              </Link>
              )}
            </Box>

            <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'var(--color-acento)', 
                  textAlign: 'center', 
                  marginBottom: '2rem',
                  borderBottom: '2px solid var(--color-acento)',
                  display: 'inline-block',
                  paddingBottom: '0.1rem'
                }}
              >
                Tus próximos turnos
              </Typography>

            {userData?.turnos?.map((turno) => (
              <TarjetaTurnoMain key={turno.id || turno._id} turno={turno} user = {user} />
                )) || <Typography>No hay turnos disponibles o cargando...</Typography>
            }
          </Box>  
          
        </Box> 
      </Container>
      <FooterMain />
    </>
  );
};

export default Main;