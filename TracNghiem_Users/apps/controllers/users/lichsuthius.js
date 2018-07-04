var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/lichsuthius"));

module.exports = router;