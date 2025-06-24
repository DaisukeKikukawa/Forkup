import express from 'express';
const app: express.Express = express();
import bodyParser from 'body-parser'

import session from "express-session";
import passport from "passport";
import passportConfig from "./config/passport";

import methodOverride from "method-override";
import postRoutes from "./routes/post";
import authRouter from "./routes/auth";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
import lendingRouter from "./routes/lending";
import returnRouter from "./routes/return";
import reservationRouter from "./routes/reservation";

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
app.use(myLogger)
passportConfig(app);

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
app.use("/", lendingRouter);
app.use("/", returnRouter);
app.use("/", reservationRouter);

app.listen(3000)
console.log("サーバー起動")
