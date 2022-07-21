const express = require("express");
const mysql = require("mysql2");

const app = express();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "brad",
  password: "123456",
  database: "acme",
  port: 3306,
});

db.connect();
app.get("/users", (req, res) => {
  const sql = `SELECT first_name, last_name, email FROM users ORDER BY last_name`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

