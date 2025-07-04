import React from 'react';
import { gradeMapping } from '../utils/gradeMapping';

const GradeTable = () => (
  <table className="grade-table">
    <thead>
      <tr>
        <th>Marks Range</th>
        <th>Letter Grade</th>
        <th>Grade Point</th>
      </tr>
    </thead>
    <tbody>
      {gradeMapping.map((row, idx) => (
        <tr key={idx}>
          <td>{row.min}-{row.max}</td>
          <td>{row.letter.join('/')}</td>
          <td>{row.point}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default GradeTable; 