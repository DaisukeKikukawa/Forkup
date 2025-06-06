const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../dist/model/user");

module.exports = function (app) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email, password, done) {
          const user = await User.findOne({
            where: { email: email },
          });
          return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
      const user = await User.findByPk(id);
      done(null, user);
  });
};
