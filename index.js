const express = require("express");
const path = require("path");
const cors = require("cors");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api", (req, res) => {
    console.log("log");
    res.send("hiho");
});

app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
