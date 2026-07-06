

class Paciente{

id;
usuarioId;
dni;
nombre;
obraSocialId;
planId;

    constructor(usuarioId, dni, nombre, obraSocialId, planId){
        this.usuarioId = usuarioId;
        this.dni = dni;
        this.nombre = nombre;
        this.obraSocialId = obraSocialId;
        this.planId = planId;


    }
    
}

module.exports = Paciente;