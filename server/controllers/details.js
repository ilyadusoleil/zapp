const db = require('../db/models/index');

const getDetails = async function (req, res) {
  try {
    const details = await db.bug.findOne({
      where: {
        id: req.query.bugId,
      },
    });
    details.dataValues.comments = req.body.comments;
    res.status(200);
    res.send(details);
  } catch (err) {
    res.status(500);
    res.send({
      err,
      message: 'error retrieving bug details from the database',
    });
  }
};

module.exports = {
  getDetails,
};
