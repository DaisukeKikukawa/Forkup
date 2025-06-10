import express from "express";
const router = express.Router();
import { Book } from "../model/book";

// 一覧表示
router.get("/books", async (req, res) => {
  const books = await Book.findAll({
    order: [["created_at", "DESC"]],
  });
  res.render("books/index", { books: books });
});

// 新規作成画面
router.get("/books/new", (req, res) => {
  res.render("books/new");
});

interface BookShowRequest {
  params: {
    id: number;
  };
}

// 詳細画面
router.get("/books/:id", async (req: BookShowRequest, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/show", { book: book });
});

interface BookCreateRequest {
  body: {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    published_date: string;
    status: string;
  };
}

// 新規作成処理
router.post("/books/create", async (req: BookCreateRequest, res) => {
  const { title, author, isbn, publisher, published_date, status } = req.body;

  await Book.create({
    title,
    author,
    isbn,
    publisher,
    published_date,
    status,
  });

  res.redirect("/books");
});

interface BookEditRequest {
  params: {
    id: number;
  };
}

// 編集画面
router.get("/books/:id/edit", async (req: BookEditRequest, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/edit", { book: book });
});

interface BookUpdateRequest {
  params: {
    id: number;
  };
  body: {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    published_date: string;
    status: string;
  };
}

// 更新処理
router.put("/books/:id", async (req: BookUpdateRequest, res) => {
  const { title, author, isbn, publisher, published_date, status } = req.body;

  await Book.update(
    {
      title,
      author,
      isbn,
      publisher,
      published_date,
      status,
    },
    {
      where: { id: req.params.id },
    }
  );

  res.redirect("/books");
});

interface BookDeleteRequest {
  params: {
    id: number;
  };
}

// 削除処理
router.delete("/books/:id", async (req: BookDeleteRequest, res) => {
  await Book.destroy({
    where: { id: req.params.id },
  });

  res.redirect("/books");
});

export default router;
