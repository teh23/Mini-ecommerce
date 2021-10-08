const Products = require("../models/product");
const findProduct = require("../services").productService.findProduct;
const findProductById = require("../services").productService.findProductById;
const messageBus = require("../globals/event");

const getAllProduct = async (req, res) => {
    if (req.headers.accept === "text/event-stream") {
        res.setHeader("Content-Type", "text/event-stream");
        messageBus.on("message", async () => {
            const allProduct = await findProduct();
            res.write(`data:  ${JSON.stringify(allProduct)}\n\n`);
            //console.log(messageBus.listenerCount("message"));
        });
    } else {
        const allProduct = await findProduct();
        res.send(JSON.stringify(allProduct));
    }
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
