const readlineSync = require("readline-sync");
import { inputStudentInformation, showStudentRecord, Student,  } from "./student";
import { showMenu } from "./menu";
import { convertScoreIntoEvaluation, showAnalyzedScore } from "./analyzeScore";

const students: Student[] = [];

while (true) {
  let selectedMenu: string = showMenu();
  if (Number(selectedMenu) === 1) {
    inputStudentInformation(students);
  } else if (Number(selectedMenu) === 2) {
    showStudentRecord(students);
  } else if (Number(selectedMenu) === 3) {
    showAnalyzedScore(students);
  } else if (Number(selectedMenu) === 4) {
    break;
  }
}
