var config = require('config');
var request = require('request');

var doConnect = function(cb) {
    oracledb.getConnection(
      {
        user          : config.get('oracledb.user'),
        password      : config.get('oracledb.password'),
        connectString : config.get('oracledb.connectString')
      },
      cb);
  };


  var doRelease= function(connection) {
    connection.close(
      function(err) {
        if (err)
          console.error(err.message);
      });
  };


  module.exports = {
    doConnect : doConnect,
    doRelease : doRelease

  }
