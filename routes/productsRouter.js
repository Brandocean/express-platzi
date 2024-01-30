const express = require('express')
const { faker } = require("@faker-js/faker");

const router = express.Router()

//! Este es un parametro tipo query
router.get('/', (req, res) => {

  const products = []
  const { size } = req.query
  const limit = size || 10

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    })
  }

  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Soy un filter')
})

router.get('/:id', (req, res) => {
  //* se llama id es porque arriba lo colocamos como (:id)
  //const id = req.params.id //* Obtener un parametro especifico (Forma #1)
  const { id } = req.params //* Obtenerlo con ES6 (Forma #2 y recomendada)

  res.json({
    id,
    name: 'producto 2',
    price: 2000
  })

})

module.exports = router
