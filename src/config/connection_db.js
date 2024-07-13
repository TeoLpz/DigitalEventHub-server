const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
  host: config.dbHost, 
  user: config.dbUser, 
  password: config.dbPassword, 
  database: config.dbName
});

module.exports = pool.promise();