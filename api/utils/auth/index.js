const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategy');
const JwtStrategy = require('./strategies/jwtStrategy');
//* Aqui puedes ir colocando mas estrategias si se requiere

passport.use(LocalStrategy);
passport.use(JwtStrategy);
