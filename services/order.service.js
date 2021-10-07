const orders = require("../models/order");
const products = require("../models/product");
const decreaseProduct =
    require("../services/index").productService.decreaseProduct;

const findOrderById = async (id) => {
    try {
        const order = await orders.findOne({ _id: id }, { __v: 0 });
        return order;
    } catch (err) {
        console.log(err.name);
        return null;
    }
    //return order.find();
};

const addOrder = async (data) => {
    const { productId, quantity } = data;
    try {
        const product = await products.findOne({ productId: productId });

        if (product) {
            const subtraction = product.stock - quantity;
            if (subtraction < 0) {
                return 400;
            } else {
                const newOrder = new orders(data);
                const edit = await decreaseProduct(data);
                console.log(edit);
                const save = await newOrder.save();
                return save._id;
            }
        } else {
            return 404;
        }
    } catch (err) {
        return null;
    }
};

module.exports = {
    findOrderById,
    addOrder,
};
