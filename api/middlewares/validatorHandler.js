const boom = require('@hapi/boom');

//* Middleware del tipo normal (req, res, next)
//* Middleware dinamico ya que retorna otro middleware
function validatorHandler(schema, property) {

  return (req, res, next) => {
    const data = req[property] //* Obtenemos la req de forma dinamica: req.body, req.params, req.query.
    const { error } = schema.validate(data, { abortEarly: false })
    if(error) {
      next(boom.badRequest(error))
    }
    next()
  }

}

module.exports = validatorHandler
