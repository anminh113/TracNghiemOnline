var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/404"));

module.exports = router;