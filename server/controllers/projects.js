const db = require('../db/models/index');

// GET projects that belong to a particular userId
const getProjects = async function (req, res) {
  try {
    const projects = await db.projectuser.findAll({
      //TODO improve this query
      attributes: [],
      where: {
        userId: req.query.userId,
      },
      include: {
        model: db.project,
        required: true,
        attributes: ['id', 'name', 'description'],
      },
    });
    const processedProjects = projects.map((el) => el.projects[0]);

    res.status(200);
    res.send(processedProjects);
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error retrieving projects from the database' });
  }
};

const createProject = async function (req, res) {
  try {
    const newProject = await db.project.create({
      name: req.body.name,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // TODO: hande case where new Poject is created but join table entry is not...
    await db.projectuser.create({
      userId: req.body.userId,
      projectId: newProject.dataValues.id,
      authorization: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201);
    res.send(newProject);
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error creating project in database' });
  }
};

const getProjectUsers = async function (req, res) {
  try {
    const users = await db.projectuser.findAll({
      attributes: ['userId'],
      where: {
        projectId: req.query.projectId,
      }
    });
    const processedUsers = users.map((el) => el.userId);

    const userInfo = await db.user.findAll({
      where: {
        id: processedUsers,
      },
    })

    res.status(200);
    res.send(userInfo);
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error retrieving user related to a project from the database' });
  }
};


module.exports = {
  getProjects,
  createProject,
  getProjectUsers
};
