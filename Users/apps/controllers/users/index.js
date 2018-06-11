var express = require('express');

var router = express.Router();

router.use("/user/nganhangcauhoius", require(__dirname + "/nganhangcauhoius"));

router.get("/user/home", function(req, res){

    res.render('home')

});
// router.get("/", function(req, res){
//     // res.json({"message": "This is home page"});
//     res.redirect('/user/home');
// });

router.get("/user", function(req, res){
    // res.json({"message": "This is home page"});
    res.redirect('/user/home');
});
router.get("/user/home-2", function(req, res){
    // res.json({"message": "This is home page"});
    res.render('home2');
});

module.exports = router;
