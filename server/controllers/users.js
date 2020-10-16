const db = require('../db/models/index');

// const createUser = async function (req, res) {
//   try {
//   } catch (err) {
//     res.status(500);
//     res.send({ err, message: 'error creating user in the database' });
//   }
// };

// const updateUser = async function (req, res) {
//   try {
//   } catch (err) {
//     res.status(500);
//     res.send({ err, message: 'error updating user in the database' });
//   }
// };

const getUser = async function (req, res) {
  try {
    const details = await db.user.findOne({
      where: {
        id: req.query.userId,
      },
    });
    // details.dataValues.comments = req.body.comments;
    res.status(200);
    res.send(details);
  } catch (err) {
    res.status(500);
    res.send({
      err,
      message: 'error retrieving a users details from the database',
    });
  }
}

module.exports = {
  getUser
}