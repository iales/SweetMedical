import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './headerLanding.css';

const LoginButton = styled(Button)({
  backgroundColor: 'var(--color-primario)',
  color:'black',
  border: '1px solid black '
});

const RegisterButton = styled(Button)({
  backgroundColor: 'var(--color-acento)',
  color: 'var(--color-primario)',
  border: '1px solid var(--color-primario)'

});


const HeaderLanding = () => {
    return(
        <header className ="header">
        <div className="logoSweetLanding">
            <img src="images/Logo sweet.png" alt="Sweet Logo" />  
        </div>   
        <nav className="nav-botones">
            <Link to="/login">
            <LoginButton variant="contained" className="btn-login">Iniciar sesión</LoginButton>
            </Link>
            <Link to="/signIn">
            <RegisterButton variant="contained" className="btn-register">Únete a Sweet</RegisterButton>
            </Link>
        </nav>
        </header>
    )

}

export default HeaderLanding;