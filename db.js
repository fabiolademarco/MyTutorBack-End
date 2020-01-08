const mysql = require('mysql2/promise');

let url = process.env.DATABASE_URI;

const dateStrings = '?dateStrings=true';

if (!url.includes(dateStrings)) {
  url = url.concat(dateStrings);
}

const pool = mysql.createPool(url);

module.exports = pool;
