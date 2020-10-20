const express = require('express');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

require('./config/passport')(passport);

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

app.use(
  cors({
    origin: process.env.CLIENT, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
