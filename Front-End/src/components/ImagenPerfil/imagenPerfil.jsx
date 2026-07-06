import React from 'react'

const IMAGE_DEFAULT_URL = '/images/sinFotoPerfil.png';
const ImagenPerfil = ({imagenPerfil}) => {
    if(!imagenPerfil){
        return(
            <img 
                src= {IMAGE_DEFAULT_URL}
                alt= 'Sin foto'
                className="perfil-circular"
            />
        );
    }
    return (
        <img 
            src= {imagenPerfil}
            alt= 'Sin foto'
            className="perfil-circular"
        />
    );
}

export default ImagenPerfil;