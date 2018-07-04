var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var request = require('request');
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.use(bodyParser.json());

router.get('/', function (req, res) {
  var data={};
  if (req.session.email && req.session.quyen == 1) {
    res.render('nganhangcauhoius'
      , {
        data: {
          message: req.flash('success'),
          message_delete: req.flash('delete'),
          message_update: req.flash('update'),
          json_data: url + "NganHangCauHoi?idnv=" + req.session.idnv+'%26quyen=1',
          json_data_modal: url + 'LoadCauHoiModal',
          email: req.session.email,
          idtk: req.session.idtk,
          hoten: req.session.hoten,
          idnv: req.session.idnv,
          json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv
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
    url: url + 'NganHangCauHoi',
    body: values,
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    if(err){
      console.log(err);
      res.redirect('/user/404');
    }else{
      
      if(res1.body[0].result == 'success'){
        console.log(res1.body[0]);
        req.flash('success', '0');
        res.redirect('nganhangcauhoius');
      }else if(res1.body[0].result == 'failure'){
        console.log(res1.body[0]);
        req.flash('success', '1');
        res.redirect('nganhangcauhoius');
      }

    }
  });
});

// router.get('/xoa/:idch', function (req, res) {
//   var idch = req.params.idch;
//   var link = url + "NganHangCauHoi/"
//   request({
//     method: 'DELETE',
//     url: link + idch,
//     headers: {
//       'User-Agent': 'request'
//     }
//   }, (err, res1, body) => {
//     console.log(res1.body[1].result);
//     if (err) {
//       console.log(err);

//     } else {
//       res.redirect('/user/nganhangcauhoius');
//     }
//   });
// });


// update
router.post('/capnhat', urlencodedParser, function(req, res) {
  var inputValue = req.body.update;
  if (inputValue == "delete") {
    var idch = req.body.idch;
    var link = url + "NganHangCauHoi/"+idch+"";
    console.log(link);
    request({
      method: 'DELETE',
      url: link,
      headers: {
        'User-Agent': 'request'
      }
    }, (err, res1, body) => {
      if (err) {
        console.log(err);
        res.redirect('/user/404');
      } else {
        var ktxoa = JSON.parse(body);

        console.log(ktxoa[0]);
        if (ktxoa[0].result == 'success') {
          console.log('ok');
          req.flash('delete', '0');
          res.redirect('/user/nganhangcauhoius');
        } else {
          console.log('error');
          req.flash('delete', '1');
          res.redirect('/user/nganhangcauhoius');
        }
      }
    });
  };
  if (inputValue == "update") {
    var cauhoi = req.body.cauhoi;
    var nda = req.body.nda;
    var ndb = req.body.ndb;
    var ndc = req.body.ndc;
    var ndd = req.body.ndd;
    var da = req.body.dapandung;
    var idch = req.body.idch;
    var text = [{
      "ndch": cauhoi,
      "idch": idch,
      "nda": nda,
      "ndb": ndb,
      "ndc": ndc,
      "ndd": ndd,
      "da": da,
    }];
    var values = text[0];
    console.log(values);
    request({
      method: 'PUT',
      url: url + 'NganHangCauHoi',
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
          console.log('ok');
          req.flash('update', '0');
          res.redirect('/user/nganhangcauhoius');
        } else {
          console.log('error');
          req.flash('update', '1');
          res.redirect('/user/nganhangcauhoius');
        }
      }
      
    });
  };
});
module.exports = router;