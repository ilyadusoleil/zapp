const express = require('express');
const router = require('./routes');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // TODO add store
  })
);
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:1234', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
