import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const name = req.query.name;
  if (name) {
    res.send(`Hello World! ${name}`);
  } else {
    res.send('Hello World!');
  }
});
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
