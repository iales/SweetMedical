class Practica{

id;
nombre;
duracionTurnoEnMins;
especialidadId;
nombreEspecialidad;
costo;


constructor(nombre, duracionTurnoEnMins, especialidadId, nombreEspecialidad, costo){
    this.nombre = nombre;
    this.duracionTurnoEnMins = duracionTurnoEnMins;
    this.especialidadId = especialidadId;
    this.nombreEspecialidad = nombreEspecialidad;        
    this.costo = costo; 
}

}

module.exports = Practica;