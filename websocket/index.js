const WebSocket = require("websocket").client;
const message = require("./message");
const close = require("./close");
const error = require("./error");
const Data = require("../globals/data");
const messageBus = require("../globals/event");
const webSocketCallback = (data) => {
    var client = new WebSocket();

    const sev = "wss://mec-storage.herokuapp.com";
    const test = "ws://localhost:8080";

    client.on("connect", async (connection) => {
        console.log("WebSocket Client Connected");
        close(connection);
        error(connection);
        message(connection);

        messageBus.on("send", () => {
            console.log("##########################################");
            console.log(Data[0]);
            connection.sendUTF(JSON.stringify(Data.shift()));
            //connection.sendUTF(JSON.stringify(Data.shift()));

            console.log("##########################################after");
        });
    });
    client.connect(sev, "echo-protocol");
};

module.exports = webSocketCallback;
