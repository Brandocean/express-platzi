const express = require('express');
const passport = require('passport');

const OrderService = require('../services/orderService');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      //* Sacamos el id desde el payload en la propiedad sub
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;