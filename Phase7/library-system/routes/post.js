const express = require("express");
// import express from "express";

const router = express.Router();

let posts = [
  {title: "title0", body: "body0"},
  {title: "title1", body: "body1"},
  {title: "title2", body: "body2"}
]

// 一覧表示
router.get("/posts", (req, res) => {
  res.render("posts/index", {posts: posts});
});

// 新規作成画面
router.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

// 詳細画面
router.get("/posts/:id", (req, res) => {
  res.render("posts/show", { post: posts[req.params.id] });
});

// 新規作成処理
router.post("/posts/create", (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body
  }
  posts.push(post)
  res.redirect("/");
});

// 編集画面
router.get("/posts/:id/edit", (req, res) => {
  res.render("posts/edit", { post: posts[req.params.id], id: req.params.id });
});

// 更新処理
router.put("/posts/:id", (req, res) => {
  // console.log("更新に入った")
  posts[req.params.id] = {
    title: req.body.title,
    body: req.body.body,
  };

  res.redirect("/");
});

// 削除処理
router.delete("/posts/:id", (req, res) => {
  posts.splice(req.body.id, 1)
  res.redirect("/")
});
//個別に定義するやり方
// export const index = (req, res) => res.send("Post index");
module.exports = router;
// export default router;
