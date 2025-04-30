import { Student } from "./student";

export const validateStudentNumberLargerThanZero = (
  studentId: number
): boolean => {
  return studentId <= 0;
};

export const validateDuplicateStudentNumber = (
  studentId: number,
  students: Student[]
): boolean => {
  return students.some((student) => student.id === studentId);
};

export const validateStudentScore = (studentScore: number): boolean => {
  return studentScore < 0 || studentScore > 100;
};
