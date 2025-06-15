import express from "express";
const router = express.Router();
import { Book } from "../model/book";
import { LendingRecord } from "../model/lendingRecord";
import { User } from "../model/user";

router.get("/return/start", (req, res) => {
  res.render("return/start");
});

export default router;
