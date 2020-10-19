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

const updateUserRecentProject = async function (req, res) {
  try {
    db.user
    .update(
      {
        recentProject: req.body.recentProject,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
    .then((user) => {
      res.status(200);
      res.send(user); //TODO: THis just returns [1] if sucessful, [0] if not
    });

  } catch (err) {
    res.status(500);
    res.send({
      err,
      message: 'error updating a users details from the database',
    });
  }
}

module.exports = {
  getUser,
  getUserByEmail,
  updateUserRecentProject
};
