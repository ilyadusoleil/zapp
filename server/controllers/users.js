const db = require('../db/models/index');

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
};

const getUserByEmail = async function (req, res) {
  try {
    const user = await db.user.findOne({
      where: {
        email: req.query.email,
      },
    });
    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(500);
    res.send({
      err,
      message: 'error retrieving a users details from the database',
    });
  }
};

module.exports = {
  getUser,
  getUserByEmail,
};
