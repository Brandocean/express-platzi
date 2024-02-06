const express = require('express')

const ProductService = require('../services/productService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/productSchema')

const router = express.Router()
const service = new ProductService()

//! Este es un parametro tipo query
router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

router.get('/filter', (req, res) => {
  res.send('Soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

    try {
      //* se llama id es porque arriba lo colocamos como (:id)
      //const id = req.params.id //* Obtener un parametro especifico (Forma #1)
      const { id } = req.params //* Obtenerlo con ES6 (Forma #2 y recomendada)
      const product = await service.findOne(id)
      //const errorIntencional = service.getTotal()
      res.json(product)
    } catch (error) {
      next(error) //* Forzamos la llamada del middleware si hay error
    }

  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

//* Lo mismo aplica para el put
//* El patch solo necesita una parte del cuerpo
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'), //* primero checa el id
  validatorHandler(updateProductSchema, 'body'), //* luego checa el body
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const updatedProduct = await service.update(id, body)
      res.json(updatedProduct)
    } catch (error) {
      next(error)
    }
  })

//* El put necesita el cuerpo completo
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body
  const updatedProduct = await service.update(id, body)

  res.json(updatedProduct)
})

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router
