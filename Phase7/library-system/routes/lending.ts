import express from "express";
const router = express.Router();
import { User } from "../model/user";
import { LendingHistory } from "../model/lendingHistory";
import { Book } from "../model/book";

router.get("/lending/start", (req, res) => {
  res.render("lending/start");
});

interface CheckUserRequest {
  body: {
    userId: string;
  };
}

router.post("/lending/check-user", async (req: CheckUserRequest, res) => {
  const { userId } = req.body;

  if (!userId || !/^\d+$/.test(userId)) {
    return res.render("lending/start", {
      error: "invalid_format",
      userId: userId,
    });
  }

  const user = await User.findByPk(parseInt(userId), {
    include: [
      {
        model: LendingHistory,
        as: "lendingHistories",
        include: [{ model: Book, as: "book" }],
      },
    ],
  });

  if (!user) {
    return res.render("lending/start", {
      error: "user_not_found",
      userId: userId,
    });
  }

  res.render("lending/user-confirmed", {
    user: user,
    borrowedRecords: user.lendingHistories,
  });
});

interface BookInputRequest {
  query: {
    userId: string;
  };
}

router.get("/lending/book-input", async (req: BookInputRequest, res) => {
  const { userId } = req.query;
  const user = await User.findByPk(parseInt(userId));
  if (!user) {
    return res.render("lending/start", {
      error: "user_not_found",
    });
  }
  res.render("lending/book-input", { user: user });
});

interface CheckBookRequest {
  body: {
    userId: string;
    bookId: string;
  };
}

router.post("/lending/check-book", async (req: CheckBookRequest, res) => {
  const { userId, bookId } = req.body;
  const user = await User.findByPk(parseInt(userId));

  if (!bookId || !/^\d+$/.test(bookId)) {
    return res.render("lending/book-input", {
      user: user,
      error: "invalid_format",
      bookId: bookId,
    });
  }

  const book = await Book.findByPk(parseInt(bookId));

  if (!book) {
    return res.render("lending/book-input", {
      user: user,
      error: "book_not_found",
      bookId: bookId,
    });
  }

  res.render("lending/book-confirmed", {
    user: user,
    book: book,
  });
});

interface ExecuteLendingRequest {
  body: {
    userId: string;
    bookId: string;
  };
}

router.post("/lending/execute", async (req: ExecuteLendingRequest, res) => {
  const { userId, bookId } = req.body;

  const user = await User.findByPk(parseInt(userId));
  const book = await Book.findByPk(parseInt(bookId));

  if (!user || !book) {
    return res.render("lending/start");
  }

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const lendingRecord = await LendingHistory.create({
    book_id: book.id,
    user_id: user.id,
    borrowed_date: new Date(),
    due_date: dueDate,
  });

  await Book.update(
    { status: Book.Status.Borrowed },
    { where: { id: bookId } }
  );

  res.render("lending/success", {
    user: user,
    book: book,
    lendingRecord: {
      id: lendingRecord.id,
      borrowedDate: lendingRecord.borrowedDate,
      dueDate: dueDate,
    },
  });
});

export default router;
