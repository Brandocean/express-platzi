const { Strategy } = require('passport-local');

const AuthService = require('../../../services/authService');
const service = new AuthService();

const LocalStrategy = new Strategy({
  //* Aqui puedes renombrar los campos, ejemplo: en lugar de username en el api uso email como nombre
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;