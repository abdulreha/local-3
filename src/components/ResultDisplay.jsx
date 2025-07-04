import React from 'react';

const getDivision = (value) => {
  if (value >= 7.75) return 'First Class with Distinction';
  if (value >= 6.75) return 'First Class';
  if (value >= 5.75) return 'Second Class';
  if (value >= 4.00) return 'Pass Class';
  return 'Fail';
};

const ResultDisplay = ({ sgpa, cgpa, percentage, mode = 'sgpa' }) => {
  const value = mode === 'sgpa' ? sgpa : cgpa;
  const division = getDivision(value);
  return (
    <div className="result-display">
      <h3>Result</h3>
      {mode === 'sgpa' && (
        <p><strong>SGPA:</strong> {sgpa.toFixed(2)}</p>
      )}
      {mode === 'cgpa' && (
        <p><strong>CGPA:</strong> {cgpa.toFixed(2)}</p>
      )}
      <p><strong>Percentage:</strong> {percentage}%</p>
      <p><strong>Division/Class:</strong> {division}</p>
    </div>
  );
};

export default ResultDisplay; 