const mysql = require('mysql2/promise');

const url = process.env.CLEARDB_DATABASE_URL;

const pool = mysql.createPool(url);

module.exports = pool;
