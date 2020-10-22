const db = require('../db/models/index');
const sendInvitationEmail = require('../email/invitationEmail');
const sendSignUpEmail = require('../email/signupEmail');

// GET projects that belong to a particular userId
const getProjects = async function (req, res) {
  try {
    if (req.query.userId) {
      const projects = await db.projectuser.findAll({
        //TODO: improve this query
        attributes: [],
        where: {
          userId: req.query.userId,
        },
        include: {
          model: db.project,
          required: true,
          attributes: ['id', 'name', 'description', 'state'],
        },
      });
      const processedProjects = projects.map((el) => el.projects[0]);

      res.status(200);
      res.send(processedProjects);
    } else if (req.query.projectId) {
      const project = await db.project.findAll({
        where: {
          id: req.query.projectId,
        },
      });
      res.status(200);
      res.send(project[0]);
    }
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
      state: 0,
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
      //Get name of the person who invited user
      const invitedBy = await db.user.findOne({
        where: { id: userId },
      });
      const invitedByName = `${invitedBy.firstName} ${invitedBy.lastName}`;
      for (let i = 0; i < projectUsers.length; i++) {
        let user = null;
        if (typeof projectUsers[i] === 'number') {
          //user already exists in db
          user = await db.user.findOne({
            where: {
              id: projectUsers[i],
            },
          });
          await sendInvitationEmail(
            user.email,
            invitedByName,
            name,
            newProject.dataValues.id
          );
        } else if (typeof projectUsers[i] === 'string') {
          //user doesn't exist in db yet
          user = await db.user.create({
            email: projectUsers[i],
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          await sendSignUpEmail(user.email, invitedByName, name);
        } else {
          //TODO: throw error
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
    const { projectUsers, userId, name } = req.body;
    const updatedProject = {
      name: name,
      description: req.body.description,
      state: req.body.state || 0,
      createdAt: req.body.createdAt,
      updatedAt: new Date(),
    };
    const isUpdated = await db.project.update(updatedProject, {
      where: {
        id: req.body.id,
      },
    });

    // If any users have been invited to this project
    if (projectUsers.length > 0) {
      //Get name of the person who invited user
      const invitedBy = await db.user.findOne({
        where: { id: userId },
      });
      const invitedByName = `${invitedBy.firstName} ${invitedBy.lastName}`;
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
          await sendSignUpEmail(user.email, invitedByName, name);
        } else {
          //TODO: throw error
        }
        // Check if the user is already on the project
        let userOnProject = await db.projectuser.findOne({
          where: {
            userId: user.id,
            projectId: req.body.id,
          },
        });
        // If they're not already on the project then invite them
        if (!userOnProject) {
          await db.projectuser.create({
            userId: user.id,
            projectId: req.body.id,
            authorization: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          await sendInvitationEmail(
            user.email,
            invitedByName,
            name,
            req.body.id
          );
        }
      }
    }
    if (isUpdated[0] === 1) {
      res.status(200);
      res.send(updatedProject);
    } else {
      res.status(500);
      res.send({ message: 'error editing project in database' });
    }
  } catch (err) {
    console.log('EDIT PROJECT USER', err);
    res.status(500);
    res.send({ message: 'error editing project in database' });
  }
};

/*REVIEW: conditions to return empty array were put in place to fix bug
where archiving projects would crash the app. Requires review*/
const getProjectUsers = async function (req, res) {
  try {
    if (req.query.projectId == '0') {
      res.status(200);
      res.send([]);
    }

    const users = await db.projectuser.findAll({
      attributes: ['userId'],
      where: {
        projectId: req.query.projectId,
      },
    });
    const processedUsers = users.map((el) => el.userId);

    let userInfo = [];
    if (processedUsers.length !== 0) {
      userInfo = await db.user.findAll({
        where: {
          id: processedUsers, //This is an array, sequelize will get all users with id's that match the elements of the array
        },
      });
      res.status(200);
      res.send(userInfo);
    }
  } catch (err) {
    res.status(500);
    res.send({
      err,
      message: 'error retrieving user related to a project from the database',
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  editProject,
  getProjectUsers,
};
