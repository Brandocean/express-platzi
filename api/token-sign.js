const jwt = require('jsonwebtoken')

const secret = 'myCat';

//* Lo minimo que necesita el payload es el sub
//* Puedes agregar los campos que quieras como el del rol
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token)