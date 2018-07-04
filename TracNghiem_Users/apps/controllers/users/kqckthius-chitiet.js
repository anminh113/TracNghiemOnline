var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/kqckthius-chitiet"));

module.exports = router;