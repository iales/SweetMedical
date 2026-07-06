const DisponibilidadHoraria = require('./disponibilidadHoraria');
class Medico {

    id;
    usuarioId;
    nombre;
    dni;
    matricula;
    practicas;
    sedes;
    disponibilidades;

    constructor(usuarioId, nombre, dni, matricula, sedes) {
        this.usuarioId = usuarioId;
        this.nombre = nombre;
        this.dni = dni;
        this.matricula = matricula;
        this.sedes = sedes;                          // sedes = [{sedeId: 1, nombreSede: "Villa Luzuriaga", }, {sedeId: 4, nombreSede: "Devoto"}]     
        this.practicas = [];                         // practicas = [{practicaId:, nombrePractica:, especialidadId:, nombreEspecialidad:}]
        this.disponibilidades = [];                  // disponibilidad [{}]                  
    }
    

    definirDisponibilidad(diaSemana, horaDesde, horaHasta){
        const disponibilidad = new DisponibilidadHoraria(this.nextDisponibilidadID, diaSemana, horaDesde, horaHasta);
        this.disponibilidades.push(disponibilidad);
        this.nextDisponibilidadID++;
        return disponibilidad;
    }

    agregarPractica(practica) {
        this.practicas.push({ 
            practicaId: practica.id,
            nombrePractica: practica.nombre,
            especialidadId: practica.especialidadId,
            nombreEspecialidad: practica.nombreEspecialidad  
        });
    }

    removerPractica(practicaId) {
        const index = this.practicas.findIndex(p => p.practicaId === practicaId);
        this.practicas.splice(index, 1);
    }  
}

module.exports = Medico;
    