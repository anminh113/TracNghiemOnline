var express = require('express');
var session = require('express-session');
var http = require('http');
var request = require('request');

var config = require('config');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(bodyParser.json());
var url = config.url;




var JsonAPI = "https://jsonplaceholder.typicode.com/todos";


router.get('/',function(req,res){
  if (req.session.email &&  req.session.quyen == 0){

    res.render('ketquakythi', {
      data: {
        json_data:JsonAPI,
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
