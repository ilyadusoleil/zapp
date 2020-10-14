const db = require('../db/models/index');

const getBugs = async function (req, res) {
  try {
    const bugs = await db.bug.findAll({
      where: {
        projectId: req.query.project_Id,
      },
    });
    res.status(200);
    res.send(bugs);
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error retrieving bugs from the database' });
  }
};

const createBug = async function (req, res) {
  try {
    db.bug
      .create({
        title: req.body.title,
        description: req.body.description,
        state: 0,
        priority: req.body.priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectId: req.body.project_Id,
        userId: req.body.user_Id,
      })
      .then((newBug) => {
        res.status(201);
        res.send(newBug);
      });
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error creating new bug in database' });
  }
};

const editBug = async function (req, res) {
  try {
    db.bug
      .update(
        {
          title: req.body.title,
          description: req.body.description,
          state: req.body.state,
          priority: req.body.priority,
          createdAt: req.body.created_At,
          updatedAt: new Date(),
          projectId: req.body.project_Id,
          userId: req.body.user_Id,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      .then((updatedBug) => {
        res.status(200);
        res.send(updatedBug);
      });
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error editing bug in database' });
  }
};

module.exports = {
  getBugs,
  createBug,
  editBug,
};
