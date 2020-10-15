const db = require('../db/models/index');

const createUser = async function (req, res) {
  try {
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error creating user in the database' });
  }
};

const updateUser = async function (req, res) {
  try {
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error updating user in the database' });
  }
};
