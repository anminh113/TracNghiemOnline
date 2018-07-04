var express = require('express');

var router = express.Router();

router.use("/user/404", require(__dirname + "/404"));
router.use("/user/vp", require(__dirname + "/vp"));

router.use("/user/profileus", require(__dirname + "/profileus"));
router.use("/user/feedback", require(__dirname + "/feedback"));

router.use("/user/taochudethius", require(__dirname + "/taochudethius"));
router.use("/user/taochudethius-themcauhoi", require(__dirname + "/taochudethius-themcauhoi"));
router.use("/user/taochudethius-chitiet", require(__dirname + "/taochudethius-chitiet"));

router.use("/user/nganhangcauhoius", require(__dirname + "/nganhangcauhoius"));

router.use("/user/start-tuluyentap", require(__dirname + "/start-tuluyentap"));
router.use("/user/tuluyentap", require(__dirname + "/tuluyentap"));

router.use("/user/kythius", require(__dirname + "/kythius"));
router.use("/user/start-vaothi", require(__dirname + "/start-vaothi"));
router.use("/user/thi", require(__dirname + "/thi"));

router.use("/user/lichsuthius", require(__dirname + "/lichsuthius"));

router.use("/user/kqckthius", require(__dirname + "/kqckthius"));
router.use("/user/kqckthius-chitiet", require(__dirname + "/kqckthius-chitiet"));


var config = require("config");
var url = config.url;

router.get('/user/home', function(req, res) {
    if (req.session.email && req.session.quyen == 1){
      res.render('home'
      , {
        data: {
          email: req.session.email,
          idtk: req.session.idtk,
          hoten: req.session.hoten,
          diachi: req.session.diachi,
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

  router.get('/user/home2', function(req, res) {
    if (req.session.email && req.session.quyen == 1){
      res.render('home2'
      , {
        data: {
          email: req.session.email,
          idtk: req.session.idtk,
          hoten: req.session.hoten,
          diachi: req.session.diachi,
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