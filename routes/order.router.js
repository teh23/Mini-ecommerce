const router = require("express").Router();
const data = require("../globals").data;

router.get("/", (req, res) => {
    res.send("asd");
    data.push("asd");
    console.log("asd");
    console.log(data);
});

module.exports = router;
