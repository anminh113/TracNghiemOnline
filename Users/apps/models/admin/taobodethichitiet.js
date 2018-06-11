var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

var url = config.url;


router.get('/',function(req,res){
  if (req.session.email &&  req.session.quyen == 0){
    res.render('taobodethichitiet', {
      data: {
        json_data: url+'NganHangCauHoiAdmin',
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
