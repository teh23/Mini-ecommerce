const WebSocket = require("websocket").client;
const message = require("./message");
const close = require("./close");
const error = require("./error");

const webSocketCallback = (data) => {
    var client = new WebSocket();

    const sev = "wss://mec-storage.herokuapp.com";
    const test = "ws://localhost:8080";

    client.on("connect", async (connection) => {
        console.log("WebSocket Client Connected");
        close(connection);
        error(connection);
        message(connection);
    });
    client.connect(sev);
};

module.exports = webSocketCallback;
