class TurnosError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class TurnoDoesntExistError extends TurnosError {
  constructor(id) {
    super(404, `Turno no encontrado`);
  }
}

class DisponibilidadNotAvailableError extends TurnosError {
    constructor() {
        super(409, `El médico no está disponible en la fecha y hora seleccionada`);
    }
}

class ModificacionNotPossibleError extends TurnosError {
   constructor(fechaHora) {
        super(422, `Hubo un error al crear o modificar el turno`);
   }
}

class InvalidDataError extends TurnosError {
    constructor() {
        super(400, 'Datos inválidos o faltantes');
    }
}

module.exports = {
    TurnosError,
    TurnoDoesntExistError,
    DisponibilidadNotAvailableError,
    ModificacionNotPossibleError,
    InvalidDataError
};

