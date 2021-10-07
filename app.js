const express = require("express");
const path = require("path");
const cors = require("cors");
const WebSocket = require("./websocket");
const routes = require("./routes");
const app = express();
const data = require("./globals").data;

WebSocket(data);

app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api", routes);

app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
