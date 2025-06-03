const express = require("express");
const { startConnection } = require("../dist/config/database");
const router = express.Router();

// 一覧表示
router.get("/books", async (req, res) => {
  const connection = await startConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM books ORDER BY created_at DESC"
    );
    res.render("books/index", { books: rows });
    await connection.end();
});

// 新規作成画面
router.get("/books/new", (req, res) => {
  res.render("books/new");
});

// 詳細画面
router.get("/books/:id", async (req, res) => {
  const connection = await startConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM books WHERE id = ?",
    [req.params.id]
  );
  res.render("books/show", { book: rows[0] });
  await connection.end();
});

// 新規作成処理
router.post("/books/create", async (req, res) => {
  const connection = await startConnection();
    const { title, author, isbn, publisher, published_date, status } = req.body;

    await connection.execute(
      "INSERT INTO books (title, author, isbn, publisher, published_date, status) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        author,
        isbn,
        publisher,
        published_date,
        status,
      ]
    );
    res.redirect("/books");
    await connection.end();
});

// 編集画面
router.get("/books/:id/edit", async (req, res) => {
  const connection = await startConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM books WHERE id = ?",
      [req.params.id]
    );
    res.render("books/edit", { book: rows[0] });
    await connection.end();
});

// 更新処理
router.put("/books/:id", async (req, res) => {
  const connection = await startConnection();
    const { title, author, isbn, publisher, published_date, status } = req.body;
    await connection.execute(
      "UPDATE books SET title = ?, author = ?, isbn = ?, publisher = ?, published_date = ?, status = ? WHERE id = ?",
      [
        title,
        author,
        isbn,
        publisher,
        published_date,
        status,
        req.params.id,
      ]
    );

    res.redirect("/books");
    await connection.end();
});

// 削除処理
router.delete("/books/:id", async (req, res) => {
  const connection = await startConnection();
  await connection.execute(
    "DELETE FROM books WHERE id = ?",
    [req.params.id]
  );
  res.redirect("/books");
  await connection.end();
});

module.exports = router;
