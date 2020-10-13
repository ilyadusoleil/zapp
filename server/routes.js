const express = require('express');
const projectsCtrl = require('./controllers/projects');
const bugsCtrl = require('./controllers/bugs');
const commentsCtrl = require('./controllers/comments');
const detailsCtrl = require('./controllers/details');
const commentMiddleware = require('./middleware/getComments');

const router = express.Router();

//=============
// PROJECTS
//=============
router.get('/projects', projectsCtrl.getProjects);
router.post('/projects', projectsCtrl.createProject);

//=============
// USERS
//=============

// TODO create user or use OAUTH??

//=============
// BUGS
//=============

router.get('/bugs', bugsCtrl.getBugs);
router.post('/bugs', bugsCtrl.createBug);
router.patch('/bugs', bugsCtrl.editBug);

//=============
// COMMENTS
//=============

router.post('/comments', commentsCtrl.createComment);

//=============
// DETAILS
//=============

router.get('/details', commentMiddleware.getComments, detailsCtrl.getDetails);

module.exports = router;
