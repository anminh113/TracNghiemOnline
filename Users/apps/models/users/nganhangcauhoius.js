var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

var db = require("../../common/database");
var data = [];

router.get("/", function(req, res){
    data = [];
    db.doConnect(function(err, conn){
      conn.execute(
        "SELECT * FROM NH_CAUHOI",
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            if (result.rows.length > 0) {
              for (var i = 0; i < result.rows.length; i++) {
                data.push({
                  ID: (result.rows[i])[0],
                  CHUDE: (result.rows[i])[1],
                  SOCAU: (result.rows[i])[2]
                });
              }
            }
            res.render('nganhangcauhoi', {
              danhsach: {
                result: 'success',
                data: data
              }
            });
          }
        });
    });
});

function getTime() {
  var date = new Date();
  var dt = date.getDate() +''+ (date.getMonth()+1)+''+ date.getFullYear() + '' +date.getHours() + '' + date.getMinutes() +''+ date.getSeconds();
  dt.replace(/\s/g,'');
  return dt;
}

router.post("/", urlencodedParser, function(req, res){
  var ch = req.body.chude;
  var i ='CD';
  var id = i+getTime();

  db.doConnect(function (err, conn) {
      var sql = "Insert into NH_CAUHOI (ID_CD, CHUDE, SOCAU) VALUES (:ID_CD, :CHUDE, :SOCAU)";

      var binds = [
        [id, ch,0],
      ];

      var options = {
        autoCommit: true,
        batchErrors: true,
        bindDefs: [
          { type: oracledb.STRING, maxSize: 16 },
          { type: oracledb.STRING, maxSize: 150 },
          { type: oracledb.NUMBER}
        ]
      };
      conn.executeMany(sql, binds, options, function (err, result) {
        if (err)
          console.log(err);
        else {
          res.redirect("nganhangcauhoi");
        }
      });
    });
});


router.post("/sua",urlencodedParser, function(req, res){
  var id = req.body.idcd;
  var sch = req.body.cd;
  var sc = req.body.sc;

  db.doConnect(function (err, conn) {
    var sql = "UPDATE NH_CAUHOI SET CHUDE =:chude where ID_CD = :id";

    var binds = [
      [sch, id],
    ];

    var options = {
      autoCommit: true,
      batchErrors: true,
      bindDefs: [
        { type: oracledb.STRING, maxSize: 150 },
        { type: oracledb.STRING, maxSize: 16 }
      ]
    };

    conn.executeMany(sql, binds, options, function (err, result) {
      if (err)
        console.log(err);
      else {
        res.redirect('../nganhangcauhoi');
      }
    });
  });
});

router.get('/xoa/:id',function(req, res){
  var id = req.params.id;
  db.doConnect(function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    var sql = "Delete  FROM NH_CAUHOI WHERE ID_CD =:id";

    var binds = [
      [id],
    ];

    var options = {
      autoCommit: true,
      batchErrors: true,
      bindDefs: [
        { type: oracledb.STRING, maxSize: 16 }
      ]
    };

    connection.executeMany(sql, binds, options, function (err, result) {
      if (err)
        console.log(err);
      else {
        res.redirect('../../nganhangcauhoi');
      }
    });
  });
});
module.exports = router;
