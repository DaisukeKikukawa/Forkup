import readlineSync from "readline-sync";

const menuOptions: { id: number; menu: string }[] = [
  { id: 1, menu: "ユーザー一覧表示" },
  { id: 2, menu: "ユーザー登録" },
  { id: 3, menu: "ユーザー情報更新" },
  { id: 4, menu: "ユーザー削除" },
  { id: 5, menu: "終了" },
];

export const showMenu = (): string => {
  console.log("");
  console.log("");
  console.log("===== ユーザー管理システム =====");
  menuOptions.forEach((menuOption) => {
    console.log(`${menuOption.id}. ${menuOption.menu}`);
  });
  return readlineSync.question("選択してください（1-5）：");
};
