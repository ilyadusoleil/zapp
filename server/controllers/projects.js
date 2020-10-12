const db = require('../db/models/index');

const getProjects = async function (req, res) {
  try {
    const projects = await db.projectusers.findAll({
      attributes: [],
      where: {
        userId: req.query.user_id,
      },
      include: {
        model: db.projects,
        required: true,
        attributes: ['projectId', 'name'],
      },
    });
    console.log(projects);
    res.staus(200);
    res.send(projects);
  } catch (err) {
    console.log('---> error retrieving projects from the database', err.stack);
    res.status(500);
    res.send({ err, message: 'error retrieving projects from the database' });
  }
};

const createProject = async function (req, res) {
  try {
    db.projects
      .create({
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .then((newProject) => {
        db.projectusers.create({
          userId: req.body.user_id,
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
