var express = require('express');

var router = express.Router();
router.use("/", require("../../models/users/taochudethius-chitiet"));

module.exports = router;