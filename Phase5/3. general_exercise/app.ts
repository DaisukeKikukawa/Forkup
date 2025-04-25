const readlineSync = require("readline-sync");

let menu_options: string[] = [
  "1. 点数入力",
  "2. 成績一覧表示",
  "3. 成績分析",
  "4. 終了",
];

const showMenu = ():string => {
  console.log("=== メインメニュー ===");
  menu_options.forEach((menu_option) => {
    console.log(menu_option);
  });
  return readlineSync.question("選択してください：");
}

while(true) {
  let selected_menu: string = showMenu();
  if (Number(selected_menu) === 4) {
    break;
  }
}
