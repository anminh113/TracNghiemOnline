var http = require('http');
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var config = require("config");
var url = config.url;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());


var nodemailer = require('nodemailer');


router.get('/', function (req, res) {
    if (req.session.email && req.session.quyen == 1) {
        res.render('feedback'
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
                    message: req.flash('message'),
                    json_datatb: url + "KyThiLoad?idnv=" + req.session.idnv
                }
            });

    } else {
        res.redirect('/login');
    }
});

router.post('/', urlencodedParser, function (req, res) {
    var email = req.session.email;
    var hoten = req.session.hoten;
    var noidung = req.body.noidung;
    var phongban = req.session.phongban;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tracnghiemmobifone@gmail.com',
            pass: 'tracnghiemmobifonecty9'
        }
    });
    var mainOptions = {
        from: 'tracnghiemmobifone@gmail.com',
        to: 'tracnghiemmobifone@gmail.com',
        subject: 'Gửi ý kiến',
        text: 'Phản hồi từ ' + email,
        html: '<p>Phản hồi </b><ul><li>Họ tên: ' + hoten + '</li><li style="color:red">Email: ' + email + '</li><li>Phòng ban: ' + phongban + '</li><li>Nội dung: ' + noidung + '</li></ul>'
    }
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log('loi');
            req.flash('message', '0');
            res.redirect('/user/feedback');
        } else {
            console.log(' thanhcong');
            req.flash('message', '1');
            res.redirect('/user/feedback');
        }
    });
});

module.exports = router;