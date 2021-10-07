const Product = require("../models/product");
const addProduct = async (obj) => {
    if (!(await Product.findOne({ productId: obj.productId }))) {
        const newProduct = new Product(obj);
        await newProduct.save();
    } else {
        console.log("#############################################");
    }
};

const findProduct = async () => {
    const products = await Product.find({}, { _id: 0, __v: 0 });
    return products;
};
const findProductById = async (id) => {
    const products = await Product.findOne(
        { productId: id },
        { _id: 0, __v: 0 }
    );
    return products;
};

module.exports = { addProduct, findProduct, findProductById };
