import express from "express";
import passport from "passport";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login?error=auth");
};

router.get("/login", (req, res) => {
  let errorMessage;
  if (req.query.error === "auth") {
    errorMessage = "ログインが必要です。";
  } else {
    errorMessage = null;
  }
  res.render("account/login.ejs", { errorMessage });
});

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("account/dashboard.ejs", { user: req.user });
  } else {
    res.redirect("/login");
  }
});

router.post(
  "/account/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.post("/logout", (req, res) => {
  console.log("ログアウト処理開始");
  req.logout(() => {
    res.redirect("/login");
  });
});

export default router;
