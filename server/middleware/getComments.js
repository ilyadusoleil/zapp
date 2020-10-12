const db = require('../db/models/index');

const getComments = async function (req, res, next) {
  try {
    const comments = await db.comments.findAll({
      where: {
        bugId: req.body.bugId,
      },
    });
    req.body.comments = comments;
    next();
  } catch (err) {
    console.log('---> error retrieving comments from the database', err.stack);
    res.status(500);
    res.send({ err, message: 'error retrieving comments from the database' });
  }
};

module.exports = {
  getComments,
};
