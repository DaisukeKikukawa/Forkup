import express from "express";
const router = express.Router();
import { Book } from "../model/book";
import { LendingRecord } from "../model/lendingRecord";
import { User } from "../model/user";

router.get("/return/start", (req, res) => {
  res.render("return/start");
});

interface CheckReturnBookRequest {
  body: {
    bookId: string;
  };
}

router.post("/return/check-book", async (req: CheckReturnBookRequest, res) => {
  const { bookId } = req.body;

  if (!bookId || !/^\d+$/.test(bookId)) {
    return res.render("return/start", {
      error: "invalid_format",
      bookId: bookId,
    });
  }

  const book = await Book.findByPk(parseInt(bookId));

  if (!book) {
    return res.render("return/start", {
      error: "book_not_found",
      bookId: bookId,
    });
  }

  if (book.status !== 2) {
    return res.render("return/start", {
      error: "book_not_borrowed",
      bookId: bookId,
    });
  }

  const currentLending = await LendingRecord.findOne({
    where: {
      book_id: parseInt(bookId),
    },
    include: [{ model: User, as: "user" }],
  });

  if (!currentLending) {
    return res.render("return/start", {
      error: "book_not_borrowed",
      bookId: bookId,
    });
  }

  res.render("return/confirm", {
    book: book,
    lendingRecord: currentLending,
    user: currentLending.user,
  });
});


export default router;
