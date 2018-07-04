var http = require('http');
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require("body-parser");
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.get('/', function(req, res) {
    if (req.session.email && req.session.quyen == 1 ){
      res.render('kqckthius-chitiet'
      , {
        data: {
        json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
        email: req.session.email,
        id:req.session.id,
        hoten:req.session.hoten
        }
      });
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;