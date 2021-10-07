const orders = require("../models/order");

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

module.exports = {
    findOrderById,
};
