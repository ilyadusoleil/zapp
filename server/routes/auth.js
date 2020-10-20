const express = require('express');

const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: (process.env.NODE_ENV === 'development') ? `${process.env.CLIENT}/` : '/',
    failureRedirect: `auth/login/failed`,
  })
);

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
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

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect((process.env.NODE_ENV === 'development') ? `${process.env.CLIENT}/` : '/');
});

module.exports = router;