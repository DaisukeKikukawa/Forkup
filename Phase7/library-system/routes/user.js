const express = require("express");
const { startConnection } = require("../config/database");

const router = express.Router();

// 一覧表示
router.get("/users", async (req, res) => {
  const connection = await startConnection();
    const [rows] = await connection.execute(
      "SELECT id, name, email, phone, address, created_at, updated_at FROM users ORDER BY created_at DESC"
    );
    res.render("users/index", { users: rows });
    await connection.end();
});

// 新規作成画面
router.get("/users/new", (req, res) => {
  res.render("users/new");
});

// 詳細画面
router.get("/users/:id", async (req, res) => {
  const connection = await startConnection();
  const [rows] = await connection.execute(
    "SELECT id, name, email, phone, address, created_at, updated_at FROM users WHERE id = ?",
    [req.params.id]
  );
  res.render("users/show", { user: rows[0] });
  await connection.end();
});

// 新規作成処理
router.post("/users/create", async (req, res) => {
  const connection = await startConnection();
    const { name, email, password, phone, address } = req.body;

    await connection.execute(
      "INSERT INTO users (name, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)",
      [name, email, 1111, phone, address]
    );

    res.redirect("/users");
    await connection.end();
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
  const [result] = await connection.execute(
    "DELETE FROM users WHERE id = ?",
    [req.params.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "ユーザーが見つかりません" });
  }

  res.redirect("/users");
  await connection.end();
});

module.exports = router;
