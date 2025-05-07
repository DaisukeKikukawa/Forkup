import readlineSync from "readline-sync";
import { validateName, validateEmail, validateAge } from "./validation.js";

export class User {
  private _name: string;
  private _email: string;
  private _age: number;

  constructor(name: string, email: string, age: number) {
    this._name = name;
    this._email = email;
    this._age = age;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get age(): number {
    return this._age;
  }

  setName(name: string): void {
    this._name = name;
  }

  setEmail(email: string): void {
    this._email = email;
  }

  setAge(age: number): void {
    this._age = age;
  }
}

export const showUsers = async (connection) => {
  const [users] = await connection.query("SELECT * FROM `users`");
  console.log("=== ユーザー一覧 ===");
  console.log(
    "ID".padEnd(4) + "名前".padEnd(7) + "メールアドレス".padEnd(11) + "年齢"
  );
  users.forEach((user: { id: any; name: any; email: any; age: any }) => {
    console.log(
      `${String(user.id).padEnd(4)}${String(user.name).padEnd(5)}${String(
        user.email
      ).padEnd(15)}${String(user.age).padStart(4)}`
    );
  });
  console.log("------------------");
  while (true) {
    const answer = readlineSync.question("Enterキーで戻る");
    if (answer.trim() === "") break;
  }
};

export const registerUser = async (connection) => {
  console.log("=== ユーザー登録 ===");
  let name: string;
  let email: string;
  let age: number;

  while (true) {
    name = readlineSync.question("名前を入力してください： ");
    if (validateName(name)) {
      break;
    } else {
      console.log("名前は空にできません。再入力してください。");
    }
  }

  while (true) {
    email = readlineSync.question("メールアドレスを入力してください： ");
    if (validateEmail(email)) {
      break;
    } else {
      console.log("有効なメールアドレスを入力してください。");
    }
  }

  while (true) {
    age = Number(readlineSync.question("年齢を入力してください： "));
    if (validateAge(age)) {
      break;
    } else {
      console.log("年齢は0〜120の間で入力してください。");
    }
  }

  const user = new User(name, email, age);

  console.log("");
  console.log("以下の内容で登録しますか？");
  console.log(`名前：${user.name}`);
  console.log(`メールアドレス：${user.email}`);
  console.log(`年齢：${user.age}`);
  console.log("");
  while (true) {
    const answer = readlineSync.question("登録しますか？（y/n）");
    if (answer === "y") {
      try {
        const [result, fields] = await connection.query(
          "INSERT INTO users(name,email,age) VALUES(?,?,?)",
          [user.name, user.email, user.age]
        );
        console.log("ユーザーが正常に登録されました。");
        break;
      } catch (error) {
        console.error("[エラー] このメールアドレスは既に登録されています");
        break;
      }
    } else {
      console.log("登録をキャンセルしました。");
      break;
    }
  }
};

export const updateUser = async (connection) => {
  console.log("===== ユーザー情報更新 =====");
  const userId = readlineSync.question(
    "更新するユーザーのIDを入力してください:"
  );

  const [rows] = await connection.query("SELECT * FROM `users` WHERE id = ?", [
    userId,
  ]);
  if (rows.length === 0) {
    console.log("指定されたIDのユーザーが存在しません。");
    return;
  }

  const userRow = rows[0];
  const user = new User(userRow.name, userRow.email, userRow.age);

  console.log("\n現在の情報：");
  console.log(`名前：${user.name}`);
  console.log(`メールアドレス：${user.email}`);
  console.log(`年齢：${user.age}\n`);

  while (true) {
    const nameInput = readlineSync.question(
      "新しい名前を入力してください（変更なしの場合はENTER）："
    );
    if (nameInput.trim() === "") break;

    if (validateName(nameInput)) {
      user.setName(nameInput);
      break;
    } else {
      console.log("名前は空にできません。再入力してください。");
    }
  }

  while (true) {
    const emailInput = readlineSync.question(
      "新しいメールアドレスを入力してください（変更なしの場合はENTER）："
    );
    if (emailInput.trim() === "") break;

    if (validateEmail(emailInput)) {
      user.setEmail(emailInput);
      break;
    } else {
      console.log("有効なメールアドレスを入力してください。");
    }
  }

  while (true) {
    const ageInput = readlineSync.question(
      "新しい年齢を入力してください（変更なしの場合はENTER）："
    );
    if (ageInput.trim() === "") break;

    const ageValue = Number(ageInput);
    if (validateAge(ageValue)) {
      user.setAge(ageValue);
      break;
    } else {
      console.log("年齢は0〜120の間で入力してください。");
    }
  }

  console.log("\n以下の内容で更新します：");
  console.log(`名前：${user.name}`);
  console.log(`メールアドレス：${user.email}`);
  console.log(`年齢：${user.age}\n`);

  while (true) {
    const answer = readlineSync.question("更新しますか？（y/n）");
    if (answer === "y") {
      await connection.query(
        "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
        [user.name, user.email, user.age, userId]
      );
      console.log("ユーザー情報を更新しました。");
      break;
    } else if (answer === "n") {
      console.log("更新をキャンセルしました。");
      break;
    }
  }
};

export const deleteUser = async (connection) => {
  console.log("===== ユーザー削除 =====");
  const userId = readlineSync.question(
    "削除するユーザーのIDを入力してください"
  );

  const [rows] = await connection.query("SELECT * FROM `users` where id = ?", [
    userId,
  ]);
  if (rows.length === 0) {
    console.log("指定されたIDのユーザーが存在しません。");
    return;
  }

  const userRow = rows[0];
  const user = new User(userRow.name, userRow.email, userRow.age);

  console.log("\n以下のユーザーを削除します：");
  console.log(`名前：${user.name}`);
  console.log(`メールアドレス：${user.email}`);
  console.log(`年齢：${user.age}\n`);

  while (true) {
    const answer = readlineSync.question("本当に削除しますか？（y/n）");
    if (answer === "y") {
      const [result, fields] = await connection.query(
        "DELETE FROM users WHERE id = ?",
        [userId]
      );
      console.log("ユーザーが削除されました。");
      break;
    } else if (answer === "n") break;
  }
};
