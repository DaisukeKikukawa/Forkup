const readlineSync = require("readline-sync");
import { convertScoreIntoEvaluation } from "./analyzeScore";
import {
  validateStudentNumberLargerThanZero,
  validateDuplicateStudentNumber,
  validateStudentScore,
} from "./validation";
export class Student {
  id: number;
  score: number;
  evaluation: string;

  constructor() {
    this.id = 0;
    this.score = 0;
    this.evaluation = "";
  }
}

export const inputStudentInformation = (students: Student[]) => {
  const student = new Student();

  while (true) {
    student.id = Number(readlineSync.question("生徒番号を入力してください："));
    if (validateStudentNumberLargerThanZero(student.id)) {
      console.log("生徒番号は1以上で入力してください");
    } else if (validateDuplicateStudentNumber(student.id, students)) {
      console.log("その生徒番号はすでに登録済みです");
    } else {
      break;
    }
  }

  while (true) {
    student.score = Number(readlineSync.question("成績を入力してください："));
    if (validateStudentScore(student.score)) {
      console.log("1〜100の数字を入力してください");
    } else {
      break;
    }
  }

  student.evaluation = convertScoreIntoEvaluation(student.score);

  students.push(student);
};

export const showStudentRecord = (students: Student[]) => {
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
