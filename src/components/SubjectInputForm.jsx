import React, { useEffect, useRef } from 'react';
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

const EEE_4TH_SEM_SUBJECTS = [
  { name: 'Electric Motors', credits: 3, code: 'BEE401' },
  { name: 'Transmission and Distribution', credits: 4, code: 'BEE402' },
  { name: 'Microcontrollers', credits: 4, code: 'BEE403' },
  { name: 'Electric Motors lab', credits: 1, code: 'BEEL404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BEE405x' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course- IV', credits: 1, code: 'BEE456x' },
  { name: 'Biology For Engineers', credits: 3, code: 'BBOK407' },
  { name: 'Universal human values course', credits: 1, code: 'BUHK408' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];

const CIVIL_4TH_SEM_SUBJECTS = [
  { name: 'Analysis of Structures', credits: 3, code: 'BCV401' },
  { name: 'Fluid Mechanics and Hydraulics', credits: 4, code: 'BCV402' },
  { name: 'Transportation Engineering', credits: 4, code: 'BCV403' },
  { name: 'Building Materials Testing Lab', credits: 1, code: 'BCV404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCV405x' },
  { name: 'AEC/SEC-IV (Ability/Skill Enhancement Course)', credits: 1, code: 'BCV456x' },
  { name: 'Biology For Engineers', credits: 3, code: 'BBOK407' },
  { name: 'Universal Human Values Course', credits: 1, code: 'BUHK408' },
  { name: 'NSS / PE / Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];

const MECH_4TH_SEM_SUBJECTS = [
  { name: 'Applied Thermodynamics', credits: 3, code: 'BME401' },
  { name: 'Machining Science & Metrology', credits: 4, code: 'BME402' },
  { name: 'Fluid Mechanics', credits: 4, code: 'BME403' },
  { name: 'Mechanical Measurements and Metrology Lab', credits: 1, code: 'BME404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BME405x' },
  { name: 'AEC/SEC-IV (Ability/Skill Enhancement Course)', credits: 1, code: 'BME456x' },
  { name: 'Biology For Engineers', credits: 3, code: 'BBOK407' },
  { name: 'Universal Human Values Course', credits: 1, code: 'BUHK408' },
  { name: 'NSS / PE / Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];

const PHYSICS_CIVIL_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II', credits: 4, code: 'BMATCx01' },
  { name: 'Applied Physics for Civil Engineering Stream', credits: 4, code: 'BPHYCx02' },
  { name: 'Engineering Mechanics', credits: 3, code: 'BCIVCx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const PHYSICS_CSE_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for CSE Stream', credits: 4, code: 'BMATSx01' },
  { name: 'Applied Physics for CSE Stream', credits: 4, code: 'BPHYSx02' },
  { name: 'Principles of Programming Using C', credits: 3, code: 'BPOPSx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const PHYSICS_ELEC_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for EEE Stream', credits: 4, code: 'BMATEx01' },
  { name: 'Applied Physics for EEE Stream', credits: 4, code: 'BPHYEx02' },
  { name: 'Elementsof Electrical Engineering/ Basic Electronicsfor EEE stream', credits: 3, code: 'BEEEx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const PHYSICS_MECH_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for Mechanical Engg Stream', credits: 4, code: 'BMATMx01' },
  { name: 'Applied Physics for ME Stream', credits: 4, code: 'BPHYMx02' },
  { name: 'Elements of Mechanical Engineering', credits: 3, code: 'BEMEMx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
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

const isEEE4thSem = (semester, stream) => {
  if (semester !== '4th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase();
  return (
    s === 'eee' ||
    s.includes('eee branch') ||
    s.includes('electrical and electronics')
  );
};

const isCivil4thSem = (semester, stream) => {
  if (semester !== '4th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase();
  return (
    s === 'civil engineering' ||
    s === 'civil' ||
    s.includes('civil branch')
  );
};

const isMech4thSem = (semester, stream) => {
  if (semester !== '4th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase();
  return (
    s === 'mechanical engineering' ||
    s === 'mechanical' ||
    s.includes('mech branch')
  );
};

const isPhysicsCycleCivil = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  // Accept 'physics cycle', 'p-cycle', 'p cycle', etc.
  const isPhysics = sem.includes('physics cycle') || sem.includes('p-cycle') || sem.includes('p cycle');
  const isCivil =
    s.includes('civil engineering') ||
    s.includes('civil') ||
    s.includes('cv') ||
    s.includes('ev') ||
    s.includes('tr') ||
    s.includes('cc');
  return isPhysics && isCivil;
};

const isPhysicsCycleCSE = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  // Accept 'physics cycle', 'p-cycle', 'p cycle', etc. in semester
  // Accept cse/isc/bt/cse stream/cse scheme in stream
  const isPhysics = sem.includes('physics cycle') || sem.includes('p-cycle') || sem.includes('p cycle');
  const isCSE =
    s.includes('cse stream') ||
    s.includes('cse scheme') ||
    s.includes('cse') ||
    s.includes('isc') ||
    s.includes('bt');
  return isPhysics && isCSE;
};

const isPhysicsCycleElec = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  // Accept 'physics cycle', 'p-cycle', 'p cycle', etc. in semester
  // Accept eee/ece/etc/bm/ie/ml/electrical engg science streams in stream
  const isPhysics = sem.includes('physics cycle') || sem.includes('p-cycle') || sem.includes('p cycle');
  const isElec =
    s.includes('electrical engg science') ||
    s.includes('eee') ||
    s.includes('ece') ||
    s.includes('etc') ||
    s.includes('bm') ||
    s.includes('ie') ||
    s.includes('ml');
  return isPhysics && isElec;
};

const isPhysicsCycleMech = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  // Accept 'physics cycle', 'p-cycle', 'p cycle', etc. in semester
  // Accept ae/as/au/me/ip/im/ch/sx/tx/mechanical engineering streams in stream
  const isPhysics = sem.includes('physics cycle') || sem.includes('p-cycle') || sem.includes('p cycle');
  const isMech =
    s.includes('mechanical engineering') ||
    s.includes('ae') ||
    s.includes('as') ||
    s.includes('au') ||
    s.includes('me') ||
    s.includes('ip') ||
    s.includes('im') ||
    s.includes('ch') ||
    s.includes('sx') ||
    s.includes('tx');
  return isPhysics && isMech;
};

const SubjectInputForm = ({ subjects, setSubjects, mode = 'sgpa', semester, stream, firstInputRef }) => {
  // Debug log for both CSE and Civil Physics Cycle
  console.log('semester:', semester, 'stream:', stream, 'isPhysicsCycleCivil:', isPhysicsCycleCivil(semester, stream), 'isPhysicsCycleCSE:', isPhysicsCycleCSE(semester, stream));
  // Auto-populate for CSE/ISE/AIML 4th sem\
  useEffect(() => {
    if (mode === 'sgpa' && isCSE4thSem(semester, stream)) {
      setSubjects(CSE_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isECE4thSem(semester, stream)) {
      setSubjects(ECE_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isEEE4thSem(semester, stream)) {
      setSubjects(EEE_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCivil4thSem(semester, stream)) {
      setSubjects(CIVIL_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isMech4thSem(semester, stream)) {
      setSubjects(MECH_4TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isPhysicsCycleCSE(semester, stream)) {
      setSubjects(PHYSICS_CSE_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isPhysicsCycleElec(semester, stream)) {
      setSubjects(PHYSICS_ELEC_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isPhysicsCycleMech(semester, stream)) {
      setSubjects(PHYSICS_MECH_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isPhysicsCycleCivil(semester, stream)) {
      setSubjects(PHYSICS_CIVIL_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
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

  // Handle marks input for EEE 4th sem
  const handleMarksChangeEEE = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Civil 4th sem
  const handleMarksChangeCivil = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Mechanical 4th sem
  const handleMarksChangeMech = (idx, value) => {
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

  // Add refs for marks inputs
  const marksRefs = useRef([]);
  const sgpaRefs = useRef([]); // Always declare at top

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
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
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
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              <span className="grade-point">GP: {subj.gradePoint}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for EEE 4th sem
  if (mode === 'sgpa' && isEEE4thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 4th Semester | EEE</h3>
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
                onChange={e => handleMarksChangeEEE(idx, e.target.value)}
                className="subject-input"
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              <span className="grade-point">GP: {subj.gradePoint}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for Civil 4th sem
  if (mode === 'sgpa' && isCivil4thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 4th Semester | Civil</h3>
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
                onChange={e => handleMarksChangeCivil(idx, e.target.value)}
                className="subject-input"
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              {/* For NSS/PE/Yoga (credits 0), marks will not be considered in SGPA calculation. This must be handled in the SGPA calculation logic. */}
              <span className="grade-point">GP: {subj.credits !== 0 ? `GP: ${subj.gradePoint}` : ''}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for Mechanical 4th sem
  if (mode === 'sgpa' && isMech4thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 4th Semester | Mechanical</h3>
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
                onChange={e => handleMarksChangeMech(idx, e.target.value)}
                className="subject-input"
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              {/* For NSS/PE/Yoga (credits 0), marks will not be considered in SGPA calculation. This must be handled in the SGPA calculation logic. */}
              <span className="grade-point">GP: {subj.credits !== 0 ? `GP: ${subj.gradePoint}` : ''}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for Physics Cycle Civil Engineering
  if (mode === 'sgpa' && isPhysicsCycleCivil(semester, stream)) {
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Physics Cycle | Civil Engineering Stream<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(CV/EV/TR/CC) branch</span>
        </h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={subj.code + '-' + idx} style={{ background: '#e8edff', borderRadius: '16px', padding: '1.1rem 1.2rem 1.3rem 1.2rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1.5px solid #dbeafe' }}>
            <div className="subject-title" style={{ color: '#1e40af', fontWeight: 700, fontSize: '1.35rem', marginBottom: '0.3rem' }}>{subj.name}</div>
            <div style={{ color: '#3853a3', fontSize: '1.08rem', marginBottom: '1.1rem', fontWeight: 500 }}>
              Code: {subj.code} | Credits: {subj.credits}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCivil(idx, e.target.value)}
                className="subject-input"
                style={{ flex: 1, fontSize: '1.08rem', borderRadius: '8px', border: '1.5px solid #bcd0fa', background: '#fff', marginRight: '0.7rem' }}
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              <span style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 600, fontSize: '1.08rem', borderRadius: '8px', padding: '0.18rem 0.8rem', marginLeft: '0.2rem', border: '1.2px solid #bcd0fa', minWidth: '48px', textAlign: 'center' }}>
                GP: {subj.gradePoint || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for Physics Cycle CSE Stream Scheme
  if (mode === 'sgpa' && isPhysicsCycleCSE(semester, stream)) {
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Physics Cycle | CSE Stream Scheme<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(CSE/ISC/BT) branch</span>
        </h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={subj.code + '-' + idx} style={{ background: '#e8edff', borderRadius: '16px', padding: '1.1rem 1.2rem 1.3rem 1.2rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1.5px solid #dbeafe' }}>
            <div className="subject-title" style={{ color: '#1e40af', fontWeight: 700, fontSize: '1.35rem', marginBottom: '0.3rem' }}>credits: {subj.credits}{subj.name}</div>
            <div style={{ color: '#3853a3', fontSize: '1.08rem', marginBottom: '1.1rem', fontWeight: 500 }}>
              {subj.code}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE(idx, e.target.value)}
                className="subject-input"
                style={{ flex: 1, fontSize: '1.08rem', borderRadius: '8px', border: '1.5px solid #bcd0fa', background: '#fff', marginRight: '0.7rem' }}
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              <span style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 600, fontSize: '1.08rem', borderRadius: '8px', padding: '0.18rem 0.8rem', marginLeft: '0.2rem', border: '1.2px solid #bcd0fa', minWidth: '48px', textAlign: 'center' }}>
                GP: {subj.gradePoint || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for Physics Cycle Electrical Engg Science Streams
  if (mode === 'sgpa' && isPhysicsCycleElec(semester, stream)) {
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Physics Cycle | Electrical Engg Science Streams<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(EEE/ECE/ETC/BM/IE/ML) branch</span>
        </h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={subj.code + '-' + idx} style={{ background: '#e8edff', borderRadius: '16px', padding: '1.1rem 1.2rem 1.3rem 1.2rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1.5px solid #dbeafe' }}>
            <div className="subject-title" style={{ color: '#1e40af', fontWeight: 700, fontSize: '1.35rem', marginBottom: '0.3rem' }}>credits: {subj.credits}{subj.name}</div>
            <div style={{ color: '#3853a3', fontSize: '1.08rem', marginBottom: '1.1rem', fontWeight: 500 }}>
              {subj.code}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE(idx, e.target.value)}
                className="subject-input"
                style={{ flex: 1, fontSize: '1.08rem', borderRadius: '8px', border: '1.5px solid #bcd0fa', background: '#fff', marginRight: '0.7rem' }}
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              <span style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 600, fontSize: '1.08rem', borderRadius: '8px', padding: '0.18rem 0.8rem', marginLeft: '0.2rem', border: '1.2px solid #bcd0fa', minWidth: '48px', textAlign: 'center' }}>
                GP: {subj.gradePoint || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render for Physics Cycle Mechanical Engineering Streams
  if (mode === 'sgpa' && isPhysicsCycleMech(semester, stream)) {
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Physics Cycle | Mechanical Engineering Streams<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(AE/AS/AU/ME/IP/IM/CH/SX/TX) branch</span>
        </h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={subj.code + '-' + idx} style={{ background: '#e8edff', borderRadius: '16px', padding: '1.1rem 1.2rem 1.3rem 1.2rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1.5px solid #dbeafe' }}>
            <div className="subject-title" style={{ color: '#1e40af', fontWeight: 700, fontSize: '1.35rem', marginBottom: '0.3rem' }}>credits: {subj.credits}{subj.name}</div>
            <div style={{ color: '#3853a3', fontSize: '1.08rem', marginBottom: '1.1rem', fontWeight: 500 }}>
              {subj.code}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE(idx, e.target.value)}
                className="subject-input"
                style={{ flex: 1, fontSize: '1.08rem', borderRadius: '8px', border: '1.5px solid #bcd0fa', background: '#fff', marginRight: '0.7rem' }}
                ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (marksRefs.current[idx + 1]) {
                      marksRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
              <span style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 600, fontSize: '1.08rem', borderRadius: '8px', padding: '0.18rem 0.8rem', marginLeft: '0.2rem', border: '1.2px solid #bcd0fa', minWidth: '48px', textAlign: 'center' }}>
                GP: {subj.gradePoint || ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default rendering for all other cases
  if (mode === 'cgpa') {
    // Always show 8 semesters for CGPA
    const semesterLabels = [
      '1st Semester SGPA',
      '2nd Semester SGPA',
      '3rd Semester SGPA',
      '4th Semester SGPA',
      '5th Semester SGPA',
      '6th Semester SGPA',
      '7th Semester SGPA',
      '8th Semester SGPA',
    ];
    // Ensure subjects array has 8 items
    while (subjects.length < 8) {
      subjects.push({ sgpa: '' });
    }
    return (
      <div className="cgpa-input-card">
        <div className="cgpa-note">(Leave blank if you don't have SGPA)</div>
        <div className="cgpa-grid">
          {semesterLabels.map((label, idx) => (
            <div className="cgpa-grid-item" key={idx}>
              <label>{label}</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                placeholder="SGPA"
                value={subjects[idx].sgpa}
                onChange={e => handleChange(idx, 'sgpa', e.target.value)}
                className="subject-input"
                ref={el => sgpaRefs.current[idx] = el}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (sgpaRefs.current[idx + 1]) {
                      sgpaRefs.current[idx + 1].focus();
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
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
                  ref={idx === 0 && firstInputRef ? firstInputRef : el => marksRefs.current[idx] = el}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (marksRefs.current[idx + 1]) {
                        marksRefs.current[idx + 1].focus();
                      }
                    }
                  }}
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