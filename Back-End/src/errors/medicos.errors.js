class MedicosError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class MedicoDoesntExistError extends MedicosError {
  constructor() {
    super(404, `Médico no encontrado`);
  }

}

class DisponibilidadDoesntExistError extends MedicosError {
  constructor(medicoID, disponibilidadHorariaID) {
    super(404, `Disponibilidad horaria con ID ${disponibilidadHorariaID} no encontrada para el médico con ID ${medicoID}`);
  }
}

class ColisionDeDisponibilidad extends MedicosError{
  constructor(medicoID,diaSemana){
    super(409,`Colision de Disponibilidades, ${diaSemana} ocupado en ese horario`)
  }
}

class PracticaYaAsignadaError extends MedicosError {
    constructor() {
        super(400, 'El médico ya tiene esa práctica');
    }
}

class PracticaNoAsignadaError extends MedicosError {
    constructor() {
        super(400, 'El médico no tiene esa práctica');
    }
}

class MatriculaDuplicadaError extends MedicosError {
    constructor() {
        super(409, 'La matrícula ingresada ya pertenece a un médico registrado.');
    }
}

class DiaSemanaInvalido extends MedicosError{
  constructor(){
    super(400, 'Dia de la semana Invalido')
  }
}

module.exports = {
  MedicosError,
  MedicoDoesntExistError,
  DisponibilidadDoesntExistError,
  ColisionDeDisponibilidad, 
  PracticaYaAsignadaError,
  PracticaNoAsignadaError,
  MatriculaDuplicadaError,
  DiaSemanaInvalido
};
