import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../model/user";
import { Express } from "express";

export default function (app: Express) {
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

        if (!user) {
          return done(null, false, { message: "ユーザーが見つかりません" });
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          (user as any).password_hash
        );

        if (!isPasswordValid) {
          return done(null, false, { message: "パスワードが間違っています" });
        }

        return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user: any, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id: number, done) {
    const user = await User.findByPk(id);
    done(null, user);
  });
}
