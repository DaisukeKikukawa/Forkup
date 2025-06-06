const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("account/login.ejs");
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
  req.logout( () => {
    res.redirect("/login");
  });
});

module.exports = router;
