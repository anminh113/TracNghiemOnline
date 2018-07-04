var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/feedback"));

module.exports = router;