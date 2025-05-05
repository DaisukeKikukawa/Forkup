import readlineSync from "readline-sync";
import { validateName, validateEmail, validateAge } from "./validation.js";

export class User {
  private name: string;
  private email: string;
  private age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getAge(): number {
    return this.age;
  }

  setName(name: string): void {
    this.name = name;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setAge(age: number): void {
    this.age = age;
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
