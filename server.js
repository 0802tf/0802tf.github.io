import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
  const name = req.query.name;
  if (name) {
    res.json(`Hello World! ${name}`);
  } else {
    res.json('Hello World!');
  }
});
app.post('/', (req, res) => {
  const name = req.body.name;
  const data = req.body.data;
  res.json({ status: 'ok' });
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
