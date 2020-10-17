const express = require('express');
const projectsCtrl = require('./controllers/projects');
const bugsCtrl = require('./controllers/bugs');
const commentsCtrl = require('./controllers/comments');
const detailsCtrl = require('./controllers/details');
const usersCtrl = require('./controllers/users');
const commentMiddleware = require('./middleware/getComments');

const passport = require('passport');

const router = express.Router();

//=============
// AUTH
//=============

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT}/`,
    failureRedirect: `auth/login/failed`,
  })
);

// when login is successful, retrieve user info
router.get('/auth/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'user failed to authenticate.',
    });
  }
});

router.get('/auth/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT}/`);
});

//=============
// PROJECTS
//=============
router.get('/projects', projectsCtrl.getProjects);
router.post('/projects', projectsCtrl.createProject);

//Get information about all the users attached to a particular project
router.get('/projectsUsers', projectsCtrl.getProjectUsers);
//=============
// USERS
//=============

router.get('/user', usersCtrl.getUser);
// TODO create user or use OAUTH??
// TODO end point for adding user to project

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

router.get('/details', commentMiddleware.getComments, detailsCtrl.getDetails);

module.exports = router;
