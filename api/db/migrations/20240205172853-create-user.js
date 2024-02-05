'use strict';

const { UserSchema, USER_TABLE } = require('../models/userModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    //* Puedes poner mas tablas o hacer otras cosas aqui
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    //* Puedes dropear mas tablas o hacer otras cosas aqui
  }
};
