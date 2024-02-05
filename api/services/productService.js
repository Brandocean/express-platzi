const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class ProductService {

  constructor(){
    this.products = []
    this.generate()
    //* Esto solo aplica si usas pool pero sequelize lo hace por detras
    // this.pool = pool
    // this.pool.on('error', (err) => console.error(err))
  }

  generate() {
    const limit = 100

    for (let i = 0; i < limit; i++) {

      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })

    }

  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct
  }

  //* Conexion con Pool
  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {

    const index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      // throw new Error('product not found') //* Tirar un error de la forma tradicional
      throw boom.notFound('product not found') //* Tirar el error con boom
    }

    const product = this.products[index]

    //* Coloca la informacion que tenia y agregale los cambios
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id) {

    const index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      throw boom.notFound('product not found')
    }

    this.products.splice(index, 1)
    return { id }
  }

}

module.exports = ProductService
