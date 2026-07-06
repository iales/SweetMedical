import "./sacarTurno.css";
import React, {useEffect, useState} from "react";
import HeaderApp from "../../components/HeaderApp/headerApp";
import FormularioSacarTurno from "../../components/Forms/formularioSacarTurno";
import Loader from "../../components/Loader/loader"
import FooterMain from '../../components/FooterMain/FooterMain'

const SacarTurno = () => {

    useEffect(() => {
        document.title = "Sacar turno"; 
    }, []);

    return(
         <div>
            <div className="sacarTurno-page">
                <h3>Seleccione las características de su turno</h3>
                <FormularioSacarTurno />
            </div>
        </div>



    )
}

export default SacarTurno;