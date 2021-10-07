const WebSocket = require("websocket").client;
const AddProduct = require("../services").productService.addProduct;
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
            console.log("echo-protocol Connection Closed");
        });
        connection.on("message", async (message) => {
            const msg = JSON.parse(message.utf8Data);

            if (msg.length != undefined) {
                msg.forEach((obj) => {
                    AddProduct(obj);
                });
            } else {
                console.log(msg);
            }
            if (connection.connected) {
                if (data.length > 0) {
                    connection.sendUTF(data.shift());
                }
            }
        });
    });
    client.connect(sev);
};

module.exports = webSocketCallback;
