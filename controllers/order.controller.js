const findOrderById = require("../services/index").orderService.findOrderById;
const addOrder = require("../services/index").orderService.addOrder;

const getOrderById = async (req, res) => {
    const id = req.params.id;
    const order = await findOrderById(id);
    console.log(order);
    if (order === null) {
        res.sendStatus(404);
    } else {
        res.send(JSON.stringify(order));
    }
};

const postOrder = async (req, res) => {
    const data = req.body;
    const addedOrder = await addOrder(data);
    res.send(addedOrder);
};

module.exports = {
    getOrderById,
    postOrder,
};
