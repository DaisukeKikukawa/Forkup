// app.ts
import * as dotenv from "dotenv";
dotenv.config();

import adminRouter from "./routes/admin";

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");
import { User, Role } from "./models";

const app = express();

// 基本設定
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// セッション設定（最小限）
app.use(
  session({
    secret: "simple-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// ログイン画面
app.get("/login", (req: any, res: any) => {
  res.render("login", { error: null });
});

// ログイン処理（役割別リダイレクト対応）
app.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    // ユーザーを役割と一緒に検索
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "roles" }],
    });

    if (!user) {
      return res.render("login", { error: "ユーザーが見つかりません" });
    }

    // パスワード確認
    const isValid = await bcrypt.compare(password, (user as any).password_hash);

    if (!isValid) {
      return res.render("login", { error: "パスワードが違います" });
    }

    // セッションにユーザー情報を保存
    req.session.userId = (user as any).id;
    req.session.userRole = (user as any).roles?.[0]?.name || "user";

    // 役割別リダイレクト
    const userRole = (user as any).roles?.[0]?.name;
    if (userRole === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.render("login", { error: "エラーが発生しました" });
  }
});

// 管理者画面 (/admin)
app.get("/admin", adminRouter);

// 一般利用者画面 (/)
app.get("/", async (req: any, res: any) => {
  const userId = req.session.userId;
  const userRole = req.session.userRole;

  // ログインしていない場合はログイン画面へ
  if (!userId) {
    return res.redirect("/login");
  }

  // 管理者の場合は管理画面へリダイレクト
  if (userRole === "admin") {
    return res.redirect("/admin");
  }

  try {
    const user = await User.findByPk(userId);
    res.render("user-dashboard", { user });
  } catch (error) {
    console.error("User dashboard error:", error);
    res.redirect("/login");
  }
});

// ログアウト
app.post("/logout", (req: any, res: any) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
