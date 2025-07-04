// Calculate SGPA
// subjects: [{ credits: number, marks?: number, gradePoint?: number }]
export function calculateSGPA(subjects) {
  let totalCredits = 0;
  let totalPoints = 0;
  for (const subj of subjects) {
    const credits = Number(subj.credits);
    const gradePoint = subj.gradePoint !== undefined ? Number(subj.gradePoint) : 0;
    totalCredits += credits;
    totalPoints += credits * gradePoint;
  }
  if (totalCredits === 0) return 0;
  return totalPoints / totalCredits;
} 