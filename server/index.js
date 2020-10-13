const express = require('express');
const router = require('./routes');

const json = express.json();

const app = express();

const PORT = 3000;

app.use(json());
app.use('/', router);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
