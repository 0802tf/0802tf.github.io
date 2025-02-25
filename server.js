import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
  const name = req.query.name;
  fs.readFile(`./data/${name}`, 'utf8', (err, data) => {
    if (err) {
      res.json(err);
    } else {
      const encodedData = encodeBase64Url(data);
      res.json({ 'data': encodedData });
    }
  });
});
app.post('/', (req, res) => {
  const name = req.body.name;
  const data = req.body.data;
  const decodedData = decodeBase64Url(data);
  fs.writeFile(`./data/${name}`, decodedData, 'utf8', err => res.json(err ? err : { 'status': 'ok' }));
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

function encodeBase64(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value) {
  return decodeURIComponent(escape(atob(value)));
}

function encodeBase64Url(value) {
  return encodeBase64(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return decodeBase64(base64);
}
