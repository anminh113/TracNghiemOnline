var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var db = require('../common/database');
var bodyParser = require('body-parser');
var config = require('config');
var crypto = require('crypto');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

var url = config.url;

// Xóa session
router.get('/login', function(req, res) {
  req.session.destroy(function(err) {
    res.render('login');
  });
});


var myjson;
var email;
var pass;
var quyen;


router.post('/login', urlencodedParser, function(req, res, next) {
  let em = req.body.email.trim();
  let pw = req.body.pass.trim();
  var data =  crypto.createHash('md5').update(pw).digest("hex");
  // Set the headers
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'NhanVien?id=' + em + '',
    method: 'GET',
    headers: headers,
    qs: {
      'key1': 'xxx',
      'key2': 'yyy'
    }
  }
  // Start the request
  request(options, function(error, res1, body) {
    if (error) {
      res.redirect('/admin/404');
    } else if (!error || res1.statusCode == 200) {
      var json = JSON.parse(body);
      if (em == json.email && data == json.pass && json.quyen == 0) {
        sessData = req.session;
        sessData.email = json.email;
        sessData.idnv = json.idnv;
        sessData.quyen = json.quyen;
        sessData.hoten = json.hoten;
        sessData.phongban = json.tenpb;
        sessData.ngaysinh = json.ngaysinh;
        sessData.chucvu = json.chucvu;
        sessData.sdt = json.sdt;
        sessData.pass = json.pass;
        res.redirect('/admin/trangchu');
      } else if (em == json.email && data == json.pass && json.quyen == 1) {
        sessData = req.session;
        sessData.email = json.email;
        sessData.idnv = json.idnv;
        sessData.quyen = json.quyen;
        sessData.hoten = json.hoten;
        sessData.phongban = json.tenpb;
        sessData.ngaysinh = json.ngaysinh;
        sessData.chucvu = json.chucvu;
        sessData.sdt = json.sdt;
        sessData.pass = json.pass;
        res.redirect('/user/home');
      } else {
        res.redirect('/login');
      }
    }
  })


});







module.exports = router;
