const readlineSync = require("readline-sync");

const menuOptions: { id: number; menu: string }[] = [
  { id: 1, menu: "点数入力" },
  { id: 2, menu: "成績一覧表示" },
  { id: 3, menu: "成績分析" },
  { id: 4, menu: "終了" },
];

export const showMenu = (): string => {
  console.log("");
  console.log("");
  console.log("=== メインメニュー ===");
  menuOptions.forEach((option) => {
    console.log(`${option.id}. ${option.menu}`);
  });
  return readlineSync.question("選択してください：");
};
