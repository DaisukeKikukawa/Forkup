const readlineSync = require("readline-sync");

const menuOptions: string[] = [
  "1. 点数入力",
  "2. 成績一覧表示",
  "3. 成績分析",
  "4. 終了",
];

const students: any[] = [];

const validateStudentNumberLargerThanZero = (studentNumber: number): boolean => {
  return studentNumber <= 0;
};

const validateDuplicateStudentNumber = (studentNumber: number): boolean => {
  return students.some((student) => student.id === studentNumber);
};

const validateStudentScore = (studentScore: number): boolean => {
  return studentScore < 0 || studentScore > 100;
};

const inputStudentInformation = () => {
  let student = { number: 0, score: 0 };
  let studentNumber: number = 0;
  let studentScore: number = 0;

  while (true) {
    studentNumber = Number(
      readlineSync.question("生徒番号を入力してください：")
    );
    if (validateStudentNumberLargerThanZero(studentNumber)) {
      console.log("生徒番号は1以上で入力してください")
    } else if (validateDuplicateStudentNumber(studentNumber)) {
      console.log("その生徒番号はすでに登録済みです")
    } else {
      break;
    }
  }
  student.number = studentNumber;

  while (true) {
    studentScore = Number(readlineSync.question("成績を入力してください："));
    if (validateStudentScore(studentScore)) {
      console.log("1〜100の数字を入力してください")
    } else {
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
