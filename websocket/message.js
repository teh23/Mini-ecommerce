const AddProduct = require("../services").productService.addProduct;

const editProduct = require("../services/index").productService.editProduct;

const message = (connection) => {
    connection.on("message", async (message) => {
        const msg = JSON.parse(message.utf8Data);

        //Adds products to the database on startup
        if (msg.length != undefined) {
            msg.forEach((obj) => {
                AddProduct(obj);
            });
        } else {
            //Further transmission
            console.log(msg);
            if (
                msg.operation === "product.stock.decreased" ||
                msg.operation === "product.stock.updated"
            ) {
                //console.log(msg.payload);
                const editOperation = await editProduct(msg.payload);

                //TODO error handling
                if (editOperation?.error) {
                    console.log(editOperation);
                }
                //console.log(editOperation);
            }
        }
    });
};

module.exports = message;
