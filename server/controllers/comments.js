const db = require('../db/models/index');

const createComment = async function (req, res) {
  try {
    db.comment
      .create({
        content: req.body.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: req.body.bugId,
        userId: req.body.userId,
      })
      .then((newComment) => {
        res.status(201);
        res.send(newComment);
      });
  } catch (err) {
    res.status(500);
    res.send({ err, message: 'error creating comment in database' });
  }
};

module.exports = {
  createComment,
};
