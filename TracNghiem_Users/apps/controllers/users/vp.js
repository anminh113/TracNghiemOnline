var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/vp"));

module.exports = router;