// comment for testing
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql_db',
  user: 'user',
  password: 'password',
  database: 'app_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`, err => {
  if (err) throw err;
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  db.query('INSERT INTO users (name) SET ?', { name }, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name });
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});