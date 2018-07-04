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

router.get('/', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('quanlykythi', {
      data: {
        message: req.flash('success'),
        message1: req.flash('failuer'),
        json_data_chude: url + 'ChuDe?idnv=%26quyen=0',
        json_data_kythi: url + 'KyThi',
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

router.get('/xoa/:idkt', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    var idkt = req.params.idkt;
    var link = url + "KyThi/"
    request({
      method: 'DELETE',
      url: link + idkt,
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
          res.redirect('/admin/quanlykythi');
        } else {
          console.log('eo ok');
          req.flash('success', '1');
          req.flash('failuer', JSON.parse(res1.body)[0].message);
          res.redirect('/admin/quanlykythi');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/', urlencodedParser, function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    var kythi = req.body.kythi;
    var chude = req.body.chude;
    var stardate = req.body.stardate;
    var enddate = req.body.enddate;
    var time = req.body.time;
    var text = [{
      "tenkt": kythi,
      "idcd": chude,
      "sdate": moment(stardate).format('DD-MMM-YYYY HH:mm:ss'),
      "edate": moment(enddate).format('DD-MMM-YYYY HH:mm:ss'),
      "tg": time
    }];
    var values = text[0];

    console.log(values);
    request({
      method: 'POST',
      url: url + 'KyThi',
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
          req.flash('success', '0');
          res.redirect('/admin/quanlykythi');
        } else if (res1.body[0].result == 'failure') {
          console.log('eo ok');
          req.flash('success', '1');
          req.flash('failuer', res1.body[0].message);
          res.redirect('/admin/quanlykythi');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/quanlykythi_nhanvien', urlencodedParser, function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    var idkt = req.body.idkt;
    var headers = {
      'User-Agent': 'Super Agent/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // Configure the request
    var options = {
      url: url + 'ChuDe?idcd=' + idkt + '',
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
          res.render('quanlykythinhanvien', {
            data: {
              json_data_phongban: url + 'PhongBan',
              idkt: req.body.idkt,
              tenkt: req.body.tenkt,
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

router.post('/quanlykythi_xemchitiet', urlencodedParser, function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    var idcd = req.body.idcd;
    var idkt = req.body.idkt;
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
          res.render('quanlykythichitiet', {
            data: {
              json_data: url + 'LoadCauHoi?idcd=' + idcd,
              json_data_modal: url + 'LoadCauHoiModal',
              json_data_kythi: url + 'QLNhanVienThi?idkt=' + idkt,
              sdate: req.body.sdate,
              edate: req.body.edate,
              tenkt: req.body.tenkt,
              idkt: req.body.idkt,
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
