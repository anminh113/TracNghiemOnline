var http = require('http');
var request = require('request');
var config = require("config");
var url = config.url;
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.get('/', function (req, res) {
  var data = {};
  if (req.session.email && req.session.quyen == 1) {
    res.render('kqckthius'
      , {
        data: {
          json_data: url + "KyThiLoad?idnv=" + req.session.idnv,
          json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
          email: req.session.email,
          idtk: req.session.idtk,
          hoten: req.session.hoten,
          idnv: req.session.idnv
        }
      });
  } else {
    res.redirect('/login');
  }
});

router.post('/kqckthius-chitiet', urlencodedParser, function (req, res) {
  var idkt = req.body.idkt;
  var tenkt = req.body.tenkt;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'LSThiTop?idkt=' + idkt + '',
    method: 'GET',
    headers: headers,
    qs: {
      'key1': 'xxx',
      'key2': 'yyy'
    }
  }
  // Start the request
  request(options, function (error, res1, body) {
    if (error) {
      res.redirect('/login');
    } else if (!error || res1.statusCode == 200) {
      var json = JSON.parse(body);
      if (req.session.email && req.session.quyen == 1) {
        res.render('kqckthius-chitiet', {
          data: {
            json_data: url + 'LSThiTop?idkt=' + idkt,
            json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
            idcd: json.idkt,
            tenkt: tenkt,
            hoten: req.session.hoten,
            email: req.session.email,
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  })

});

module.exports = router;