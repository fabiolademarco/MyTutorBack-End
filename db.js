const mysql = require('mysql2');

const config = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
};

const pool = mysql.createPool(config);

module.exports = pool;
