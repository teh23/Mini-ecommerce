const close = (connection) => {
    connection.on("close", async () => {
        console.log("Connection closed");
    });
};

module.exports = close;
