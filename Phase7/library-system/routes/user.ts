import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../model/user";

// 一覧表示
router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.render("users/index", { users: users });
});

// 新規作成画面
router.get("/users/new", (req, res) => {
  res.render("users/new");
});

interface UserShowRequest {
  params: {
    id: number;
  }
}

// 詳細画面
router.get("/users/:id", async (req: UserShowRequest, res) => {
  const user = await User.findByPk(req.params.id);
  res.render("users/show", { user: user });
});

interface UserCreateRequest {
  body: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  };
}

// 新規作成処理
router.post("/users/create", async (req: UserCreateRequest, res) => {
  const { name, email, password, phone, address } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.create({ name, email, password_hash: hashedPassword, phone, address });
  res.redirect("/users");
});

interface UserEditRequest {
  params: {
    id: number;
  };
}

// 編集画面
router.get("/users/:id/edit", async (req: UserEditRequest, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "name", "email", "phone", "address"],
  });

  res.render("users/edit", { user: user });
});

interface UserUpdateRequest {
  params: {
    id: number;
  };
  body: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

// 更新処理
router.put("/users/:id", async (req: UserUpdateRequest, res) => {
  const { name, email, phone, address } = req.body;

  await User.update(
    {name,email,phone, address},
    {where: { id: req.params.id },}
  );

  res.redirect("/users");
});

interface UserDeleteRequest {
  params: {
    id: number;
  };
}

// 削除処理
router.delete("/users/:id", async (req: UserDeleteRequest, res) => {
  await User.destroy({
    where: { id: req.params.id },
  });

  res.redirect("/users");
});

export default router;
