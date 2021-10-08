const WebSocket = require("websocket").client;
const AddProduct = require("../services").productService.addProduct;
const Data = require("../globals").data;
const messageBus = require("../globals/event");
const editProduct =
    require("../services/index").productService.editProduct;

const webSocketCallback = (data) => {
    var client = new WebSocket();

    const sev = "wss://mec-storage.herokuapp.com";
    const test = "ws://localhost:8080";

    client.on("connectFailed", async (error) => {
        console.log("Connect Error: " + error.toString());
    });

    client.on("connect", async (connection) => {
        console.log("WebSocket Client Connected");
        connection.on("error", async (error) => {
            console.log("Connection Error: " + error.toString());
        });
        connection.on("close", async () => {
            console.log("wsad");
        });
        connection.on("message", async (message) => {
            const msg = JSON.parse(message.utf8Data);

            if (msg.length != undefined) {
                msg.forEach((obj) => {
                    AddProduct(obj);
                });
            } else {
                messageBus.emit("message", msg);
                console.log(msg)
                if (msg.operation === "product.stock.decreased") {
                    const editOperation = await editProduct(msg.payload)
                    if(editOperation?.error){
                        console.log(editOperation)
                    };
                    console.log(editOperation)
                }
            }
            if (connection.connected) {
                if (Data.length > 0) {
                    //connection.sendUTF(Data.shift());
                }
            }
        });
    });
    client.connect(sev);
};

module.exports = webSocketCallback;
