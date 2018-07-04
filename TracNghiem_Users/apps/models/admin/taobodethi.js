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
    res.render('taobodethi', {
      data: {
        message: req.flash('success'),
        message1: req.flash('failuer'),
        json_data: url + 'ChuDe?idnv=%26quyen=0',
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
    if (req.session.email && req.session.quyen == 0) {
  var idcd = req.params.idcd;
  var link = url + "ChuDe/"
  request({
    method: 'DELETE',
    url: link + idcd,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    if (err) {
      res.redirect('/admin/404');
    } else {

      if (JSON.parse(res1.body)[0].result == 'success') {
        console.log('ok');
        req.flash('success', '0');
        res.redirect('/admin/taobodethi');
      } else {
        req.flash('success', '1');
        console.log('eo ok');
        req.flash('failuer', JSON.parse(res1.body)[0].message);
        res.redirect('/admin/taobodethi');
      }
    }
  });
} else {
  res.redirect('/login');
}
});

// post json data server
router.post('/', urlencodedParser, function(req, res) {
    if (req.session.email && req.session.quyen == 0) {
  var idnv = req.session.idnv;
  var chude = req.body.chude;

  var text = [{
    "idnv": idnv,
    "tencd": chude
  }];
  var values = text[0];

  request({
    method: 'POST',
    url: url + 'ChuDe',
    body: values,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    // console.log(res1);
    if (err) {
      res.redirect('/admin/404');
    } else {

      if (res1.body[0].result == 'success') {
        console.log('ok');
        req.flash('success', '0');
        res.redirect('/admin/taobodethi');
      } else {

        console.log('eo ok');
        req.flash('failuer', res1.body[0].message);
        res.redirect('/admin/taobodethi');
      }
    }
  });
} else {
  res.redirect('/login');
}
});

router.post('/taobodethi_themcauhoi', urlencodedParser, function(req, res) {
    if (req.session.email && req.session.quyen == 0) {
  var idcd = req.body.idcd;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'ChuDe?idcd=' + idcd + '',
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
        res.render('taobodethichitiet', {
          data: {
            message: req.flash('success'),
            message1: req.flash('failuer'),
            json_data: url + 'LoadCauHoi?idcd=' + idcd + '%26quyen=0%26idnv=',
            json_data_modal: url + 'LoadCauHoiModal',
            tencd: json.tencd,
            idcd: json.idcd,
            idnv: json.idnv,
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

router.post('/taobodethi_xemchitiet', urlencodedParser, function(req, res) {
    if (req.session.email && req.session.quyen == 0) {
  var idcd = req.body.idcd;
  // var tencd = req.body.tencd;
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url + 'NganHangCauHoi?id=' + idcd + '',
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
        // console.log(json);
        res.render('taobodethicauhoi', {
          data: {
            message: req.flash('success'),
            message1: req.flash('failuer'),
            json_data: url + 'LoadCauHoi?idcd=' + idcd,
            json_data_modal: url + 'LoadCauHoiModal',
            tencd: req.body.tencd,
            idcd: idcd,
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
