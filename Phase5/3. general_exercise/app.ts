import inquirer from "inquirer";

const menu_selections: string[] = [
  "1.点数入力",
  "2.成績一覧表示",
  "3.成績分析",
  "4.終了",
];

async function showMenu() {
  while (true) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "menu_selection",
        message: "メニューを選択してください",
        choices: menu_selections,
      },
    ]);
    if (answers.menu_selection === "4.終了") {
      break;
    }
  }
}

showMenu();
