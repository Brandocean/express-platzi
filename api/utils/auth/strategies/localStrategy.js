const { Strategy } = require('passport-local');
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');


const UserService = require('../../../services/userService');
const service = new UserService();

const LocalStrategy = new Strategy({
  //* Aqui puedes renombrar los campos, ejemplo: en lugar de username en el api uso email como nombre
  usernameField: 'email',
  passwordField: 'password'
},
  async (username, password, done) => {
    try {
      const user = await service.findByEmail(username);

      if (!user) {
        done(boom.unauthorized(), false);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        done(boom.unauthorized(), false);
      }

      delete user.dataValues.password;
      done(null, user);

    } catch (error) {
      done(error, false);
    }
  });

module.exports = LocalStrategy;