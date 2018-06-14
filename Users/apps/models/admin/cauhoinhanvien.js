var express = require('express');
var session = require('express-session');
var config = require('config');
var request = require('request');
var querystring = require('querystring');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.use(bodyParser.json());
var url = config.url;


router.get('/',function(req,res){
  if (req.session.email &&  req.session.quyen == 0){
    res.render('cauhoinhanvien', {
      data: {
        json_data:url+'NganHangCauHoi',
        json_data_nhanvien:url+'NhanVien?quyen=1',
        json_data_cauhoi_nhanvien:url+'NhanVien?quyen=1',
        json_data_modal:url+'LoadCauHoiModal',
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


module.exports = router;
