const mysql = require('mysql2/promise');

const url = process.env.DATABASE_URI;

const pool = mysql.createPool(url);

module.exports = pool;
