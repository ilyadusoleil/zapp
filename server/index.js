const express = require('express');
const router = require('./routes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
