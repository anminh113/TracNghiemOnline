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

router.get('/',function(req,res){
  if (req.session.email &&  req.session.quyen == 0){
    res.render('nganhangcauhoichude', {
      data: {
        json_data: url+'NganHangCauHoiAdmin',
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
  var idnv = req.session.idnv;
  var ndch = req.body.cauhoi;
  var nda = req.body.dapana;
  var ndb = req.body.dapanb;
  var ndc = req.body.dapanc;
  var ndd = req.body.dapand;
  var da = req.body.dapandung;
  var text = [{
    "idnv": idnv,
    "ndch":ndch,
    "nda":nda,
    "ndb":ndb,
    "ndc":ndc,
    "ndd":ndd,
    "da":da
  }];
  var values = text[0];
  console.log(values);
  request({
    method: 'POST',
    url: url + 'NganHangCauHoiUser',
    body: values,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    if(err){
      console.log(err);
    }else{
      if(res1.body[0].result == 'success'){
        console.log('ok');
        res.redirect('/admin/nganhangcauhoichude');
      }else if(res1.body[0].result == 'failuer'){
        console.log('eo ok');
        res.redirect('/admin/nganhangcauhoichude');
      }

    }
  });
});


module.exports = router;
