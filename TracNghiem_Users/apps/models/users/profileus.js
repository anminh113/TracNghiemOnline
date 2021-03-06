var express = require('express');
var router = express.Router();
var http = require('http');
var flash = require('express-flash');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var crypto = require('crypto');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

router.use(bodyParser.json());
var url = config.url;


router.get('/', function(req, res) {
    if (req.session.email && req.session.quyen == 1 ){
      res.render('profileus'
      , {
        data: {
          message: req.flash('success'),
          message1: req.flash('failuer'),
          email: req.session.email,
          idtk: req.session.idtk,
          hoten: req.session.hoten,
          ngaysinh: req.session.ngaysinh,
          phongban: req.session.phongban,
          sdt: req.session.sdt,
          chucvu: req.session.chucvu,
          pass: req.session.pass,
          json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv
        }
      });

    } else {
      res.redirect('/login');
    }
  });


  // post json data server
  router.post('/', urlencodedParser, function(req, res) {
    if (req.session.email &&  req.session.quyen == 1){
    var idnv = req.session.idnv;
    var pass_new1 = req.body.pass_new1;
    var data2 =  crypto.createHash('md5').update(pass_new1).digest("hex");
    var text = [{
      "idnv": idnv,
      "pass": data2
    }];
    var values = text[0];
    console.log(values);
    request({
      method: 'PUT',
      url: url + 'DoiMatKhau',
      body: values,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res1, body) => {
      if(err){
          res.redirect('/admin/404');
      }else{
        if(res1.body[0].result == 'success'){
          console.log('ok');
          req.flash('success', '0');
          res.redirect('/user/profileus');
        }else if(res1.body[0].result == 'failuer'){
          console.log('eo ok');
          req.flash('success', '1');
          req.flash('failuer', res1.body[0].message);
          res.redirect('/user/profileus');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
  });

module.exports = router;
