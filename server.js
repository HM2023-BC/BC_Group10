const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'app') });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});