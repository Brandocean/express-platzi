const { User, UserSchema } = require('./userModel');
//* Aqui pueden ir mas modelos como el de arriba

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  //* Aqui pueden ir mas modelos como el de arriba
}

module.exports = setupModels;