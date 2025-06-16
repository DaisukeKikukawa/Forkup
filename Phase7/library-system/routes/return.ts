import express from "express";
const router = express.Router();
import { Book } from "../model/book";
import { LendingHistory } from "../model/lendingHistory";
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

  if (book.status !== Book.Status.Borrowed) {
    return res.render("return/start", {
      error: "book_not_borrowed",
      bookId: bookId,
    });
  }

  const currentLending = await LendingHistory.findOne({
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

interface ExecuteReturnRequest {
  body: {
    bookId: string;
    lendingRecordId: string;
  };
}

router.post("/return/execute", async (req: ExecuteReturnRequest, res) => {
  const { bookId, lendingRecordId } = req.body;

  const lendingRecord = await LendingHistory.findByPk(
    parseInt(lendingRecordId),
    {
      include: [
        { model: User, as: "user" },
        { model: Book, as: "book" },
      ],
    }
  );

  if (!lendingRecord || !lendingRecord.book) {
    return res.render("return/start", {
      error: "data_not_found",
      message: "書籍または貸出記録が見つかりません。",
    });
  }

  await LendingHistory.update(
    { returned_date: new Date() },
    { where: { id: lendingRecord.id } }
  );

  await Book.update(
    { status: Book.Status.Available },
    { where: { id: lendingRecord.book.id } }
  );

  res.render("return/success", {
    book: lendingRecord.book,
    user: lendingRecord.user,
  });
});

export default router;
