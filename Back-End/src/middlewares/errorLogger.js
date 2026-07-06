function errorLogger(err, req, res, next) {
    console.error({
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        error: {
            name: err.name,
            message: err.message
        },
    })

    next(err)
}

module.exports = {errorLogger}