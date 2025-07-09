import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

// Home page with cards
function Home({ onSelect }) {
  const navigate = useNavigate();
  return (
    <div className="home-cards-container">
      <div className="home-card">
        <p>Here you can calculate your sgpa</p>
        <button className="home-card-btn" onClick={() => navigate('/sgpa')}>VTU SGPA Calculator</button>
      </div>
      <div className="home-card">
        <p>Here you can calculate your cgpa</p>
        <button className="home-card-btn" onClick={() => navigate('/cgpa')}>VTU CGPA Calculator</button>
      </div>
      <div className="home-card">
        <p>Here you can calculate your percentage</p>
        <button className="home-card-btn" onClick={() => navigate('/cgpa')}>VTU Percentage Calculator</button>
      </div>
    </div>
  );
}

function SgpaCalculator(props) {
  const [scheme, setScheme] = useState('2022');
  const [semester, setSemester] = useState('');
  const [stream, setStream] = useState('');
  const [department, setDepartment] = useState('');
  const [subjects, setSubjects] = useState([
    { credits: '', marks: '', grade: '', gradePoint: '' },
  ]);
  const [sgpa, setSGPA] = useState(0);
  const [percentage, setPercentage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleCalculate = () => {
    const validSubjects = subjects.filter(
      s => s.credits && (s.gradePoint !== '' && s.gradePoint !== undefined)
    ).map(s => ({ ...s, credits: Number(s.credits), gradePoint: Number(s.gradePoint) }));
    const sgpaValue = calculateSGPA(validSubjects);
    setSGPA(sgpaValue);
    setPercentage(sgpaToPercentage(sgpaValue));
    setShowResult(true);
  };
  const handleReset = () => {
    setScheme('2022');
    setSemester('');
    setStream('');
    setDepartment('');
    setSubjects([{ credits: '', marks: '', grade: '', gradePoint: '' }]);
    setSGPA(0);
    setPercentage('');
    setShowResult(false);
  };
  return (
    <div className={`calculator-transition${transitioning ? ' transitioning' : ''} sgpa`}>
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
        <SubjectInputForm subjects={subjects} setSubjects={setSubjects} mode="sgpa" />
        <div className="form-actions">
          <button type="submit">Calculate</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      <GradeTable />
      {showResult && (
        <ResultDisplay
          sgpa={sgpa}
          cgpa={0}
          percentage={percentage}
          mode="sgpa"
          semesters={[]}
        />
      )}
    </div>
  );
}

function CgpaCalculator(props) {
  const [semesters, setSemesters] = useState([
    { sgpa: '', credits: '' },
  ]);
  const [cgpa, setCGPA] = useState(0);
  const [percentage, setPercentage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleCalculate = () => {
    const validSemesters = semesters.filter(
      s => s.sgpa
    ).map(s => ({ sgpa: Number(s.sgpa), credits: Number(s.credits) }));
    const cgpaValue = calculateCGPA(validSemesters);
    setCGPA(cgpaValue);
    setPercentage(sgpaToPercentage(cgpaValue));
    setShowResult(true);
  };
  const handleReset = () => {
    setSemesters([{ sgpa: '', credits: '' }]);
    setCGPA(0);
    setPercentage('');
    setShowResult(false);
  };
  return (
    <div className={`calculator-transition${transitioning ? ' transitioning' : ''} cgpa`}>
      <form onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
        <SubjectInputForm subjects={semesters} setSubjects={setSemesters} mode="cgpa" />
        <div className="form-actions">
          <button type="submit">Calculate</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      {showResult && (
        <ResultDisplay
          sgpa={0}
          cgpa={cgpa}
          percentage={percentage}
          mode="cgpa"
          semesters={semesters}
        />
      )}
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sgpa" element={<SgpaCalculator />} />
            <Route path="/cgpa" element={<CgpaCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 