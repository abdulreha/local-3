import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SchemeSelector from './components/SchemeSelector';
import SemesterSelector from './components/SemesterSelector';
import StreamSelector from './components/StreamSelector';
import SubjectInputForm from './components/SubjectInputForm';
import ResultDisplay from './components/ResultDisplay';
import GradeTable from './components/GradeTable';
import { calculateSGPA } from './utils/calculateSGPA';
import { calculateCGPA } from './utils/calculateCGPA';
import { sgpaToPercentage } from './utils/percentage';
import './styles/main.css';

const App = () => {
  const [scheme, setScheme] = useState('2022');
  const [semester, setSemester] = useState('');
  const [stream, setStream] = useState('');
  const [department, setDepartment] = useState('');
  const [mode, setMode] = useState('sgpa'); // 'sgpa' or 'cgpa'
  const [subjects, setSubjects] = useState([
    { credits: '', marks: '', grade: '', gradePoint: '' },
  ]);
  const [semesters, setSemesters] = useState([
    { sgpa: '', credits: '' },
  ]);
  const [sgpa, setSGPA] = useState(0);
  const [cgpa, setCGPA] = useState(0);
  const [percentage, setPercentage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    if (mode === 'sgpa') {
      // Only include subjects with valid credits and gradePoint
      const validSubjects = subjects.filter(
        s => s.credits && (s.gradePoint !== '' && s.gradePoint !== undefined)
      ).map(s => ({ ...s, credits: Number(s.credits), gradePoint: Number(s.gradePoint) }));
      const sgpaValue = calculateSGPA(validSubjects);
      setSGPA(sgpaValue);
      setPercentage(sgpaToPercentage(sgpaValue));
      setShowResult(true);
    } else {
      // Only include semesters with valid sgpa and credits
      const validSemesters = semesters.filter(
        s => s.sgpa && s.credits
      ).map(s => ({ sgpa: Number(s.sgpa), credits: Number(s.credits) }));
      const cgpaValue = calculateCGPA(validSemesters);
      setCGPA(cgpaValue);
      setPercentage(sgpaToPercentage(cgpaValue));
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setScheme('2022');
    setSemester('');
    setStream('');
    setDepartment('');
    setSubjects([{ credits: '', marks: '', grade: '', gradePoint: '' }]);
    setSemesters([{ sgpa: '', credits: '' }]);
    setSGPA(0);
    setCGPA(0);
    setPercentage('');
    setShowResult(false);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="mode-toggle">
          <button onClick={() => setMode('sgpa')} className={mode === 'sgpa' ? 'active' : ''}>SGPA</button>
          <button onClick={() => setMode('cgpa')} className={mode === 'cgpa' ? 'active' : ''}>CGPA</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
          <SchemeSelector scheme={scheme} setScheme={setScheme} />
          <SemesterSelector semester={semester} setSemester={setSemester} />
          <StreamSelector
            semester={semester}
            stream={stream}
            setStream={setStream}
            department={department}
            setDepartment={setDepartment}
          />
          {mode === 'sgpa' ? (
            <SubjectInputForm subjects={subjects} setSubjects={setSubjects} mode="sgpa" />
          ) : (
            <SubjectInputForm subjects={semesters} setSubjects={setSemesters} mode="cgpa" />
          )}
          <div className="form-actions">
            <button type="submit">Calculate</button>
            <button type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
        <GradeTable />
        {showResult && (
          <ResultDisplay
            sgpa={sgpa}
            cgpa={cgpa}
            percentage={percentage}
            mode={mode}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App; 