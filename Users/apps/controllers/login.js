var express = require('express');

var router = express.Router();


router.use("/", require("../models/login"));

router.get("/login", function(req, res){
    // res.json({"message": "This is home page"});
    res.render('login');
});

router.get("/", function(req, res){
    // res.json({"message": "This is home page"});
    res.redirect('login');
});




module.exports = router;
