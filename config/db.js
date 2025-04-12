const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true
});

// Optional test to confirm connection immediately
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL pool connection error:', err.message);
  } else {
    console.log('✅ MySQL pool connected successfully!');
    connection.release(); // Important: release connection back to pool
  }
});

module.exports = pool;
