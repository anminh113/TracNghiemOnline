var http = require('http');
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require("body-parser");
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.get('/', function (req, res) {
  if (req.session.email && req.session.quyen == 1) {
    res.render('taochudethius-themcauhoi'
      , {
        data: {
          email: req.session.email,
          id: req.session.id,
          hoten: req.session.hoten
        }
      });
  } else {
    res.redirect('/login');
  }
});

// router.post('/', urlencodedParser, function (req, res) {
//   var chude = req.body.chude;
//   var idnv = req.session.idnv;
//   var text = [{
//     "tencd": chude,
//     "idnv": idnv
//   }];
//   var values = text[0];
//   request({
//     method: 'POST',
//     url: url + 'ChuDe',
//     body: values,
//     json: true,
//     headers: {
//       'User-Agent': 'request'
//     }
//   }, (err, res1, body) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/user/taochudethius');
//     }
//   });
// });

router.post('/', urlencodedParser, function (req, res) {
  var idcd = req.body.idcd;
  var idch = req.body.idch;
  var obj = [];
  if (idch != null) {

    for (var i = 0; i < idch.length; i++) {
      obj.push({
        idcd: idcd,
        idch: idch[i]
      });
    }
    if (obj[0]["idch"].length == 1) {
      obj = [];
      obj.push({
        idcd: idcd,
        idch: idch
      });
    }
    request({
      method: 'POST',
      url: url + 'QuanLyCauHoi',
      body: JSON.stringify(obj),
      json: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }, (err, res1, body) => {
      if (err) {
        console.log(err);
        res.redirect('/user/404');
      } else {
        if (res1.body[0].result == 'success') {
          console.log(res1.body[0]);
          req.flash('success_addchcd', '0');
          res.redirect('taochudethius');
        } else if (res1.body[0].result == 'failure') {
          console.log(res1.body[0]);
          req.flash('success_addchcd', '1');
          res.redirect('taochudethius');
        }

      }
    });

  }else{
    req.flash('err', '0');
    res.redirect('taochudethius');
  }

});
module.exports = router;