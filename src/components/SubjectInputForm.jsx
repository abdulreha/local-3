import React, { useEffect } from 'react';
import { getGradePointFromMarks, getGradePointFromLetter } from '../utils/gradeMapping';
import '../styles/SelectorGroup.css';

const CSE_4TH_SEM_SUBJECTS = [
  { name: 'Analyze and Design of Algorithm', credits: 3, code: 'BCS401' },
  { name: 'Microcontrollers', credits: 4, code: 'BCS402' },
  { name: 'Database Management System', credits: 4, code: 'BCS403' },
  { name: 'Analyze and Design of Algorithm Lab', credits: 1, code: 'BCSL404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCS40x' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course', credits: 1, code: 'BCS456X' },
  { name: 'Biology for Engineers', credits: 2, code: 'BBOK407' },
  { name: 'Universal Human Values Course', credits: 1, code: 'BUHK408' },
  { name: 'NSS / Sports / Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];

const ECE_4TH_SEM_SUBJECTS = [
  { name: 'Engineering Electromagnetics', credits: 3, code: 'BEC401' },
  { name: 'Basic Signal Processing', credits: 4, code: 'BEC402' },
  { name: 'Principles of Communication Systems', credits: 4, code: 'BEC403' },
  { name: 'Communication Laboratory', credits: 1, code: 'BECL404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCS40x' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course', credits: 1, code: 'BXX456X' },
  { name: 'Biology for Engineers', credits: 3, code: 'BBOK407' },
  { name: 'Universal Human Values Course', credits: 1, code: 'BUHK408' },
  { name: 'NSS / Sports / Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];

const isCSE4thSem = (semester, stream) => {
  if (semester !== '4th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase();
  return (
    s.includes('cse') ||
    s.includes('ise') ||
    s.includes('aiml')
  );
};

const isECE4thSem = (semester, stream) => {
    if (semester !== '4th') return false;
    if (!stream) return false;
    const s = stream.toLowerCase();
    // Match EC, ECE, Electronics, etc.
    return (
      s === 'ec' ||
      s === 'ece' ||
      s.includes('electronics') ||
      s.includes('ec branch') ||
      s.includes('ece branch')
    );
  };

const SubjectInputForm = ({ subjects, setSubjects, mode = 'sgpa', semester, stream }) => {
  // Auto-populate for CSE/ISE/AIML 4th sem
  useEffect(() => {
    if (mode === 'sgpa' && isCSE4thSem(semester, stream)) {
      setSubjects(CSE_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isECE4thSem(semester, stream)) {
      setSubjects(ECE_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    }
    // eslint-disable-next-line
  }, [semester, stream, mode]);

  // Handle marks input for CSE/ISE/AIML 4th sem
  const handleMarksChangeCSE = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for ECE 4th sem
  const handleMarksChangeECE = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // For all other cases, keep previous logic
  const handleChange = (idx, field, value) => {
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, [field]: value } : subj
    );
    setSubjects(updated);
  };

  const handleAdd = () => {
    setSubjects([
      ...subjects,
      mode === 'sgpa'
        ? { credits: '', marks: '', grade: '', gradePoint: '' }
        : { sgpa: '', credits: '' },
    ]);
  };

  const handleRemove = idx => {
    setSubjects(subjects.filter((_, i) => i !== idx));
  };

  const handleMarksOrGradeChange = (idx, field, value) => {
    let gradePoint = '';
    if (field === 'marks' && value !== '') {
      gradePoint = getGradePointFromMarks(Number(value));
    } else if (field === 'grade' && value !== '') {
      gradePoint = getGradePointFromLetter(value);
    }
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, [field]: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Render for CSE/ISE/AIML 4th sem
  if (mode === 'sgpa' && isCSE4thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 4th Semester | CSE / ISE / AIML</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={subj.code}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE(idx, e.target.value)}
                className="subject-input"
              />
              <span className="grade-point">GP: {subj.gradePoint}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for ECE 4th sem
  if (mode === 'sgpa' && isECE4thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 4th Semester | ECE</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={subj.code}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeECE(idx, e.target.value)}
                className="subject-input"
              />
              <span className="grade-point">GP: {subj.gradePoint}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default rendering for all other cases
  return (
    <div className="section-card">
      <h3>{mode === 'sgpa' ? 'Enter your marks for each subject' : 'Enter SGPA and credits for each semester'}</h3>
      {subjects.map((subj, idx) => (
        <div className="subject-card" key={idx}>
          {mode === 'sgpa' ? (
            <>
              <div className="subject-title">Subject {idx + 1}</div>
              <div className="subject-fields">
                <input
                  type="number"
                  min="0"
                  placeholder="Credits"
                  value={subj.credits}
                  onChange={e => handleChange(idx, 'credits', e.target.value)}
                  required
                  className="subject-input"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Marks"
                  value={subj.marks}
                  onChange={e => handleMarksOrGradeChange(idx, 'marks', e.target.value)}
                  className="subject-input"
                />
                <input
                  type="text"
                  maxLength="2"
                  placeholder="Grade (optional)"
                  value={subj.grade}
                  onChange={e => handleMarksOrGradeChange(idx, 'grade', e.target.value)}
                  className="subject-input"
                />
                <span className="grade-point">GP: {subj.gradePoint}</span>
              </div>
            </>
          ) : (
            <>
              <div className="subject-title">Semester {idx + 1}</div>
              <div className="subject-fields">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="SGPA"
                  value={subj.sgpa}
                  onChange={e => handleChange(idx, 'sgpa', e.target.value)}
                  required
                  className="subject-input"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Credits"
                  value={subj.credits}
                  onChange={e => handleChange(idx, 'credits', e.target.value)}
                  required
                  className="subject-input"
                />
              </div>
            </>
          )}
          <button type="button" onClick={() => handleRemove(idx)} disabled={subjects.length === 1} className="remove-btn">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAdd} className="add-btn">Add {mode === 'sgpa' ? 'Subject' : 'Semester'}</button>
    </div>
  );
};

export default SubjectInputForm; 