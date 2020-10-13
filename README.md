# Zapp

## Easy to use issue tracking

Zapp is an app to manage issues during the software development lifecycle

![Node.js CI](https://github.com/ilyadusoleil/zapp/workflows/Node.js%20CI/badge.svg)

# Live Demo

TBC

## Features

## Project Presentation

## Getting Started

These instruction will help you setup a local development instance of the app.

Clone the repo: `git clone https://github.com/ilyadusoleil/zapp.git`

Install dependencies: `npm install`

### Server & Database Setup

- Install server dependencies: 
  `cd server`
  `npm install`

- Make sure you have Postgres installed on your local machine

- Create database config file - in the command line run: `npx sequelize-cli init`

- This will generate a config file: `/server/config/database.js`

- Copy the following code into your newly generated config file:

  ```javascript
  require('dotenv').config();
  
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
  ```

- Create a `.env` file in the server directory (`/server/.env`) and fill it following the example `/server/.env.example`

- Initialise the database - in the command line run: `npx sequelize-cli db:migrate` 

- The server is now ready to run. If you wish, you can seed the database with users by running the command `npx sequelize-cli db:seed:all`. You can edit the users by navigating to `/server/seeders/20201010145912-demo-user.js` and filling in your own data.

- For more information on **Sequelize** migrations read the docs [here](https://sequelize.org/master/manual/migrations.html)

### Setup prerequisites

For an example how to fill `/server/.env` see `/server/.env.example`

For an example how to fill `/client/.env.local` see `/client/.env.local.example`


