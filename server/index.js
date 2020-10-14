const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:1234', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
