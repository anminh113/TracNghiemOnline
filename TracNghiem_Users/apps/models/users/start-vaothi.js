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



router.get('/', function (req, res) {

  if (req.session.email && req.session.quyen == 1) {
    res.render('start-vaothi'
      , {
        data: {
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

var rf = 0;

// router.post('/thi', urlencodedParser, function (req, res) {
//   var tg = req.body.tg;
//   var idcd = req.body.idcd;
//   var tenkt = req.body.tenkt;
//   var idkt = req.body.idkt;
//   var socauhoi = req.body.socauhoi;
//   var hoten = req.session.hoten;
//   var headers = {
//     'User-Agent': 'Super Agent/0.0.1',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
//   // Configure the request
//   var options = {
//     url: url + "KyThiLoad?idnv=" + req.session.idnv + '',
//     method: 'GET',
//     headers: headers,
//     qs: {
//       'key1': 'xxx',
//       'key2': 'yyy'
//     }
//   }
//   // Start the request
//   request(options, function (error, res1, body) {
//     if (error) {
//       res.redirect('/login');
//     } else if (!error || res1.statusCode == 200) {
//       var json = JSON.parse(body);
      
//       if (req.session.email && req.session.quyen == 1) {
//         req.flash('json_data',url + 'Thi?idcd=' + idcd);
//         req.flash('tg',tg);
//         req.flash('idcd',idcd);
//         req.flash('tenkt',tenkt);
//         req.flash('idkt',idkt);
//         req.flash('socauhoi',socauhoi);
//         req.flash('hoten',hoten);
//           res.render('thi',{
//             data: {
//               json_data: url + 'Thi?idcd=' + idcd,
//               tg: tg, 
//               idcd: idcd,
//               tenkt: tenkt,
//               idkt: idkt,
//               socauhoi: socauhoi,
//               hoten: hoten,
//               check: 0
//             }
//           });
       
//         // sessData = req.session.rf;
//       } else {
//         res.redirect('/login');
//       }
      
//     }
//   })

// });

module.exports = router;
