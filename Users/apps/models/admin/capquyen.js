var express = require('express');
var router = express.Router();
var http = require('http');
var flash = require('express-flash');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});

router.use(bodyParser.json());

var url = config.url;

router.get('/', function(req, res) {
  if (req.session.email && req.session.quyen == 0) {
    res.render('capquyen', {
      data: {
        json_data: url+'CapQuyen',
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

// post json data server
router.post('/', urlencodedParser, function(req, res) {
  var quyen = req.body.quyen;
  var idnv = req.body.idnv;
  var text = [{
    "idnv": idnv,
    "quyen": quyen
  }];
  var values = text[0];
  // console.log(text);
  request({
    method: 'PUT',
    url: url+'CapQuyen',
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
        res.redirect('/admin/capquyen');
      }else{
        console.log('eo ok');
        res.redirect('/admin/capquyen');
      }

    }
  });
});


module.exports = router;
