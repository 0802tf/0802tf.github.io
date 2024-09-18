import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '0000',
  database: 'mysql'
});
connection.connect(error => {
  if (error) {
    console.log(error.stack);
    return;
  }
});
app.use(express.json());
app.get('/', (req, res) => {
  const name = req.query.name;
  let sql = '';
  if (name) {
    sql = `select data from filelist where name = "${name}";`;
  } else {
    sql = 'select name from filelist;'
  }
  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(results);
  });
});
app.post('/', (req, res) => {
  const name = req.body.name;
  const data = req.body.data;
  connection.query(`insert into filelist values("${name}", "${data}");`, (error, results) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(results);
  });
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
