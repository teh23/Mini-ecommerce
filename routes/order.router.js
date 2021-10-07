const router = require("express").Router();
const getOrderById = require("../controllers").order.getOrderById;
const postOrder = require("../controllers").order.postOrder;

router.get("/:id", getOrderById);
router.post("/", postOrder);
module.exports = router;
