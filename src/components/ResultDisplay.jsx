import React from 'react';

const getDivision = (value) => {
  if (value >= 7.75) return 'First Class with Distinction';
  if (value >= 6.75) return 'First Class';
  if (value >= 5.75) return 'Second Class';
  if (value >= 4.00) return 'Pass Class';
  return 'Fail';
};

const ResultDisplay = ({ sgpa, cgpa, percentage, mode = 'sgpa', semesters = [] }) => {
  const value = mode === 'sgpa' ? sgpa : cgpa;
  const division = getDivision(value);
  const showTable = mode === 'cgpa' && semesters && semesters.length > 0;
  const totalCredits = semesters.reduce((sum, s) => sum + Number(s.credits), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="result-display">
      <h3>Result</h3>
      {mode === 'sgpa' && (
        <p><strong>SGPA:</strong> {sgpa.toFixed(2)}</p>
      )}
      {mode === 'cgpa' && (
        <>
          <p><strong>CGPA:</strong> {cgpa.toFixed(2)}</p>
          {showTable && (
            <table className="cgpa-breakdown-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>SGPA</th>
                  <th>Credits</th>
                  <th>Weighted Contribution</th>
                </tr>
              </thead>
              <tbody>
                {semesters.map((s, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{Number(s.sgpa).toFixed(2)}</td>
                    <td>{s.credits}</td>
                    <td>{((Number(s.sgpa) * Number(s.credits)) / (totalCredits || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="print-btn" onClick={handlePrint}>Print Result</button>
        </>
      )}
      <p><strong>Percentage:</strong> {percentage}%</p>
      <p><strong>Division/Class:</strong> {division}</p>
    </div>
  );
};

export default ResultDisplay; 