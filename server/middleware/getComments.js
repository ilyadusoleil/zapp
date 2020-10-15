const db = require('../db/models/index');

const getComments = async function (req, res, next) {
  try {
    const comments = await db.comment.findAll({
      where: {
        bugId: req.query.bug_Id,
      },
    });
    req.body.comments = comments;
    next();
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error retrieving comments from the database' });
  }
};

module.exports = {
  getComments,
};
