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

var check = 0;

router.get('/', function (req, res) {
  if (req.session.email && req.session.quyen == 1) {
    res.render('thi'
      , {
        data: {
          json_data: req.flash('json_data'),
          tg: req.flash('tg'),
          idcd: req.flash('idcd'),
          tenkt: req.flash('tenkt'),
          idkt: req.flash('idkt'),
          socauhoi: req.flash('socauhoi'),
          hoten: req.flash('hoten'),
          check: 0
        }
      });

  } else {
    res.redirect('/login');
  }
});

var rf = 0;
router.post('/', urlencodedParser, function (req, res) {
  var tg = req.body.tg;
  var idcd = req.body.idcd;
  var tenkt = req.body.tenkt;
  var idkt = req.body.idkt;
  var socauhoi = req.body.socauhoi;
  var hoten = req.session.hoten;

  var ktthi = req.session.ktthi;
  if (ktthi == 0) {
    rf == ktthi;
  } if (ktthi == 1) {
    rf = 0;
    sessData = req.session;
    sessData.ktthi = 0;
  }

  var idnv = req.session.idnv;
  var text = [{
    "idkt": idkt,
    "idnv": idnv,
    "tgthi": tg,
  }];
  var values = text[0];
  request({
    method: 'POST',
    url: url + 'KyThiLoad',
    body: values,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    if (err) {
      console.log(err);
      res.redirect('/user/404');
    } else {
      if (res1.body[0].result == 'success') {
        req.flash('json_data', url + 'Thi?idcd=' + idcd);
        req.flash('tg', tg);
        req.flash('idcd', idcd);
        req.flash('tenkt', tenkt);
        req.flash('idkt', idkt);
        req.flash('socauhoi', socauhoi);
        req.flash('hoten', hoten);

  
          res.render('thi', {
            data: {
              json_data: url + 'Thi?idcd=' + idcd,
              tg: tg,
              idcd: idcd,
              tenkt: tenkt,
              idkt: idkt,
              socauhoi: socauhoi,
              hoten: hoten,
              check: 0
            }
          });

      } else if (res1.body[0].result == 'failure') {
        res.redirect('/user/vp');
        console.log(res1.body);
      }

    }
  });


});



router.post('/ktthi', urlencodedParser, function (req, res) {
  var inputValue = req.body.capnhat;

  if (inputValue == "nopbai") {

    // post nop bai
    var idcd = req.body.idcd;
    var idkt = req.body.idkt;

    var tenkt = req.body.tenkt;
    var socauhoi = req.body.socauhoi;
    // var tg = req.body.tg;

    var tght = req.body.tght.length;
    var tghtlb = tght.toString();
    var hoten = req.session.hoten;

    var idch = req.body.idch;
    var radio = req.body.test;
    var idnv = req.session.idnv;
    sessData = req.session;
    sessData.ktthi = 1;
    var obj = [];
    var t = [];

    var test1 = JSON.parse(radio);
    console.log(radio);
    check = 1;

    for (var i = 0; i < req.body.choose.length; i++) {
      t.push({
        idch: idch[i],
        da: test1[i]["answer"]
      });
    }
    // var a = JSON.stringify(t);
    obj.push({
      idcd: idcd,
      idnv: idnv,
      data: t,
      idkt: idkt,
      tght: tghtlb
    });


    if ((obj[0].data)[0].idch.length == 1) {
      obj = [];
      t = [];
      t.push({
        idch: idch,
        da: test1[0]["answer"]
      });

      obj.push({
        idcd: idcd,
        idnv: idnv,
        data: t,
        idkt: idkt,
        tght: tghtlb
      });
    }

    console.log(obj);
    request({
      method: 'POST',
      url: url + 'KyThiChamDiem',
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
          res.render('thi', {
            data: {
              result: res1.body[0].result,
              dad: res1.body[0].message['dad'],
              diem: res1.body[0].message['diem'],
              check: check,
              tenkt: tenkt,
              socauhoi: socauhoi,
              hoten: hoten
            }
          });
          // res.redirect('/user/nganhangcauhoius');
        } else if (res1.body[0].result == 'failure') {
          console.log('error');
          // res.redirect('/user/kythius');
          res.render('thi', {
            data: {
              result: res1.body[0].result,
              check: check,
              tenkt: tenkt,
              socauhoi: socauhoi,
              hoten: hoten
            }
          });

        }
      }

    });
    // end post nop bai

  }
  if (inputValue == "luubai") {
    console.log('luubai');
    var idcd = req.body.idcd;
    var idkt = req.body.idkt;
    var tg = req.body.tg;
    var hoten = req.session.hoten;
    var tght = req.body.tght.length;
    var idch = req.body.idch;
    var radio = req.body.test;
    var idnv = req.session.idnv;
    var obj = [];
    var t = [];

    var tghtlb = tght.toString();
    var test1 = JSON.parse(radio);
    check = 1;

    for (var i = 0; i < req.body.choose.length; i++) {
      t.push({
        idch: idch[i],
        da: test1[i]["answer"],
      });
    }
    obj.push({
      idcd: idcd,
      idnv: idnv,
      data: t
    });

    var abj = [{
      "idnv": idnv,
      "idkt": idkt,
      "tght": tghtlb,
      "ql": JSON.stringify(obj)
    }];




    // if ((obj[0].data)[0].idch.length == 1) {
    //   obj = [];
    //   t = [];
    //   t.push({
    //     idch: idch,
    //     da: test1[0]["answer"]
    //   });
    //   // obj.push({
    //   //   idcd: idcd,
    //   //   idnv: idnv,
    //   //   data: t,
    //   //   idkt: idkt,
    //   //   tght: tght
    //   // });
    //   abj.push({
    //     idnv: idnv,
    //     idkt:idkt,
    //     tght:tghtlb,
    //     ql: obj
    //   });
    // }

    console.log(abj[0]);
    request({
      method: 'POST',
      url: url + 'KyThiLoad',
      body: abj[0],
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
          console.log(res1.body);
          req.flash('link', '')
          res.redirect('back');
        } else {
          console.log('error');
        }
      }
    });


  }
});
module.exports = router;
