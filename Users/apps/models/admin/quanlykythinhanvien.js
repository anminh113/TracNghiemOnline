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

router.get('/',function(req,res){
  if (req.session.email &&  req.session.quyen == 0){
    res.render('quanlykythinhanvien', {
      data: {
        message: req.flash('success'),
        message1: req.flash('failuer'),
        pass: req.session.pass,
        email: req.session.email,
        id:req.session.idnv,
        ten:req.session.hoten
      }
    });
  } else {
    res.redirect('/login');
  }
});


router.post('/', urlencodedParser, function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
  var idnv = req.body.idnv;
  var idkt = req.body.idkt;
  var obj = [];
  for (var i = 0; i < idnv.length; i++) {
    obj.push({
      idkt: idkt,
      idnv: idnv[i]
    });
  }
  if(obj[0]["idnv"].length == 1){
     obj = [];
    obj.push({
      idkt: idkt,
      idnv: idnv
    });
  }
  request({
    method: 'POST',
    url: url + 'QLNhanVienThi',
    body: JSON.stringify(obj),
    json: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
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




module.exports = router;
