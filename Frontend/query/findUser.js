var mysql = require("mysql");
var bcrypt = require("bcryptjs");
var pool = require("../db/index.js");

var isValidUser = (user, callback) => {
  console.log("User details:" + JSON.stringify(user));

  let queryString =
    "select * from xyz where username= " + mysql.escape(user.username);
  console.log(queryString);
  pool.getConnection((err, con) => {
    if (err) {
      console.log("Error occurred while creating a connection ", err);
    } else {
      con.query(queryString, (err, rows) => {
        if (err) {
          console.log("Error occurred while executing query ", err);
          return callback("Error occured", null);
        } else {
          console.log("Row Details: " + JSON.stringify(rows));
          if (rows[0] && rows[0].id) {
            console.log("expected password: " + rows[0].password);
            console.log("actual password: " + user.password);
            if (bcrypt.compareSync(user.password, rows[0].password)) {
              console.log("password matched");
              return callback(null, rows[0]);
            } else {
              console.log("password did not match");
              return callback("Password did not match", null);
            }
          }
        }
      });
    }
  });
};
exports.isValidUser = isValidUser;