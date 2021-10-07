const router = require("express").Router();
const getAllProducts = require("../controllers").product.getAllProduct;
const getProductById = require("../controllers").product.getProductById;

router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
