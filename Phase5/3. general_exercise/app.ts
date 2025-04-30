const readlineSync = require("readline-sync");
import { Student } from "./student";

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

const calculateMaxScore = (): number => {
  const maxScore: number = students.reduce((max, student): number => {
    if (student.score > max) {
      return student.score;
    } else {
      return max;
    }
  }, 0);
  return maxScore;
};

const calculateMinScore = (): number => {
  const minScore: number = students.reduce((min, student): number => {
    if (student.score < min) {
      return student.score;
    } else {
      return min;
    }
  }, 0);
  return minScore;
};

const calculateAverageScore = (): number => {
  const totalScore = students.reduce(
    (prev, current) => prev + current.score,
    0
  );
  const averageScore = Math.round(totalScore / students.length);
  return averageScore;
};

const calculateNumberOfStudentByEvaluation = () => {
  let groupByEvaluations: any[] = [];

  students.forEach((student) => {
    const evaluation = groupByEvaluations.find(
      (groupByEvaluation) => groupByEvaluation.evaluation === student.evaluation
    );

    if (evaluation) {
      evaluation.count += 1;
    } else {
      groupByEvaluations.push({ evaluation: student.evaluation, count: 1 });
    }
  });
  return groupByEvaluations;
};

const calculatePassRate = (): number => {
  const passNumber = students.filter((student) => student.score >= 60).length;
  const passRate = Math.round((passNumber / students.length) * 100);
  return passRate;
};

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

const showAnalyzedResult = () => {
  let maxScore: number = calculateMaxScore();
  let minScore: number = calculateMinScore();
  let averageScore: number = calculateAverageScore();
  let numberOfStudentByEvaluation = calculateNumberOfStudentByEvaluation();
  let passRate: number = calculatePassRate();
  console.log("");
  console.log("");
  console.log("=== 成績詳細 ===");
  console.log(`最高点：${maxScore}  最低点：${minScore}`);
  console.log(`平均点：${averageScore}`);
  numberOfStudentByEvaluation.forEach((group) => {
    process.stdout.write(`${group.evaluation}評価:${group.count}人  `);
  });
  console.log("");
  console.log(`合格率：${passRate}`);
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
    showAnalyzedResult();
  } else if (Number(selectedMenu) === 4) {
    break;
  }
}
