const express = require('express')
const routerApi = require('./routes') //* El index.js lo busca por defecto
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hola este es mi server en Express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy nueva ruta')
})

//* Para llamar a todas las rutas
routerApi(app)

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})
