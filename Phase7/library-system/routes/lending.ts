import express from "express";
const router = express.Router();
import { User } from "../model/user";
import { LendingRecord } from "../model/lendingRecord";
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

  const user = await User.findByPk(parseInt(userId));

  if (!user) {
    return res.render("lending/start", {
      error: "user_not_found",
      userId: userId,
    });
  }

  res.render("lending/user-confirmed", {user: user});
});

export default router;
