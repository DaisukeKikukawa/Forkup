import express from 'express';

const router = express.Router();

let posts = [
  {title: "title0", body: "body0"},
  {title: "title1", body: "body1"},
  {title: "title2", body: "body2"}
]

// 一覧表示
router.get("/posts", (req: express.Request, res: express.Response) => {
  res.render("posts/index", {posts: posts});
});

// 新規作成画面
router.get("/posts/new", (req: express.Request, res: express.Response) => {
  res.render("posts/new");
});

interface PostShowRequest {
  params: {
    id: number;
  };
}
// 詳細画面
router.get("/posts/:id", (req: PostShowRequest, res: express.Response) => {
  res.render("posts/show", { post: posts[req.params.id] });
});

// 新規作成処理
router.post("/posts/create", (req: express.Request, res: express.Response) => {
  const post = {
    title: req.body.title,
    body: req.body.body
  }
  posts.push(post)
  res.redirect("/");
});

interface PostEditRequest {
  params: {
    id: number
  }
}

// 編集画面
router.get("/posts/:id/edit", (req: PostEditRequest, res: express.Response) => {
  res.render("posts/edit", { post: posts[req.params.id], id: req.params.id });
});

interface PostUpdateRequest {
  params: {
    id: number;
  },
  body: {
    title: string,
    body: string,
  }
}

// 更新処理
router.put("/posts/:id", (req: PostUpdateRequest, res: express.Response) => {
  // console.log("更新に入った")
  posts[req.params.id] = {
    title: req.body.title,
    body: req.body.body,
  };

  res.redirect("/");
});

// 削除処理
router.delete("/posts/:id", (req: express.Request, res: express.Response) => {
  posts.splice(req.body.id, 1)
  res.redirect("/")
});

export default router;
