const Products = require("../models/product");
const findProduct = require("../services").productService.findProduct;
const findProductById = require("../services").productService.findProductById;
const getAllProduct = async (req, res) => {
    const allProduct = await findProduct();
    res.send(JSON.stringify(allProduct));
};
const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await findProductById(id);
    if (product === null) {
        res.sendStatus(404);
    } else {
        res.send(JSON.stringify(product));
    }
};
module.exports = {
    getAllProduct,
    getProductById,
};
