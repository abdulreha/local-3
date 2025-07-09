// Calculate CGPA as the average of entered SGPA values (ignore credits)
export function calculateCGPA(semesters) {
  const valid = semesters.filter(s => s.sgpa && !isNaN(Number(s.sgpa)));
  if (valid.length === 0) return 0;
  const sum = valid.reduce((acc, s) => acc + Number(s.sgpa), 0);
  return sum / valid.length;
} 