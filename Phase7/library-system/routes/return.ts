import express from "express";
const router = express.Router();
import { Book } from "../model/book";
import { LendingHistory } from "../model/lendingHistory";
import { User } from "../model/user";
import { Status as BookStatus } from "../model/book";

router.get("/return/start", async (req, res) => {
  const sort = req.query.sort || "borrowed_date";
  const order = req.query.order || "DESC";

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  let orderCondition;
  if (sort === "title") {
    orderCondition = [{ model: Book, as: "book" },"title",order,];
  } else if (sort === "user_name") {
    orderCondition = [{ model: User, as: "user" }, "name", order];
  } else if (sort === "borrowed_date") {
    orderCondition = ["borrowed_date", order];
  } else if (sort === "due_date") {
    orderCondition = ["due_date", order];
  } else {
    orderCondition = ["borrowed_date", "DESC"];
  }

  const result = await LendingHistory.findAndCountAll({
    where: {
      returned_date: null,
    },
    include: [
      {
        model: Book,
        as: "book",
      },
      {
        model: User,
        as: "user",
      },
    ],
    order: [orderCondition],
    limit: limit,
    offset: offset,
  });

  res.render("return/start", {
    borrowedBooks: result.rows,
    currentSort: {
      sort: sort,
      order: order,
    },
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(result.count / limit),
      hasPrevious: page > 1,
      hasNext: page < Math.ceil(result.count / limit),
      previousPage: page - 1,
      nextPage: page + 1,
    },
  });
});

interface ReturnConfirmRequest {
  query: {
    lendingId: string;
  };
}

router.get("/return/confirm", async (req: ReturnConfirmRequest, res) => {
  const { lendingId } = req.query;

  if (!lendingId || !/^\d+$/.test(lendingId)) {
    return res.redirect("/return/start?error=invalid_lending_id");
  }

  const lendingRecord = await LendingHistory.findByPk(parseInt(lendingId), {
    include: [
      { model: Book, as: "book" },
      { model: User, as: "user" },
    ],
  });

  if (!lendingRecord) {
    return res.redirect("/return/start?error=lending_not_found");
  }

  if (lendingRecord.returnedDate) {
    return res.redirect("/return/start?error=already_returned");
  }

  res.render("return/confirm", {
    lendingRecord: lendingRecord,
    book: lendingRecord.book,
    user: lendingRecord.user,
  });
});

interface ExecuteReturnRequest {
  body: {
    lendingId: string;
  };
}

router.post("/return/execute", async (req: ExecuteReturnRequest, res) => {
  const { lendingId } = req.body;

  const lendingRecord = await LendingHistory.findByPk(parseInt(lendingId), {
    include: [
      { model: Book, as: "book" },
      { model: User, as: "user" },
    ],
  });

  if (!lendingRecord || lendingRecord.returnedDate) {
    return res.redirect("/return/start");
  }

  await LendingHistory.update(
    { returned_date: new Date() },
    { where: { id: lendingRecord.id } }
  );

  await Book.update(
    { status: BookStatus.Available },
    { where: { id: lendingRecord.bookId } }
  );

  res.render("return/success", {
    book: lendingRecord.book,
    lendingRecord: {
      ...lendingRecord.dataValues,
      returnedDate: new Date(),
    },
    user: lendingRecord.user,
    hasReservation: false,
  });
});

export default router;
