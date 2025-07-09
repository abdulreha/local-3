// Convert SGPA or CGPA to percentage as per VTU
export function sgpaToPercentage(sgpa) {
  return (Number(sgpa) * 10).toFixed(2);
} 