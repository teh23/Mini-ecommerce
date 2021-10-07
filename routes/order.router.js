const router = require("express").Router();
const getOrderById = require("../controllers").order.getOrderById;

router.get("/:id", getOrderById);

module.exports = router;
