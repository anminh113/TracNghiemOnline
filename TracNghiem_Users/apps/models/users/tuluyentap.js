var http = require('http');
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require("body-parser");
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());
var session = require('express-session');
var cookieParser = require('cookie-parser');
var check = 0;

// router.get('/', function (req, res) {
//   if (req.session.email && req.session.quyen == 1) {
//     res.render('tuluyentap'
//       , {
//         data: {
//           email: req.session.email,
//           idtk: req.session.idtk,
//           hoten: req.session.hoten,
//           idnv: req.session.idnv
//         }
//       });
//   } else {
//     res.redirect('/login');
//   }
// });


router.post('/', urlencodedParser, function (req, res) {
  var idcd = req.body.idcd;
  var idch = req.body.idch;
  var radio = req.body.test;
  var idnv = req.session.idnv;
  var tencd = req.body.tencd;
  var socauhoi = req.body.socauhoi;
  var hoten = req.session.hoten;
  sessData = req.session;
  sessData.kt = 1;
  var obj = [];
  var t = [];
  var test1 = JSON.parse(radio);
  check = 1;

  
  for (var i = 0; i < req.body.choose.length; i++) {
    t.push({
      idch: idch[i],
      da: test1[i]["answer"]
    });
  }
  obj.push({
    idcd: idcd,
    idnv: idnv,
    data: t
  });

  if((obj[0].data)[0].idch.length == 1){
    obj = [];
    t=[];
    t.push({
     idch: idch,
     da: test1[0]["answer"]
   });
   obj.push({
     idcd: idcd,
     idnv: idnv,
     data: t
   });
 }
  console.log(JSON.stringify(obj));

  request({
    method: 'POST',
    url: url + 'TuLuyen',
    body: JSON.stringify(obj),
    json: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, (err, res1, body) => {
    
    console.log(res1.body);
    if (err) {
      console.log(err);
      res.redirect('/user/404');
    } else {
      if (res1.body[0].result == 'success') {
        console.log('ok');
        res.render('tuluyentap', { data: { 
          result: res1.body[0].result,
          dad: res1.body[0].message['dad'], 
          diem: res1.body[0].message['diem'],
          check : check,
          tencd: tencd,
          socauhoi: socauhoi,
          hoten: hoten
        } 
        });
      } else {
        console.log('error');
        res.redirect('/user/nganhangcauhoius');
      }
    }

  });
});
module.exports = router;