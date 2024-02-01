const { faker } = require("@faker-js/faker");

class CategoryService {

  constructor(){
    this.categories = []
    this.generate()
  }

  generate() {

    const limit = 10

    for (let i = 0; i < limit; i++) {

      this.categories.push({
        categoryId: faker.string.uuid(),
        productId: faker.string.uuid()
      })

    }

  }

  find() {
    return this.categories
  }

  findOne(categoryId, productId){
    return this.categories.find(item => item.categoryId === categoryId && item.productId === productId)
  }
}

module.exports = CategoryService
