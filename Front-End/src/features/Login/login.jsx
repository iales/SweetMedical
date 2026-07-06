import "./login.css";
import React, {useEffect} from "react";
import { Link } from "react-router-dom"
import FormularioLogin from '../../components/Forms/formularioLogin';
import FooterLanding from "../../components/FooterLanding/footerLanding";

const Login = () => {
    useEffect (() => {
        document.title = "Iniciar sesion";
    }, [])

       return (
        <div className = "login-page">
        <div className="form-container">
            <div className="logoSweet">
                <img src="/images/Logo sweet.png" alt="Sweet Logo" />  
            </div>   

            <FormularioLogin />
              <p className="no-account">
                ¿No tienes una cuenta? {}
                <Link to="/signIn" className="link-signIn">Acceder</Link>
                </p>
        </div>
        <FooterLanding />
        </div>
    );
}

export default Login;