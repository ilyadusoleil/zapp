const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/models/index');

//helper function
async function updateUser(user, newUser) {
  Object.assign(user, newUser);
  return user.save();
}

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async function (accessToken, refreshToken, profile, done) {
        const newUser = {
          email: profile.emails[0].value,
          googleId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };

        try {
          //check if user is already in database
          let user = await db.user.findOne({
            where: {
              googleId: profile.id,
            },
          });
          if (user) {
            // user found in db
            done(null, user);
          } else {
            //if not found by googleId see if they're email has been added to a project
            user = await db.user.findOne({
              where: {
                email: profile.emails[0].value,
              },
            });
            user = user
              ? updateUser(user) //user has been invited to a project and their email is already in the database
              : await db.user.create(newUser); //no user found so create new user
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await db.user.findOne({
        where: {
          id: id,
        },
      });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};
