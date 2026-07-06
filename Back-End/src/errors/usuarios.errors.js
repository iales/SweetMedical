class UsuarioError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class EmailDuplicadoError extends UsuarioError{
    constructor(message){
        super(409,'El correo ingresado ya existe en la plataforma.');
    }
}

class CredencialesInvalidasError extends UsuarioError{
    constructor(message){
        super(404,'El email o la contraseña son inválidas.');
    }
}

module.exports = {
  EmailDuplicadoError,
  CredencialesInvalidasError
};
