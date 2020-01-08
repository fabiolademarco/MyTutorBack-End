const mysql = require('mysql2/promise');

const url = process.env.DATABASE_URI;

const dateStrings = '?dateStrings=true';

if (!url.includes(dateStrings)) {
  url.concat(url, dateStrings);
}
const pool = mysql.createPool(url);

module.exports = pool;
