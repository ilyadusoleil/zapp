require('dotenv').config();

// TODO add options to specify database port and reflect that in the docs

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'zapp_development',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'zapp_test',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'zapp',
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
