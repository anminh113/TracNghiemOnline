var http = require('http');
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require("body-parser");
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(bodyParser.json());

// var urlencodedParser = bodyParser.urlencoded({
//   extended: true
// });



router.get('/', function (req, res) {

  // res.render('start');
  if (req.session.email && req.session.quyen == 1) {
    // rf=0;
    res.render('start-tuluyentap'
      , {
        data: {
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

var rf = 0;
router.post('/tuluyentap', urlencodedParser, function (req, res) {
  var thoigianlt = req.body.thoigianlt;
  var idcd = req.body.idcd;
  var tencd = req.body.tencd;
  var socauhoi = req.body.socauhoi;
  var hoten = req.session.hoten;
  var kt = req.session.kt;
  if(kt == 0){
    rf == kt;
  }if(kt == 1){
    rf = 0;
    sessData = req.session;
    sessData.kt = 0;
  }

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
  request(options, function (error, res1, body) {
    if (error) {
      res.redirect('/login');
    } else if (!error || res1.statusCode == 200) {
      var json = JSON.parse(body);
      if (req.session.email && req.session.quyen == 1) {
        if(rf == 0){
            res.render('tuluyentap', {
              data: {
                json_data: url + 'TuLuyen?idcd=' + idcd,
                thoigianlt: thoigianlt, 
                idcd: idcd,
                tencd: tencd,
                socauhoi: socauhoi,
                hoten: hoten,
                check: 0
              }
            });
          rf = 1;
        }else if(rf == 1){
          rf = 0;
          res.redirect('/user/vp');
        }
      } else {
        res.redirect('/login');
      }
      
    }
  })

});

module.exports = router;
