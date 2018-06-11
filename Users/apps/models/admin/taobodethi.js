var express = require('express');
var session = require('express-session');
var config = require('config');
var request = require('request');
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
    res.render('taobodethi', {
      data: {
        json_data: url + 'ChuDeAdmin',
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

router.get('/xoa/:idcd', function(req, res) {
    var idcd = req.params.idcd;
    var link = url+"ChuDeUser/"
    request({
      method: 'DELETE',
      url: link + idcd,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res1, body) => {
      if (err) {
        console.log(err);
      } else {

        if (res1.body[0].result == 'success') {
          console.log('ok');
          res.redirect('/admin/taobodethi');
        } else {

          console.log('eo ok');
          res.redirect('/admin/taobodethi');
        }
      }
    });
  });

// post json data server
router.post('/', urlencodedParser, function(req, res) {
  var idnv = req.session.idnv;
  var chude = req.body.chude;

  var text = [{
    "idnv": idnv,
    "tencd": chude
  }];
  var values = text[0];
  // console.log(values);
  request({
    method: 'POST',
    url: url + 'ChuDeUser',
    body: values,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    // console.log(res1);
    if (err) {
      console.log(err);
    } else {

      if (res1.body[0].result == 'success') {
        console.log('ok');
        res.redirect('/admin/taobodethi');
      } else {

        console.log('eo ok');
        res.redirect('/admin/taobodethi');
      }
    }
  });
});

router.post('/taobodethi_themcauhoi', urlencodedParser, function(req, res) {
  var idcd = req.body.idcd;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'ChuDeAdmin?id=' + idcd + '',
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
      res.redirect('/login');
    } else if (!error || res1.statusCode == 200) {
      var json = JSON.parse(body);
      if (req.session.email && req.session.quyen == 0) {
        // console.log(json);
        res.render('taobodethichitiet', {
          data: {
            json_data: url + 'NganHangCauHoiAdmin',
            tencd: json.tencd,
            idcd: json.idcd,
            idnv: json.idnv
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  })


});

router.post('/taobodethi_xemchitiet', urlencodedParser, function(req, res) {
  var idcd = req.body.idcd;
  // var tencd = req.body.tencd;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'NganHangCauHoiAdmin?id=' + idcd + '',
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
      res.redirect('/login');
    } else if (!error || res1.statusCode == 200) {
      var json = JSON.parse(body);
      if (req.session.email && req.session.quyen == 0) {
        // console.log(json);
        res.render('taobodethicauhoi', {
          data: {
            json_data: url + 'NganHangCauHoiAdmin?id=' + idcd,
            tencd: req.body.tencd
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  })

});

module.exports = router;
