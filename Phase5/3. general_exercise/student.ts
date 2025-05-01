import { convertScoreIntoEvaluation } from "./analyzeScore";
import { inputId, inputScore  } from "./inputStudentData";
export class Student {
  private id: number;
  private score: number;
  private evaluation: string;

  constructor(id: number, score: number, evaluation: string) {
    this.id = id;
    this.score = score;
    this.evaluation = evaluation;
  }

  getId(): number {
    return this.id;
  }

  getScore(): number {
    return this.score;
  }

  getEvaluation(): string {
    return this.evaluation;
  }
}

export const registerStudent = (students: Student[]) => {
  const id = inputId(students);
  const score = inputScore();
  const evaluation = convertScoreIntoEvaluation(score);
  const student = new Student(id, score, evaluation);
  students.push(student);
};

export const showStudentRecord = (students: Student[]) => {
  console.log("=== 成績一覧 ===");
  console.log("生徒番号    点数    評価");

  students.forEach((student) => {
    console.log(
      `${String(student.getId()).padEnd(14)}${String(student.getScore()).padEnd(9)}${
        student.getEvaluation()
      }`
    );
  });
};
