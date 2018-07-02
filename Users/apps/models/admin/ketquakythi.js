var express = require('express');
var session = require('express-session');
var config = require('config');
var request = require('request');
var querystring = require('querystring');
var moment = require('moment');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.use(bodyParser.json());
var url = config.url;




var JsonAPI = "https://jsonplaceholder.typicode.com/todos";

router.get('/', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('ketquakythi', {
      data: {
        // message: req.flash('success'),
        // message1: req.flash('failuer'),
        json_data_chude: url + 'ChuDe?idnv=%26quyen=0',
        json_data_kythi: url + 'KyThi',
        pass: req.session.pass,
        email: req.session.email,
        id: req.session.idnv,
        ten: req.session.hoten,
        score:'10'
      }
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/:id', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('ketquakythi', {
      data: {
        json_data_chude: url + 'ChuDe?idnv=%26quyen=0',
        json_data_kythi: url + 'KyThi',
        pass: req.session.pass,
        email: req.session.email,
        id: req.session.idnv,
        ten: req.session.hoten,
        score: req.params.id
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/ketquakythi_ketqua', urlencodedParser, function(req, res) {
    if (req.session.email && req.session.quyen == 0) {
  // var tencd = req.body.tencd;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'ChuDe?idcd=' + req.body.idkt + '',
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
      if (req.session.email && req.session.quyen == 0) {
        res.render('ketquakythichitiet', {
          data: {
            json_data: url + 'LSThi?idkt=' + req.body.idkt,
            json_data_khongthi: url + 'LSThi?idkt=' + req.body.idkt+'%26khongthi',
            tenkt: req.body.tenkt,
            idkt:req.body.idkt,
            pass: req.session.pass,
            email: req.session.email,
            id: req.session.idnv,
            ten: req.session.hoten
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  })
} else {
  res.redirect('/login');
}
});


module.exports = router;
