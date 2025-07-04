// Calculate CGPA
// semesters: [{ sgpa: number, credits: number }]
export function calculateCGPA(semesters) {
  let totalCredits = 0;
  let totalPoints = 0;
  for (const sem of semesters) {
    const credits = Number(sem.credits);
    const sgpa = Number(sem.sgpa);
    totalCredits += credits;
    totalPoints += credits * sgpa;
  }
  if (totalCredits === 0) return 0;
  return totalPoints / totalCredits;
} 