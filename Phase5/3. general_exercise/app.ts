const readlineSync = require("readline-sync");
import { Student } from "./student";
import { showMenu } from "./menu";
import {
  validateStudentNumberLargerThanZero,
  validateDuplicateStudentNumber,
  validateStudentScore,
} from "./validation";
import { convertScoreIntoEvaluation, showAnalyzedScore } from "./analyzeScore";

const students: Student[] = [];

const inputStudentInformation = () => {
  const student = new Student();

  while (true) {
    student.id = Number(readlineSync.question("生徒番号を入力してください："));
    if (validateStudentNumberLargerThanZero(student.id)) {
      console.log("生徒番号は1以上で入力してください");
    } else if (validateDuplicateStudentNumber(student.id,students)) {
      console.log("その生徒番号はすでに登録済みです");
    } else {
      break;
    }
  }

  while (true) {
    student.score = Number(readlineSync.question("成績を入力してください："));
    if (validateStudentScore(student.score)) {
      console.log("1〜100の数字を入力してください")
    } else {
      break;
    }
  }

  student.evaluation = convertScoreIntoEvaluation(student.score);

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

while (true) {
  let selectedMenu: string = showMenu();
  if (Number(selectedMenu) === 1) {
    inputStudentInformation();
  } else if (Number(selectedMenu) === 2) {
    showStudentRecord();
  } else if (Number(selectedMenu) === 3) {
    showAnalyzedScore(students);
  } else if (Number(selectedMenu) === 4) {
    break;
  }
}
