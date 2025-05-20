import * as http from "http";
import * as fs from "fs";
import { parse } from "querystring";
import { startConnection } from "./db";
import ejs from "ejs";
import * as path from "path";
import { getAllTodos } from "./db-operation";
import * as url from "url";
import { validateTodoData } from "./validation";

const server = http.createServer(async(req, res) => {
  if (req.url === "/") {
    const todos = await getAllTodos();
    const filePath = path.join(__dirname, "views", "index.html.ejs");
    const html = await ejs.renderFile(filePath, { todos, errors: [] });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (req.url === "/style.css") {
    const css = fs.readFileSync("style.css", "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);
  } else if (req.url === "/create" && req.method === "POST") {
    let body = "";

    req.on("data", (data) => {
      body += data.toString();
    });

    req.on("end", async () => {
      const parsed = parse(body);
      const title = parsed["title"] as string;
      const description = parsed["description"] as string;

      const errors = validateTodoData(title, description);

      if (errors.length === 0) {
        const conn = await startConnection();
        await conn.execute(
          "INSERT INTO todos (title, description) VALUES (?, ?)",
          [title, description]
        );
        await conn.end();
        res.writeHead(302, { Location: "/" });
        res.end();
      } else {
        const todos = await getAllTodos();
        const filePath = path.join(__dirname, "views", "index.html.ejs");
        const html = await ejs.renderFile(filePath, {
          todos,
          errors,
          formData: { title, description },
        });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      }
    });
  } else if (req.url?.startsWith("/edit") && req.method === "GET") {
    const parsedUrl = url.parse(req.url, true);
    const id = parsedUrl.query.id;
    const conn = await startConnection();
    const [rows] = await conn.execute("SELECT * FROM todos WHERE id = ?", [id]);
    await conn.end();

    const todo = Array.isArray(rows) ? rows[0] : null;

    const filePath = path.join(__dirname, "views", "edit.html.ejs");
    const html = await ejs.renderFile(filePath, { todo, errors: [] });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (req.url === "/update" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const parsed = parse(body);
      const id = parsed["id"];
      const title = parsed["title"] as string;
      const description = parsed["description"] as string;

      const errors = validateTodoData(title, description);

      if (errors.length === 0) {
        const conn = await startConnection();
        await conn.execute(
          "UPDATE todos SET title = ?, description = ? WHERE id = ?",
          [title, description, id]
        );
        await conn.end();

        res.writeHead(302, { Location: "/" });
        res.end();
      } else {
        const conn = await startConnection();
        const [rows] = await conn.execute("SELECT * FROM todos WHERE id = ?", [
          id,
        ]);
        await conn.end();

        const todo = {
          id: id,
          title: title,
          description: description,
        };

        const filePath = path.join(__dirname, "views", "edit.html.ejs");
        const html = await ejs.renderFile(filePath, { todo, errors });

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      }
    });
});

server.listen(3000, () => {
  console.log("サーバー起動成功");
});
