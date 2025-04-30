import { Student } from "./student";

export const convertScoreIntoEvaluation = (studentScore: number): string => {
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

export const calculateMaxScore = (students: Student[]): number => {
  const maxScore: number = students.reduce((max, student): number => {
    if (student.score > max) {
      return student.score;
    } else {
      return max;
    }
  }, 0);
  return maxScore;
};

export const calculateMinScore = (students: Student[]): number => {
  const minScore: number = students.reduce((min, student): number => {
    if (student.score < min) {
      return student.score;
    } else {
      return min;
    }
  }, 0);
  return minScore;
};

export const calculateAverageScore = (students: Student[]): number => {
  const totalScore = students.reduce(
    (prev, current) => prev + current.score,
    0
  );
  const averageScore = Math.round(totalScore / students.length);
  return averageScore;
};

export const calculateNumberOfStudentByEvaluation = (students: Student[]) => {
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

export const calculatePassRate = (students: Student[]): number => {
  const passNumber = students.filter((student) => student.score >= 60).length;
  const passRate = Math.round((passNumber / students.length) * 100);
  return passRate;
};
