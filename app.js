const express = require("express");
const path = require("path");
const cors = require("cors");
const WebSocket = require("./websocket");
const routes = require("./routes");
const app = express();
const data = require("./globals").data;
const bodyParser = require("body-parser");
WebSocket(data);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api", routes);

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

module.exports = app;
