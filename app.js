
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',a
  database: 'zen_cmd'
});

conn.connect();

var query = [];

conn.query('SELECT * FROM users', function (err, rows, fields) {
  if (err) throw err

  query = rows;
});

conn.end();

app.set('views', __dirname);

app.get('/', (req, res) => {
    res.json({data:'Main page', page:'index'});
});
app.get('/api/data/', (req, res) => {
    res.json({data: JSON.stringify(query), page:'DATA'});
});
app.get('/api/:data', (req, res) => {
    res.json({data: req.params.data, page:'DATA'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));