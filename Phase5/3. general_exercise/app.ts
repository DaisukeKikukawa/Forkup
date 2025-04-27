const readlineSync = require("readline-sync");

const menuOptions: string[] = [
  "1. 点数入力",
  "2. 成績一覧表示",
  "3. 成績分析",
  "4. 終了",
];

const students: any[] = [];

const validateStudentInformation = (studentNumber: number): boolean => {
  if (studentNumber === 0) {
    console.log("入力は必須です");
    return false;
  } else if (Number.isNaN(studentNumber)) {
    console.log("半角数字を入力してください");
    return false;
  } else {
    return true;
  }
};

const validateDuplicateStudentNumber = (studentNumber: number): boolean => {
  if (students.find((student) => student.number === studentNumber)) {
    console.log("すでにその生徒番号は登録されています");
    return false;
  } else {
    return true;
  }
};

const validateStudentScore = (studentScore: number): boolean => {
  if (!(studentScore >= 0 && studentScore <= 100)) {
    console.log("1〜100までの数字を入力してください");
    return false;
  } else {
    return true;
  }
};

const inputStudentInformation = () => {
  let student = { number: 0, score: 0 };
  let studentNumber: number = 0;
  let studentScore: number = 0;

  while (true) {
    studentNumber = Number(
      readlineSync.question("生徒番号を入力してください：")
    );
    if (
      validateStudentInformation(studentNumber) &&
      validateDuplicateStudentNumber(studentNumber)
    ) {
      break;
    }
  }
  student.number = studentNumber;

  while (true) {
    studentScore = Number(readlineSync.question("成績を入力してください："));
    if (
      validateStudentInformation(studentScore) &&
      validateStudentScore(studentScore)
    ) {
      break;
    }
  }
  student.score = studentScore;

  students.push(student);
};

const showMenu = (): string => {
  console.log("");
  console.log("");
  console.log("=== メインメニュー ===");
  menuOptions.forEach((menuOption) => {
    console.log(menuOption);
  });
  return readlineSync.question("選択してください：");
};

while (true) {
  let selectedMenu: string = showMenu();
  if (Number(selectedMenu) === 1) {
    inputStudentInformation();
  } else if (Number(selectedMenu) === 2) {
  } else if (Number(selectedMenu) === 3) {
  } else if (Number(selectedMenu) === 4) {
    break;
  }
}
