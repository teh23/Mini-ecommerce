const Products = require("../models/product");

const addProduct = async (obj) => {
    if (!(await Products.findOne({ productId: obj.productId }))) {
        const newProduct = new Products(obj);
        await newProduct.save();
    } else {
        console.log("#############################################");
    }
};

const findProduct = async () => {
    const products = await Products.find({}, { _id: 0, __v: 0 });
    return products;
};
const findProductById = async (id) => {
    const products = await Products.findOne(
        { productId: id },
        { _id: 0, __v: 0 }
    );
    return products;
};

const decreaseProduct = async ({ productId, quantity }) => {
    try {
        const product = await findProductById(productId);
        console.log(product);
        if (product) {
            const subtraction = product.stock - quantity;
            if (subtraction >= 0) {
                product.stock = subtraction;

                await Products.updateOne(
                    { productId: productId },
                    { stock: product.stock }
                );

                return product;
            } else {
                return 400;
            }
        }
    } catch {
        return 404;
    }
};

module.exports = { addProduct, findProduct, findProductById, decreaseProduct };
