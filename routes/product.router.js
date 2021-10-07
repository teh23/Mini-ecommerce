const router = require("express").Router();
const getAllProducts = require("../controllers").getAllProduct;
const getProductById = require("../controllers").getProductById;

router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
