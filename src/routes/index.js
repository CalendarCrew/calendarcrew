const express = require("express");
const router = express.Router();

// different model routers
router.use("/Event", require("./Event"));
router.use("/User", require("./User"));

module.exports = router;