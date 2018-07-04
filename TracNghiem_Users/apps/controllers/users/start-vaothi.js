var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/start-vaothi"));

module.exports = router;