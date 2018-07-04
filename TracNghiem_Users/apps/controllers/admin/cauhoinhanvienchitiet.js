var express = require('express');

var router = express.Router();
router.use("/", require("../../models/admin/cauhoinhanvienchitiet"));

module.exports = router;
