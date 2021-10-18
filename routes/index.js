require('dotenv').config();
const router = require('express').Router();
const orderRouter = require('./order.router');
const productRouter = require('./product.router');

router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;
