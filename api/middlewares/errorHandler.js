
const { ValidationError } = require("sequelize")

//* Middleware del tipo errorFirst ya que tiene el error como primer parametro
function logErrors(err, req, res, next) {
  console.log('logErrors')
  console.log(err)
  next(err) //* Llama al siguiente middleware
}

//* Aunque no uses el next debes ponerlo para que sepa que es un middleware
function errorHandler(err, req, res, next) {
  console.log('errorHandler')
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if(err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }

  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
