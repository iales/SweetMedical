const { NotFoundError } = require("../errors/app.errors")

function notFoundHandler(req, res, next) {
   res.status(404).json({
        message: `${req.originalUrl}. Ruta inválida.`
    });
}

module.exports = {notFoundHandler}