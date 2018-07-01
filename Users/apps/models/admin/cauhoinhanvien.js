var express = require('express');
var session = require('express-session');
var config = require('config');
var request = require('request');
var querystring = require('querystring');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.use(bodyParser.json());
var url = config.url;

router.get('/', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('cauhoinhanvien', {
      data: {
        message: req.flash('success'),
        message1: req.flash('failuer'),
        json_data: url + 'NganHangCauHoi',
        json_data_nhanvien: url + 'NhanVien?quyen=1',
        json_data_cauhoi_nhanvien: url + 'NhanVien?quyen=1',
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

router.post('/', urlencodedParser, function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    var idnv = req.session.idnv;
    var idch = req.body.idch;
    var ndch = req.body.ndch;
    var nda = req.body.nda;
    var ndb = req.body.ndb;
    var ndc = req.body.ndc;
    var ndd = req.body.ndd;
    var da = req.body.dapandung;
    var text = [{
      "idnv": idnv,
      "idch": idch,
      "ndch": ndch,
      "nda": nda,
      "ndb": ndb,
      "ndc": ndc,
      "ndd": ndd,
      "da": da
    }];
    var values = text[0];
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
        res.redirect('/admin/404');
      } else {
        if (res1.body[0].result == 'success') {
          console.log('ok');
          req.flash('success', '0');
          res.redirect('/admin/cauhoinhanvien');
        } else if (res1.body[0].result == 'failure') {
          console.log('eo ok');
          req.flash('failuer', res1.body[0].message);
          req.flash('success', '1');
          res.redirect('/admin/cauhoinhanvien');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
});




module.exports = router;
