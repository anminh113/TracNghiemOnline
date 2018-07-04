var express = require('express');

var router = express.Router();
router.use("/", require("../../models/admin/trangchu"));


module.exports = router;
