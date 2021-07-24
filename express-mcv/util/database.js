const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  port: 5100,
  user: "root",
  database: "inventory",
  password:"1234"
});

module.exports = pool.promise();