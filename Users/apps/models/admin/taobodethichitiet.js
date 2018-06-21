var express = require('express');
var session = require('express-session');
var config = require('config');
var request = require('request');
var querystring = require('querystring');
var router = express.Router();
var bodyParser = require("body-parser");
// var oracledb = require("oracledb");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.use(bodyParser.json());
var url = config.url;


router.get('/', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('taobodethichitiet', {
      data: {
        message: req.flash('success'),
        json_data: url + 'NganHangCauHoiAdmin',
        pass: req.session.pass,
        email: req.session.email,
        id: req.session.idnv,
        ten: req.session.hoten
      }
    });
  } else {
    res.redirect('/login');
  }
});


router.post('/', urlencodedParser, function(req, res) {
  var idcd = req.body.idcd;
  var idch = req.body.idch;

  var obj = [];

  for (var i = 0; i < idch.length; i++) {
    obj.push({
      idcd: idcd,
      idch: idch[i]
    });
  }
  if(obj[0]["idch"].length == 1){
     obj = [];
    obj.push({
      idcd: idcd,
      idch: idch
    });
  }
  request({
    method: 'POST',
    url: url + 'QuanLyCauHoi',
    body: JSON.stringify(obj),
    json: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, (err, res1, body) => {

    if (err) {
      res.redirect('/admin/404');
    } else {
      req.flash('success', '0');
      res.redirect('/admin/taobodethi');


    }
  });
});


module.exports = router;
