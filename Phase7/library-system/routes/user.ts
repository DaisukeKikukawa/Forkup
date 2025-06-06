import express from "express";
import bcrypt from "bcrypt";
const { startConnection } = require("../config/database");
const router = express.Router();
import { User } from "../model/user";

// 一覧表示
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.render("users/index", { users: users });
});

// 新規作成画面
router.get("/users/new", (req, res) => {
  res.render("users/new");
});

interface UserShowRequest {
  params: {
    id: number;
  }
}

// 詳細画面
router.get("/users/:id", async (req: UserShowRequest, res) => {
  const user = await User.findByPk(req.params.id);
  res.render("users/show", { user: user });
});

interface UserCreateRequest {
  body: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  };
}

// 新規作成処理
router.post("/users/create", async (req: UserCreateRequest, res) => {
  const { name, email, password, phone, address } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.create({ name, email, password_hash: hashedPassword, phone, address });
  res.redirect("/users");
});

// 編集画面
router.get("/users/:id/edit", async (req, res) => {
  const connection = await startConnection();
  const [rows] = await connection.execute(
    "SELECT id, name, email, phone, address FROM users WHERE id = ?",
    [req.params.id]
  );

  res.render("users/edit", { user: rows[0] });
  await connection.end();
});

// 更新処理
router.put("/users/:id", async (req, res) => {
  const connection = await startConnection();
  const { name, email, phone, address } = req.body;

  await connection.execute(
    "UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
    [name, email, phone || null, address || null, req.params.id]
  );

  res.redirect("/users");
  await connection.end();
});

// 削除処理
router.delete("/users/:id", async (req, res) => {
  const connection = await startConnection();
  await connection.execute("DELETE FROM users WHERE id = ?", [req.params.id]);

  res.redirect("/users");
  await connection.end();
});

export default router;
