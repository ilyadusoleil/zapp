# Zapp

## Easy to use issue tracking

Zapp is an app for managing issues in the software development lifecycle. Zapp is designed with small teams in mind and aims to make issue tracking simple and straightforward.

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
- Make sure you have Docker installed on your local machine.
- Create a `.env` file in the server directory (`/server/.env`) and fill it following the example `/server/.env.example`
- Create docker image: `docker-compose up -d`
- Initialise the database: `npx sequelize-cli db:migrate`

- The server is now ready to run. If you wish, you can seed the database with some test data by running the command `npx sequelize-cli db:seed:all`. You can change the seed or add your own data by navigating to `/server/db/seeders/` and filling in your own data.

- You can also use [Postman](https://www.postman.com/) to send requests to the server without using the client. Use this link inside the postman client to import a small library of requests: https://www.getpostman.com/collections/a578db24de24499a361d

- For more information on **Sequelize** migrations read the docs [here.](https://sequelize.org/master/manual/migrations.html)

### Setup prerequisites

For an example how to fill `/server/.env` see `/server/.env.example`

For an example how to fill `/client/.env.local` see `/client/.env.local.example`
