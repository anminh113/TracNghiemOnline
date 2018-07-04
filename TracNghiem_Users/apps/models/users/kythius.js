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
    res.render('kythius'
      , {
        data: {
          json_data: url + "KyThiLoad?idnv=" + req.session.idnv,
          json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
          hoten: req.session.hoten,
          email: req.session.email,
          idtk: req.session.idtk,
          idnv: req.session.idnv
        }
      });
  } else {
    res.redirect('/login');
  }
});

router.post('/start-vaothi', urlencodedParser, function (req, res) {
  var idkt = req.body.idkt;
  var tenkt = req.body.tenkt;
  var socauhoi = req.body.socauhoi;
  var tg = req.body.tg;
  var idcd = req.body.idcd;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + "KyThiLoad?idnv=" + req.session.idnv + '',
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
        res.render('start-vaothi', {
          data: {
            json_data: url + "KyThiLoad?idnv=" + req.session.idnv + '',
            json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
            socauhoi: socauhoi,
            tenkt: tenkt,
            idcd: idcd,
            tg: tg,
            idkt: idkt,
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