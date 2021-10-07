const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    productId: Number,
    quantity: Number,
});

module.exports = mongoose.model("order", orderSchema);
