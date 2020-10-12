import express from 'express';
import projectsCtrl from './controllers/projects';
import bugsCtrl from './controllers/bugs';
import commentsCtrl from './controllers/comments';
import detailsCtrl from './controllers/details';
import commentMiddleware from './middleware/getComments';

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

export default router;
