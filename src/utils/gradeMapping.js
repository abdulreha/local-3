// VTU 2022 Grade Mapping
export const gradeMapping = [
  { min: 90, max: 100, letter: ["O", "S"], point: 10 },
  { min: 80, max: 89, letter: ["A+", "A"], point: 9 },
  { min: 70, max: 79, letter: ["A", "B"], point: 8 },
  { min: 60, max: 69, letter: ["B+", "C"], point: 7 },
  { min: 55, max: 59, letter: ["B"], point: 6 },
  { min: 50, max: 54, letter: ["C"], point: 5 },
  { min: 40, max: 49, letter: ["P"], point: 4 },
  { min: 0, max: 39, letter: ["F"], point: 0 },
];

export function getGradePointFromMarks(marks) {
  for (const row of gradeMapping) {
    if (marks >= row.min && marks <= row.max) return row.point;
  }
  return 0;
}

export function getGradePointFromLetter(letter) {
  const l = letter.trim().toUpperCase();
  for (const row of gradeMapping) {
    if (row.letter.includes(l)) return row.point;
  }
  return 0;
} 