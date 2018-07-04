var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/taochudethius"));

module.exports = router;