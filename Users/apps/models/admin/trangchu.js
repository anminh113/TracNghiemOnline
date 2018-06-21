var express = require('express');
var session = require('express-session');
var request = require('request');
var config = require('config');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

router.use(bodyParser.json());
var url = config.url;




router.get('/', function(req, res) {
  if (req.session.email &&  req.session.quyen == 0){
    res.render('trangchu', {
      data: {
        message: req.flash('success'),
        message1: req.flash('failuer'),
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
