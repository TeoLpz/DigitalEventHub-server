const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  password: 'root', 
  database: 'bgivundzrylpnlvsapmh'
});

module.exports = pool.promise();