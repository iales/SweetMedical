class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends AppError{
    constructor(message){
        super(message, 404);
    }
  }

class ObjectDoesntExistError extends AppError{
    constructor(message){
      super(404, "El recurso buscado no existe")
    }
}

module.exports = {
  NotFoundError,
  ObjectDoesntExistError
};
