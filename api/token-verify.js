const jwt = require('jsonwebtoken')

const secret = 'myCata';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNzM0MTM3MX0.iEvs97eycXG1b3w7Wy3JUAOGuEm4Rg9v87LJgvGAbOU'

function verifyToken(payload, secret) {
  return jwt.verify(payload, secret);
}

const payload = verifyToken(token, secret);
console.log(payload)