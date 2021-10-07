const findOrderById = require("../services/index").orderService.findOrderById;

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

module.exports = {
    getOrderById,
};
