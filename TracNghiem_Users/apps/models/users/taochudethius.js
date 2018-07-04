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
    res.render('taochudethius'
      , {
        data: {
          message: req.flash('success'),
          message_delete: req.flash('delete'),
          message_addchcd: req.flash('success_addchcd'),
          message_addchcd_err: req.flash('err'),
          message_delchcd: req.flash('success_delchcd'),
          message_delchcd_err: req.flash('delerr'),
          json_data: url + "ChuDe?idnv=" + req.session.idnv + '%26quyen=1',
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

router.post('/', urlencodedParser, function (req, res) {
  var chude = req.body.chude;
  var idnv = req.session.idnv;
  var text = [{
    "tencd": chude,
    "idnv": idnv
  }];
  var values = text[0];
  request({
    method: 'POST',
    url: url + 'ChuDe',
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
        res.redirect('taochudethius');
      }else if(res1.body[0].result == 'failure'){
        console.log(res1.body[0]);
        req.flash('success', '1');
        res.redirect('taochudethius');
      }

    }
  });
});

router.get('/xoa/:idcd', function (req, res) {
  var idcd = req.params.idcd;
  var link = url + "ChuDe/"
  request({
    method: 'DELETE',
    url: link + idcd,
    headers: {
      'User-Agent': 'request'
    }
  }, (err, res1, body) => {
    console.log(JSON.parse(res1.body)[0].result);
    if (err) {
      console.log(err);
      res.redirect('/user/404');
    } else {
      if(JSON.parse(res1.body)[0].result == 'success'){
        req.flash('delete', '0');
        res.redirect('/user/taochudethius');
      }else if(JSON.parse(res1.body)[0].result == 'failure'){
        req.flash('delete', '1');
      res.redirect('/user/taochudethius');
      }
    }
  });
});


router.post('/taochudethi-themcauhoi', urlencodedParser, function (req, res) {
  var idcd = req.body.idcd;
  var idnv = req.session.idnv;
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
        res.render('taochudethius-themcauhoi', {
          data: {
            json_data: url + 'LoadCauHoi?idcd=' + idcd + '%26quyen=1' + '%26idnv='+ idnv,
            json_data_modal: url + 'LoadCauHoiModal',
            json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
            tencd: json.tencd,
            idcd: json.idcd,
            idnv: idnv,
            hoten: req.session.hoten,
            email: req.session.email
          }
        });

      } else {
        res.redirect('/login');
      }
    }
  })


});


router.post('/taochudethi-chitiet', urlencodedParser, function (req, res) {
  var idcd = req.body.idcd;
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
        res.render('taochudethius-chitiet', {
          data: {
            json_data: url + 'LoadCauHoi?idcd=' + idcd,
            json_data_modal: url + 'LoadCauHoiModal',
            json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
            tencd: json.tencd,
            idcd: json.idcd,
            hoten: req.session.hoten,
            email: req.session.email
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  })

});

router.post('/start-tuluyentap', urlencodedParser, function (req, res) {
  var idcd = req.body.idcd;
  var tencd = req.body.tencd;
  var socauhoi = req.body.socauhoi;
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
        res.render('start-tuluyentap', {
          data: {
            json_data: url + 'LoadCauHoi?idcd=' + idcd,
            json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
            socauhoi: json.socauhoi,
            tencd: json.tencd,
            idcd: json.idcd,
            hoten: req.session.hoten,
            email: req.session.email,
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  })

});

// });

module.exports = router;