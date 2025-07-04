import React from 'react';
import '../styles/SelectorGroup.css';

const semesters = [
  { label: 'Physics Cycle', value: 'P-cycle' },
  { label: 'Chemistry Cycle', value: 'C-cycle' },
  { label: '3rd Semester', value: '3rd' },
  { label: '4th Semester', value: '4th' },
  { label: '5th Semester', value: '5th' },
  { label: '6th Semester', value: '6th' },
  { label: '7th Semester', value: '7th' },
  { label: '8th Semester', value: '8th' },
];

const SemesterSelector = ({ semester, setSemester }) => (
  <div className="section-card">
    <h3>Choose Semester:</h3>
    <div className="selector-group">
      {semesters.map(s => (
        <button
          key={s.value}
          className={`selector-btn${semester === s.value ? ' selected' : ''}`}
          onClick={() => setSemester(s.value)}
          type="button"
        >
          {s.label}
        </button>
      ))}
    </div>
    <div className="selected-label">selected semester: <b>{semesters.find(s => s.value === semester)?.label || ''}</b></div>
  </div>
);

export default SemesterSelector; 