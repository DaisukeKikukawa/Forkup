const readlineSync = require("readline-sync");
import {
  validateStudentNumberLargerThanZero,
  validateDuplicateStudentNumber,
  validateStudentScore,
} from "./validation";
import { Student } from "./student";

export const inputId = (students: Student[]): number => {
  while (true) {
    const id = Number(readlineSync.question("生徒番号を入力してください："));
    if (validateStudentNumberLargerThanZero(id)) {
      console.log("生徒番号は1以上で入力してください");
    } else if (validateDuplicateStudentNumber(id, students)) {
      console.log("その生徒番号はすでに登録済みです");
    } else {
      return id;
    }
  }
}

export const inputScore = (): number => {
  while (true) {
    const score = Number(readlineSync.question("成績を入力してください："));
    if (validateStudentScore(score)) {
      console.log("1〜100の数字を入力してください");
    } else {
      return score;
    }
  }
}
