import express from "express";
const router = express.Router();
import { User } from "../model/user";
import { Book } from "../model/book";
import { Reservation, ReservationStatus } from "../model/reservation";
import { Status as BookStatus } from "../model/book";

router.get("/reservation/start", (req, res) => {
  res.render("reservation/start");
});

interface CheckReservationUserRequest {
  body: {
    userId: string;
  };
}

router.post(
  "/reservation/check-user",
  async (req: CheckReservationUserRequest, res) => {
    const { userId } = req.body;

    if (!userId || !/^\d+$/.test(userId)) {
      return res.render("reservation/start", {
        error: "invalid_format",
        userId: userId,
      });
    }

    const user = await User.findByPk(parseInt(userId), {
      include: [
        {
          model: Reservation,
          as: "reservations",
          include: [{ model: Book, as: "book" }],
          order: [["reserved_date", "DESC"]],
        },
      ],
    });

    if (!user) {
      return res.render("reservation/start", {
        error: "user_not_found",
        userId: userId,
      });
    }

    const activeReservations = user.reservations || [];
    const reservationCount = activeReservations.length;
    const maxReservations = 3;

    if (reservationCount >= maxReservations) {
      return res.render("reservation/start", {
        error: "user_over_limit",
        userId: userId,
      });
    }

    res.render("reservation/user-confirmed", {
      user: user,
      activeReservations: activeReservations,
      reservationCount: reservationCount,
      maxReservations: maxReservations,
    });
  }
);

interface BookInputRequest {
  query: {
    userId: string;
  };
}

router.get("/reservation/book-input", async (req: BookInputRequest, res) => {
  const { userId } = req.query;

  if (!userId || !/^\d+$/.test(userId)) {
    return res.redirect("/reservation/start?error=invalid_user_id");
  }

  const user = await User.findByPk(parseInt(userId));

  if (!user) {
    return res.redirect("/reservation/start?error=user_not_found");
  }

  res.render("reservation/book-input", { user: user });
});

interface CheckBookRequest {
  body: {
    userId: string;
    bookId: string;
  };
}

router.post("/reservation/check-book", async (req: CheckBookRequest, res) => {
  const { userId, bookId } = req.body;

  if (!bookId || !/^\d+$/.test(bookId)) {
    const user = await User.findByPk(parseInt(userId));
    return res.render("reservation/book-input", {
      user: user,
      error: "invalid_format",
      bookId: bookId,
    });
  }

  const user = await User.findByPk(parseInt(userId));
  const book = await Book.findByPk(parseInt(bookId));

  if (!user || !book) {
    return res.redirect("/reservation/start");
  }

  if (book.status !== BookStatus.Borrowed) {
    return res.render("reservation/book-input", {
      user: user,
      error: "book_not_borrowable",
      bookId: bookId,
    });
  }

res.render("reservation/confirm", {
  user: user,
  book: book,
  });
});

interface ExecuteReservationRequest {
  body: {
    userId: string;
    bookId: string;
  };
}

router.post("/reservation/execute", async (req: ExecuteReservationRequest, res) => {
    const { userId, bookId } = req.body;

    const user = await User.findByPk(parseInt(userId));
    const book = await Book.findByPk(parseInt(bookId));

    if (!user || !book) {
      return res.redirect("/reservation/start");
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);

    const reservation = await Reservation.create({
      book_id: book.id,
      user_id: user.id,
      status: ReservationStatus.Active,
      reserved_date: new Date(),
      expire_date: expireDate,
    });

    res.render("reservation/success", {
      user: user,
      book: book,
      reservation: {
        id: reservation.id,
        reservedDate: reservation.reservedDate,
        expireDate: reservation.expireDate,
        status: reservation.status,
      },
    });
  }
);

export default router;
