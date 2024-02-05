'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customerModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    //* Puedes poner mas tablas o hacer otras cosas aqui
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
    //* Puedes dropear mas tablas o hacer otras cosas aqui
  }
};
