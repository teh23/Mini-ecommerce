const Product = require("../models/product");
const addProduct = async (obj) => {
    if (!(await Product.findOne({ productId: obj.productId }))) {
        const newProduct = new Product(obj);
        await newProduct.save();
    } else {
        console.log("#############################################");
    }
};

module.exports = { addProduct };
