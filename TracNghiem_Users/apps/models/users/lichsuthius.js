var http = require('http');
var request = require('request');
var config = require("config");
var url = config.url;
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.get('/', function (req, res) {
    var data={};
    if (req.session.email && req.session.quyen == 1) {
      res.render('lichsuthius'
        , {
          data: {
            json_data: url + "LSThiUser?idnv=" + req.session.idnv,
            json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv,
            email: req.session.email,
            idtk: req.session.idtk,
            hoten: req.session.hoten,
            idnv: req.session.idnv
          }
        });
    } else {
      res.redirect('/login');
    }
  });

module.exports = router;