var express = require('express');
var session = require('express-session');
var config = require('config');
var router = express.Router();
var bodyParser = require("body-parser");
// var oracledb = require("oracledb");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());
var url = config.url;


router.get('/',function(req,res){
    res.render('404');
});


module.exports = router;
