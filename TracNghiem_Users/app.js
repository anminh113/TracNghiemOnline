var http = require('http');
var config = require("config");
var bodyParser = require("body-parser");
var express = require("express");
var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser('secret'));

app.use(session({
      secret: 'somerandonstuffs'
}));

app.use(flash());

app.use("/", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/public/users"));

//bodyParser
app.use(bodyParser.json());

app.set('views', [
  __dirname + "/apps/views/admin/pages/",
  __dirname + "/apps/views/users/pages/",
  __dirname + "/apps/views/"
]);
app.set("view engine", "ejs");

var controllers = require(__dirname + "/apps/controllers/users");
app.use(controllers);

var controllersadmin = require(__dirname + "/apps/controllers/admin");
app.use(controllersadmin);

var controllerslogin = require(__dirname + "/apps/controllers/login");
app.use(controllerslogin);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port,host, function(){
    console.log("Server is runing on port", host, port );
});
