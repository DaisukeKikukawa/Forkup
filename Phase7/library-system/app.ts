import express from 'express';
const app: express.Express = express();
import bodyParser from 'body-parser'

const session = require("express-session");
const passport = require("passport");

import methodOverride from "method-override";
import postRoutes from "./routes/post";
const authRouter = require("../routes/auth");
import bookRouter from "./routes/book";
import userRouter from "./routes/user";

//ファイルの読み込み
app.set("views", __dirname + "/../views")
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/../public/"))

// middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "development-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("../config/passport")(app);

app.use(myLogger)

//デバッグ
function myLogger(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`リクエストメソッド: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log("Body:", req.body);
    next();
};

//ルーティングの設定
app.use("/", postRoutes);
app.use("/", bookRouter);
app.use("/", userRouter);
app.use("/", authRouter);

app.listen(3000)
console.log("サーバー起動")
