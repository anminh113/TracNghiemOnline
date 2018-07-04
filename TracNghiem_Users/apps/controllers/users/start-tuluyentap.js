var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/start-tuluyentap"));

module.exports = router;