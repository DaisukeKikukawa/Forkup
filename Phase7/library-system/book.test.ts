import request from "supertest";
import express, { response } from "express";
import bookRouter from "./routes/book";
import { Book } from "./model/book";
import { sequelizeConnection } from "./config/database";

const app = express();

//ファイルの読み込み
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/../public/"));

app.use(express.json());
app.use("/", bookRouter);

describe("本の一覧表示", () => {
  // Book.create({
  //   title: "テスト本",
  //   author: "テスト著者",
  //   isbn: "978-4-123456-78-9",
  //   publisher: "テスト出版社",
  //   publishedDate: new Date("2020-01-01"),
  //   status: 1,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  it("データが返ることの確認", async () => {
    const res = await request(app).get("/books");
    // console.log(res);
    expect(res.status).toBe(200);
    // expect(res.body).toEqual([{ title: "テスト本" }]);
  });
});

describe("本の新規作成", () => {
  it("本が新規作成されること", async () => {
    const book = {
      title: "タイトル1",
      author: "株式会社フェッド",
      isbn: "123-123-124",
      publisher: "菊川さん",
      published_date: "2025-06-23",
      status: Book.Status.Available,
    };

    const res = await request(app).post("/books/create").send(book);
    expect(res.status).toBe(302);

    const books = await Book.findAll({
      order: [["created_at", "DESC"]],
    });

    expect(book.title).toBe(books[0].title);
    expect(book.status).toBe(books[0].status);
    books[0].destroy();
  });
});

describe("本の詳細画面", () => {
  it("画面が表示されること", async () => {
    const book = await Book.create({
      title: "タイトル1",
      author: "株式会社フェッド",
      isbn: "123-123-124",
      publisher: "菊川さん",
      published_date: "2025-06-23",
      status: Book.Status.Available,
    });

    const res = await request(app).get(`/books/${book.id}`);
    expect(res.status).toBe(200);

    book.destroy();
  });
});
