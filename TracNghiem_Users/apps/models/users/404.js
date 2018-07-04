var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());


router.get('/', function(req, res) {
      res.render('404');
  });

module.exports = router;