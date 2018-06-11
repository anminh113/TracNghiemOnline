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

router.get('/',function(req,res){
  if (req.session.email &&  req.session.quyen == 0){
  // Set the headers
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  // Configure the request
  var options = {
    url: url+'NhanVien?id=' + req.session.email + '',
    method: 'GET',
    headers: headers,
    qs: {
      'key1': 'xxx',
      'key2': 'yyy'
    }
  }
  request(options, function(error, res1, body){
    if(res1.body.length ==0){
      res.redirect('/login');
    }else if (!error || res1.statusCode == 200) {
      var json = JSON.parse(body);
    }
      console.log(json.pass);
        res.render('profile', {
          data: {
            pass: json.pass,
            email: req.session.email,
            id:req.session.idnv,
            ten:req.session.hoten,
            phongban:req.session.phongban,
            ngaysinh:req.session.ngaysinh,
            chuvu:req.session.chucvu,
            sdt:req.session.sdt
          }
        });
  })
} else {
  res.redirect('/login');
}
});


// post json data server
router.post('/', urlencodedParser, function(req, res) {
  var idnv = req.session.idnv;
  var pass_new1 = req.body.pass_new1;
  var text = [{
    "idnv": idnv,
    "pass": pass_new1
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
      console.log(err);
    }else{
      if(res1.body[0].result == 'success'){
        console.log('ok');
        res.redirect('/admin/profile');
      }else if(res1.body[0].result == 'failuer'){
        console.log('eo ok');
        res.redirect('/admin/profile');
      }
    }
  });
});


module.exports = router;
