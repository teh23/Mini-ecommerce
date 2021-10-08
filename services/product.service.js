const Products = require("../models/product");
const messageBus = require("../globals/event");

const addProduct = async (obj) => {
    if (!(await Products.findOne({ productId: obj.productId }))) {
        //clearing collection before new connection
        await Products.deleteMany({});

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
        //console.log(product);
        if (product) {
            const subtraction = product.stock - quantity;
            if (subtraction >= 0) {
                product.stock = subtraction;

                const get = await Products.updateOne(
                    { productId: productId },
                    { stock: product.stock }
                );
                if (get) {
                    messageBus.emit("message", productId);
                    console.log("DECRESE");
                }

                return product;
            } else {
                return 400;
            }
        }
    } catch {
        return 404;
    }
};

const editProduct = async ({ productId, stock }) => {
    try {
        const product = await findProductById(productId);
        if (product) {
            const get = await Products.updateOne(
                { productId: productId },
                { stock: stock }
            );
            if (get) {
                messageBus.emit("message", productId);
            }

            return product;
        } else {
            return { error: "Not found" };
        }
    } catch {
        return { error: "Error" };
    }
};

module.exports = {
    addProduct,
    findProduct,
    findProductById,
    decreaseProduct,
    editProduct,
};
