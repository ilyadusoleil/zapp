const db = require('../db/models/index');

const getProjects = async function (req, res) {
  try {
    const projects = await db.projectuser.findAll({
      //TODO improve this query
      attributes: [],
      where: {
        userId: req.query.user_Id,
      },
      include: {
        model: db.project,
        required: true,
        attributes: ['id', 'name'],
      },
    });
    res.status(200);
    res.send(projects);
  } catch (err) {
    console.log('---> error retrieving projects from the database', err.stack);
    res.status(500);
    res.send({ err, message: 'error retrieving projects from the database' });
  }
};

const createProject = async function (req, res) {
  try {
    db.project
      .create({
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((newProject) => {
        db.projectuser.create({
          userId: req.body.user_Id,
          projectId: newProject.id,
          authorization: 'Owner',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      })
      .then(() => res.sendStatus(201));
  } catch (err) {
    console.log('---> error creating project in database', err.stack);
    res.status(500);
    res.send({ err, message: 'error creating project in database' });
  }
};

module.exports = {
  getProjects,
  createProject,
};
