const express = require('express');
const projectsCtrl = require('../controllers/projects');
const bugsCtrl = require('../controllers/bugs');
const commentsCtrl = require('../controllers/comments');
const detailsCtrl = require('../controllers/details');
const usersCtrl = require('../controllers/users');

const router = express.Router();

//=============
// PROJECTS
//=============
router.get('/projects', projectsCtrl.getProjects);
router.post('/projects', projectsCtrl.createProject);
router.put('/projects', projectsCtrl.editProject);

//Get information about all the users attached to a particular project
router.get('/projectsUsers', projectsCtrl.getProjectUsers);
//=============
// USERS
//=============

router.get('/user', usersCtrl.getUser);
router.get('/user/email', usersCtrl.getUserByEmail);

router.patch('/user/recentProject', usersCtrl.updateUserRecentProject);
// TODO: create user or use OAUTH??
// TODO: end point for adding user to project

//=============
// BUGS
//=============

router.get('/bugs', bugsCtrl.getBugs);
router.post('/bugs', bugsCtrl.createBug);
router.put('/bugs', bugsCtrl.editBug);

//=============
// COMMENTS
//=============

router.post('/comments', commentsCtrl.createComment);

//=============
// DETAILS
//=============

router.get('/details', detailsCtrl.getDetails);

module.exports = router;
