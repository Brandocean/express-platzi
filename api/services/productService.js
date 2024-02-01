const { faker } = require("@faker-js/faker");
const boom = require('@hapi/boom');

const pool = require('../libs/postgresPool')
const sequelize = require('../libs/sequelize')

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

    //* Crea el id y adjunta toda la informacion que falta
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }

  //* Conexion con Pool
  async find() {
    const query = 'SELECT * FROM task'
    //const rta = await this.pool.query(query)
    //const [data, metadata] = await sequelize.query(query) //* Si tambien quieres medatada
    const [data] = await sequelize.query(query)

    return data
    //* Si tambien quieres metadata
    // return {
    //   data,
    //   metadata
    // }
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
