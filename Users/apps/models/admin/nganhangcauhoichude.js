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

// get cau hoi
router.get('/', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('nganhangcauhoichude', {
      data: {
        json_data: url + 'NganHangCauHoi?idnv=%26quyen=0',
        json_data_modal: url + 'LoadCauHoiModal',
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

// thêm
router.post('/', urlencodedParser, function(req, res) {
  var idnv = req.session.idnv;
  var ndch = req.body.cauhoi;
  var nda = req.body.dapana;
  var ndb = req.body.dapanb;
  var ndc = req.body.dapanc;
  var ndd = req.body.dapand;
  var da = req.body.dapandung;
  var text = [{
    "idnv": idnv,
    "ndch": ndch,
    "nda": nda,
    "ndb": ndb,
    "ndc": ndc,
    "ndd": ndd,
    "da": da
  }];
  var values = text[0];
  console.log(values);
  request({
    method: 'POST',
    url: url + 'NganHangCauHoi',
    body: values,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    if (err) {
      console.log(err);
    } else {
      if (res1.body[0].result == 'success') {
        console.log('ok');
        res.redirect('/admin/nganhangcauhoichude');
      } else if (res1.body[0].result == 'failuer') {
        console.log('eo ok');
        res.redirect('/admin/nganhangcauhoichude');
      }

    }
  });
});


// update
router.post('/capnhat', urlencodedParser, function(req, res) {
  var inputValue = req.body.capnhat;

  if (inputValue == "delete") {
    var idch = req.body.idch;
    var link = url + "NganHangCauHoi/"+idch+"";
    request({
      method: 'DELETE',
      url: link,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res1, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.parse(res1.body)[0].result);
        if (JSON.parse(res1.body)[0].result == 'success') {
          console.log('ok');
          res.redirect('/admin/nganhangcauhoichude');
        } else {
          console.log('eo ok');
          res.redirect('/admin/nganhangcauhoichude');
        }
      }
    });
  };

  if (inputValue == "update") {
    var cauhoi = req.body.cauhoi;
    var nda = req.body.nda;
    var ndb = req.body.ndb;
    var ndc = req.body.ndc;
    var ndd = req.body.ndd;
    var da = req.body.dapandung;
    var idch = req.body.idch;
    var text = [{
      "ndch": cauhoi,
      "idch": idch,
      "nda": nda,
      "ndb": ndb,
      "ndc": ndc,
      "ndd": ndd,
      "da": da,
    }];
    var values = text[0];
    request({
      method: 'PUT',
      url: url + 'NganHangCauHoi',
      body: values,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res1, body) => {
      if (err) {
        console.log(err);
      } else {
        if (res1.body[0].result == 'success') {
          console.log('ok');
          res.redirect('/admin/nganhangcauhoichude');
        } else {
          console.log(res1.body[0].result =='failuer');
          console.log('eo ok');
          res.redirect('/admin/nganhangcauhoichude');
        }

      }
    });
  };


});

module.exports = router;
