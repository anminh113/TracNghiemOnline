var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());


router.get('/', function(req, res) {
    if (req.session.email && req.session.quyen == 1 ){
      res.render('profileus'
      , {
        data: {
          email: req.session.email,
          idtk: req.session.idtk,
          hoten: req.session.hoten,
          ngaysinh: req.session.ngaysinh,
          phongban: req.session.phongban,
          sdt: req.session.sdt,
          chucvu: req.session.chucvu,
          pass: req.session.pass,
          json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv
        }
      });

    } else {
      res.redirect('/login');
    }
  });

module.exports = router;