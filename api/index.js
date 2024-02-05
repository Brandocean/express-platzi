const express = require('express')
const cors = require('cors')
const routerApi = require('./routes') //* El index.js lo busca por defecto
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors())

app.get('/api', (req, res) => {
  res.send('Hola este es mi server en Express')
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola soy nueva ruta')
})

//* Para llamar a todas las rutas
routerApi(app)

//* Middleware en el orden de ejecucion: primero logErrors y despues errorHandler
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})
