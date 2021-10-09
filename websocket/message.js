const AddProduct = require("../services").productService.addProduct;
const Data = require("../globals/data");
const editProduct = require("../services/index").productService.editProduct;
const findProduct = require("../services").productService.findProduct;
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

                //TODO Optimize, organize
                if (Data.length > 0) {
                    const allProduct = await findProduct();

                    Data.forEach((res) => {
                        res.write(`data:  ${JSON.stringify(allProduct)}\n\n`);
                        console.log(res.socket._readableState.reading);
                    });
                    let test = Data.filter(
                        (res) => res.socket._readableState.reading
                    );

                    console.log(Data.length);
                    Data.length = 0;
                    Data.push(...test);
                }

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
