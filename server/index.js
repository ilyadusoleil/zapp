const express = require('express');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

require('./config/passport')(passport);

const env = process.env.NODE_ENV || 'development';

var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSsl);
}

// create database, ensure 'sqlite3' in your package.json
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './session.sqlite',
});

var myStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: myStore,
    resave: false,
    proxy: true,
    // saveUninitialized: false,
  })
);

myStore.sync();

app.use(express.json());

if (env === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT, // allow to server to accept request from different origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // allow session cookie from browser to pass through
    })
  );
}

if (env === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening 👂 on at port ${PORT}`);
});
