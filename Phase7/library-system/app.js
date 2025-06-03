const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const postRouter = require("./routes/post");
const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");
// import postRouter from "./routes/post.js";
// import * as post from "./routes/post.js";

// import adminRouter from "./routes/admin";
// app.get("/admin", adminRouter);

//ファイルの読み込み
app.set("views", __dirname + "/views")
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/"))
    
// middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(mylogger)

//デバッグ
function mylogger(req, res, next) {
    console.log(`リクエストメソッド: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log("Body:", req.body);
    next();
};

//ルーティングの設定
app.use("/", postRouter);
app.use("/", bookRouter);
app.use("/", userRouter);

//個別定義の際の書き方
// app.get("/", post.index)
// app.get("/posts/new", post.new)
// app.post("/posts/create", post.create)
// app.get("/posts/:id", post.show)
// app.get("/posts/:id/edit", post.edit)
// app.put("/posts/:id/", post.update)
// app.delete("/posts/:id/", post.destroy)

app.listen(3000)
console.log("サーバー起動")
