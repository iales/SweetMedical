import "./signIn.css";
import React, {useEffect} from "react";
import { Link } from "react-router-dom"
import FormularioSignIn from "../../components/Forms/formularioSignIn"
import FooterLanding from "../../components/FooterLanding/footerLanding";

const SignIn = () => {
    useEffect (() => {
        document.title = "Registrarse";
    }, [])

    return(
        <div className = "signIn-page">
        <div className="form-container">
            <div className="logoSweet">
                <img src="/images/Logo sweet.png" alt="Sweet Logo" />  
            </div>   

            <p className="intro-signIn">Da el primer paso hacia una vida más sostenible. Únete a la red médica más grande de todo el país</p>
            <p className="already-an-account">
                ¿Ya tienes una cuenta? {}
                <Link to="/logIn" className="link-logIn">Iniciar sesión</Link>
            </p>
            <FormularioSignIn />
        </div>
        <FooterLanding />
    </div>






    )




}

export default SignIn;