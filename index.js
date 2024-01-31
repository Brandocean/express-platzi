const express = require('express')
const routerApi = require('./routes') //* El index.js lo busca por defecto
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola este es mi server en Express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy nueva ruta')
})

//* Para llamar a todas las rutas
routerApi(app)

//* Middleware en el orden de ejecucion: primero logErrors y despues errorHandler
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})
