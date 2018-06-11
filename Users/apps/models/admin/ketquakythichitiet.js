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
  if (req.session.email &&  req.session.quyen == 0){
    res.render('ketquakythichitiet', {
      data: {
        pass: req.session.pass,
        email: req.session.email,
        id:req.session.idnv,
        ten:req.session.hoten
      }
    });
  } else {
    res.redirect('/login');
  }

});


module.exports = router;
