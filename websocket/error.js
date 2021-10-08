const error = (connection) => {
    connection.on("error", async (error) => {
        console.log("Connection Error: " + error.toString());
    });
};
module.exports = error;
