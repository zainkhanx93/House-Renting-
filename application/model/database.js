const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1029384756Mm!",
  database: "mydb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection(err => {
  if (err) throw err;
  console.log("My database is connected!");
});

module.exports = pool;
