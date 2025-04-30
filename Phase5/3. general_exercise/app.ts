const readlineSync = require("readline-sync");

const menuOptions: string[] = [
  "1. 点数入力",
  "2. 成績一覧表示",
  "3. 成績分析",
  "4. 終了",
];

type Student = {
  id: number;
  score: number;
  evaluation: string;
};

const students: Student[] = [];

const validateStudentNumberLargerThanZero = (studentNumber: number): boolean => {
  return studentNumber <= 0;
};

const validateDuplicateStudentNumber = (studentNumber: number): boolean => {
  return students.some((student) => student.id === studentNumber);
};

const validateStudentScore = (studentScore: number): boolean => {
  return studentScore < 0 || studentScore > 100;
};

const convertScoreIntoEvaluation = (studentScore: number): string => {
  switch (true) {
    case studentScore >= 90 && studentScore <= 100:
      return "A";
    case studentScore >= 80 && studentScore <= 89:
      return "B";
    case studentScore >= 70 && studentScore <= 79:
      return "C";
    case studentScore >= 60 && studentScore <= 69:
      return "D";
    default:
      return "F";
  }
};

const inputStudentInformation = () => {
  let student: Student = { id: 0, score: 0, evaluation: "" };
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
  student.id = studentNumber;

  while (true) {
    studentScore = Number(readlineSync.question("成績を入力してください："));
    if (validateStudentScore(studentScore)) {
      console.log("1〜100の数字を入力してください")
    } else {
      break;
    }
  }
  student.score = studentScore;

  student.evaluation = convertScoreIntoEvaluation(studentScore);

  students.push(student);
};

const showStudentRecord = () => {
  console.log("=== 成績一覧 ===");
  console.log("生徒番号    点数    評価");

  students.forEach((student) => {
    console.log(
      `${String(student.id).padEnd(14)}${String(student.score).padEnd(9)}${
        student.evaluation
      }`
    );
  });
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
    showStudentRecord();
  } else if (Number(selectedMenu) === 3) {
  } else if (Number(selectedMenu) === 4) {
    break;
  }
}
