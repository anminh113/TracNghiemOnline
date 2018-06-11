var express = require('express');
var router = express.Router();
router.use("/", require("../../models/admin/404"));

module.exports = router;
