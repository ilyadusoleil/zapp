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
    const { name, description, userId, projectUsers } = req.body;
    const newProject = await db.project.create({
      name: name,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // TODO: hande case where new Poject is created but join table entry is not...
    //Assign creator of project as owner
    await db.projectuser.create({
      userId: userId,
      projectId: newProject.dataValues.id,
      authorization: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //If any users have been invited to this project
    if (projectUsers.length > 0) {
      for (let i = 0; i < projectUsers.length; i++) {
        let user = null;
        if (typeof projectUsers[i] === 'number') {
          //user already exists in db
          user = await db.user.findOne({
            where: {
              id: projectUsers[i],
            },
          });
        } else if (typeof projectUsers[i] === 'string') {
          //user doesn't exist in db yet
          user = await db.user.create({
            email: projectUsers[i],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          //TODO throw error
        }
        await db.projectuser.create({
          //assign user to project
          userId: user.id,
          projectId: newProject.dataValues.id,
          authorization: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    res.status(201);
    res.send(newProject);
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error creating project in database' });
  }
};

const editProject = async function (req, res) {
  try {
    const { projectUsers } = req.body;
    const updatedProject = await db.project.update(
      {
        name: req.body.name,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: new Date(),
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    // If any users have been invited to this project
    if (projectUsers.length > 0) {
      for (let i = 0; i < projectUsers.length; i++) {
        let user = null;
        if (typeof projectUsers[i] === 'number') {
          //user already exists in db
          user = await db.user.findOne({
            where: {
              id: projectUsers[i],
            },
          });
        } else if (typeof projectUsers[i] === 'string') {
          //user doesn't exist in db yet
          user = await db.user.create({
            email: projectUsers[i],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          //TODO throw error
        }
        // Check if the user is already on the project
        let userOnProject = await db.projectUser.findOne({
          where: {
            userId: user.id,
          },
        });
        // If they're not already on the project then invite them
        if (!userOnProject) {
          await db.projectuser.create({
            userId: user.id,
            projectId: updatedProject.dataValues.id,
            authorization: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }
    res.status(200);
    res.send(updatedProject);
  } catch (err) {
    console.log('--> error editing projecting in the database', err);
    res.status(500);
    res.send({ err, message: 'error editing project in database' });
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
  editProject,
  getProjectUsers
};
