const express = require('express')

const router = express.Router()

const CategoryService = require('../services/categoryService')

const service = new CategoryService()

router.get('/', (req, res) => {

  const categories = service.find()
  res.json(categories)

})

//* Productos que pertenecen a esta categoria
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  const category = service.findOne(categoryId, productId)

  res.json(category)
})



module.exports = router
