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
    try {
        const edit = await decreaseProduct(data);
        if (edit === 404) {
            return 404;
        }
        if (edit === 400) {
            return 400;
        }
        const save = await new orders(data).save();
        return save._id;
    } catch (err) {
        return 404;
    }
};

module.exports = {
    findOrderById,
    addOrder,
};
