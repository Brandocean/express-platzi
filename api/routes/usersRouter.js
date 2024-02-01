const express = require('express')

const router = express.Router()

//! Este es un parametro tipo query
//* Para obtener limit y offset: http://localhost:3000/users?limit=10&offset=20
router.get('/', (req, res) => {
  const { limit, offset } = req.query
  if(limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parametros')
  }
})

module.exports = router
