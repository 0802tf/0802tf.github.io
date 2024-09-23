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
  }
});
app.use(express.json());
app.get('/', (req, res) => {
  const name = req.query.name;
  const sql = name ? `select data from filelist where name = "${name}";` : 'select name from filelist;';
  connection.query(sql, (error, results) => res.json(error ? error : results));
});
app.post('/', (req, res) => {
  const name = req.body.name;
  const data = req.body.data;
  const sql = `insert into filelist values("${name}", "${data}");`;
  connection.query(sql, (error, results) => res.json(error ? error : results));
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
