import React, { useEffect, useRef } from 'react';
import { getGradePointFromMarks, getGradePointFromLetter } from '../utils/gradeMapping';
import '../styles/SelectorGroup.css';

const CSE_3RD_SEM_SUBJECTS = [
  { name: 'Mathematics for Computer Science', credits: 4, code: 'BCS301' },
  { name: 'Digital Design & Computer Organization', credits: 4, code: 'BCS302' },
  { name: 'Operating Systems', credits: 4, code: 'BCS303' },
  { name: 'Data Structures and Applications', credits: 3, code: 'BCS304' },
  { name: 'Data Structures Lab', credits: 1, code: 'BCSL305' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCS306x' },
  { name: 'Social Connect and Responsibility', credits: 1, code: 'BSCK307' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course - III', credits: 1, code: 'BCS358x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK359/BPEK359/BYOK359' },
];

const ECE_3RD_SEM_SUBJECTS = [
  { name: 'AV Mathematics-III for EC Engineering', credits: 3, code: 'BMATEC301' },
  { name: 'Digital System Design using Verilog', credits: 4, code: 'BEC302' },
  { name: 'Electronic Principles and Circuits', credits: 4, code: 'BEC303' },
  { name: 'Network Analysis', credits: 3, code: 'BEC304' },
  { name: 'Analog and Digital Systems Design Lab', credits: 1, code: 'BECL305' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BXX306x' },
  { name: 'Social Connect and Responsibility', credits: 1, code: 'BSCK307' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course III', credits: 1, code: 'BXX358x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK359/BPEK359/BYOK359' },
];

const EEE_3RD_SEM_SUBJECTS = [
  { name: 'Engineering Mathematics for EEE', credits: 3, code: 'BMATE301' },
  { name: 'Electric Circuit Analysis', credits: 4, code: 'BEE302' },
  { name: 'Analog Electronic Circuits', credits: 4, code: 'BEE303' },
  { name: 'Transformers and Generators', credits: 3, code: 'BEE304' },
  { name: 'Transformers and Generators lab', credits: 1, code: 'BEEL305' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BEE306x' },
  { name: 'Social Connect and Responsibility', credits: 1, code: 'BSCK307' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course III', credits: 1, code: 'BEE358x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK359/BPEK359/BYOK359' },
];

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

const CHEMISTRY_CIVIL_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for Civil Engg stream', credits: 4, code: 'BMATCx01' },
  { name: 'Applied Chemistry for Civil Engineering Stream', credits: 4, code: 'BCHECx02' },
  { name: 'Computer-Aided Engineering Drawing', credits: 3, code: 'BCEDKx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const CHEMISTRY_CSE_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for CSE Stream', credits: 4, code: 'BMATMx01' },
  { name: 'Applied Chemistry for CSE Stream', credits: 4, code: 'BCHEMx02' },
  { name: 'Principles of Programming Using C', credits: 3, code: 'BPOPSx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const CHEMISTRY_ELEC_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for EEE Stream', credits: 4, code: 'BMATEx01' },
  { name: 'Applied Chemistry for EEE Stream', credits: 4, code: 'BCHEEx02' },
  { name: 'Elementsof Electrical Engineering/ Basic Electronicsfor EEE stream', credits: 3, code: 'BEEEx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const CHEMISTRY_MECH_CYCLE_SUBJECTS = [
  { name: 'Mathematics - I/II for Mechanical Engg Stream', credits: 4, code: 'BMATMx01' },
  { name: 'Applied Chemistry for ME Stream', credits: 4, code: 'BCHEMx02' },
  { name: 'Computer-Aided Engineering Drawing', credits: 3, code: 'BEMEMx03' },
  { name: 'Engineering Science Course - I/II', credits: 3, code: 'BESCKx04x' },
  { name: 'Emerging Technology Course - I/II OR Programming Language Course - I/II', credits: 3, code: 'BETCKx05x / BPLCKx05x' },
  { name: 'Communicative English OR Professional Writing Skills in English', credits: 1, code: 'BENGKx06 / BPWSKx06' },
  { name: 'Samskrutika Kannada / Balake Kannada OR Indian Constitution', credits: 1, code: 'BKSKKx07 / BKBKKx07 OR BICOKx07' },
  { name: 'Innovation and Design Thinking OR Scientific Foundations of Health', credits: 1, code: 'BIDTKx58 / BSFHKx58' },
];

const CIVIL_3RD_SEM_SUBJECTS = [
  { name: 'Strength of Materials', credits: 3, code: 'BCV301' },
  { name: 'Engineering Survey', credits: 4, code: 'BCV302' },
  { name: 'Engineering Geology', credits: 4, code: 'BCV303' },
  { name: 'Water Supply and Waste water Engineering', credits: 3, code: 'BCV304' },
  { name: 'Computer Aided Building Planning and Drawing', credits: 1, code: 'BCV305' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCV306x' },
  { name: 'Social Connect and Responsibility', credits: 1, code: 'BSCK307' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course III', credits: 1, code: 'BCV358x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK359/BPEK359/BYOK359' },
];

const MECH_3RD_SEM_SUBJECTS = [
  { name: 'Mechanics of Materials', credits: 3, code: 'BME301' },
  { name: 'Manufacturing Process', credits: 4, code: 'BME302' },
  { name: 'Material Science and Engineering', credits: 4, code: 'BME303' },
  { name: 'Basic Thermodynamics', credits: 3, code: 'BME304' },
  { name: 'Introduction to Modelling and Design for Manufacturing', credits: 1, code: 'BMEL305' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BME306x' },
  { name: 'Social Connect and Responsibility', credits: 1, code: 'BSCK307' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course III', credits: 1, code: 'BME358x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK359/BPEK359/BYOK359' },
];

const CSE_5TH_SEM_SUBJECTS = [
  { name: 'Software Engineering & Project Management', credits: 3, code: 'BCS501' },
  { name: 'Computer Networks', credits: 4, code: 'BCS502' },
  { name: 'Theory of Computation', credits: 4, code: 'BCS503' },
  { name: 'Web Technology Lab', credits: 1, code: 'BCSL504' },
  { name: 'Professional Elective Course', credits: 3, code: 'BCS515x' },
  { name: 'Mini Project', credits: 2, code: 'BCS586' },
  { name: 'Research Methodology and IPR', credits: 3, code: 'BRMK557' },
  { name: 'Environmental Studies', credits: 2, code: 'BESK508' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK559/BPEK559/BYOK559' },
];

const ECE_5TH_SEM_SUBJECTS = [
  { name: 'Technological Innovation and Management Entrepreneurship', credits: 3, code: 'BEC501' },
  { name: 'Digital Signal Processing', credits: 4, code: 'BEC502' },
  { name: 'Digital Communication', credits: 4, code: 'BEC503' },
  { name: 'Mini Project', credits: 2, code: 'BEC586' },
  { name: 'Digital Communication Lab', credits: 1, code: 'BECL504' },
  { name: 'Environmental Studies', credits: 2, code: 'BESK508' },
  { name: 'Research Methodology and IPR', credits: 3, code: 'BRMK557' },
  { name: 'Professional Elective Course', credits: 3, code: 'BEC515x' },
];

const EEE_5TH_SEM_SUBJECTS = [
  { name: 'Engineering Management and Entrepreneurship', credits: 3, code: 'BXX501' },
  { name: 'Signals & DSP', credits: 4, code: 'BEE502' },
  { name: 'Power Electronics', credits: 4, code: 'BEE503' },
  { name: 'Power Electronics Lab', credits: 1, code: 'BEE504' },
  { name: 'Professional Elective Course (Industry Suggested Course)', credits: 3, code: 'BEE515x' },
  { name: 'Mini Project', credits: 2, code: 'BEE586' },
  { name: 'Research Methodology and IPR', credits: 3, code: 'BRMK557' },
  { name: 'Environmental Studies', credits: 2, code: 'BESK508' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK559 / BPEK559 / BYOK559' },
];

const CIVIL_5TH_SEM_SUBJECTS = [
  { name: 'Construction Management and Entrepreneurship', credits: 3, code: 'BCV501' },
  { name: 'Geotechnical Engineering', credits: 4, code: 'BCV502' },
  { name: 'Concrete Technology', credits: 4, code: 'BCV503' },
  { name: 'Environmental Engineering Lab', credits: 1, code: 'BCV504' },
  { name: 'Professional Elective Course', credits: 3, code: 'BCV515x' },
  { name: 'Mini Project/Extensive Survey Project', credits: 2, code: 'BCV586' },
  { name: 'Research Methodology and IPR', credits: 3, code: 'BRMK557' },
  { name: 'Environmental Studies', credits: 2, code: 'BESK508' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK559 / BPEK559 / BYOK559' },
];

const MECH_5TH_SEM_SUBJECTS = [
  { name: 'Industrial Management & Entrepreneurship', credits: 3, code: 'BME501' },
  { name: 'Turbo Machines', credits: 4, code: 'BME502' },
  { name: 'Theory of Machines', credits: 4, code: 'BME503' },
  { name: 'CNC Programming and 3-D Printing Lab', credits: 1, code: 'BME504L' },
  { name: 'Professional Elective - I', credits: 3, code: 'BME515x' },
  { name: 'Mini Project', credits: 2, code: 'BME586' },
  { name: 'Research Methodology and IPR', credits: 3, code: 'BRMK557' },
  { name: 'Environmental Studies', credits: 2, code: 'BESK508' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK559 / BPEK559 / BYOK559' },
];

const CSE_6TH_SEM_SUBJECTS = [
  { name: 'Cloud Computing (Open Stack / Google)', credits: 4, code: 'BCS601' },
  { name: 'Machine Learning', credits: 4, code: 'BCS602' },
  { name: 'Professional Elective Course', credits: 3, code: 'BCS613x' },
  { name: 'Open Elective Course', credits: 3, code: 'BCS654x' },
  { name: 'Project Phase I', credits: 2, code: 'BCS685' },
  { name: 'Machine Learning lab', credits: 1, code: 'BCSL606' },
  { name: 'Ability Enhancement Course/Skill Development Course V', credits: 1, code: 'BCS657x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNS658/BPEK658/BYOK658' },
];

const ECE_6TH_SEM_SUBJECTS = [
  { name: 'Embedded System Design', credits: 4, code: 'BEC601' },
  { name: 'VLSI Design and Testing', credits: 4, code: 'BEC602' },
  { name: 'Major Project Phase I', credits: 2, code: 'BEC685' },
  { name: 'VLSI Design and Testing Lab', credits: 1, code: 'BECL606' },
  { name: 'Ability Enhancement Course–V', credits: 1, code: 'BEC657x' },
  { name: 'Open Elective Course', credits: 3, code: 'BEC654x' },
  { name: 'Professional Elective Course', credits: 3, code: 'BEC613x' },
];

const EEE_6TH_SEM_SUBJECTS = [
  { name: 'Power System Analysis I', credits: 4, code: 'BEE601' },
  { name: 'Control Systems', credits: 4, code: 'BEE602' },
  { name: 'Professional Elective Course', credits: 3, code: 'BEE613x' },
  { name: 'Open Elective Course', credits: 3, code: 'BEE654x' },
  { name: 'Project Phase I', credits: 2, code: 'BEE685' },
  { name: 'Control System Lab', credits: 1, code: 'BEEL606' },
  { name: 'Ability Enhancement Course/Skill Development Course V', credits: 1, code: 'BEE657x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK658/BPEK658/BYOK658' },
];

const CIVIL_6TH_SEM_SUBJECTS = [
  { name: 'Design of RCC Structures', credits: 4, code: 'BCV601' },
  { name: 'Irrigation Engineering and Hydraulic Structures', credits: 4, code: 'BCV602' },
  { name: 'Professional Elective Course', credits: 3, code: 'BCV613x' },
  { name: 'Open Elective Course', credits: 3, code: 'BCV654x' },
  { name: 'Major Project Phase I', credits: 2, code: 'BCV685' },
  { name: 'Software Application Lab', credits: 1, code: 'BCVL606' },
  { name: 'Ability Enhancement Course/Skill Development Course V', credits: 1, code: 'BCV657x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK658/BPEK658/BYOK658' },
];

const MECH_6TH_SEM_SUBJECTS = [
  { name: 'Heat Transfer', credits: 4, code: 'BME601' },
  { name: 'Machine Design', credits: 4, code: 'BME602' },
  { name: 'Professional Elective - II', credits: 3, code: 'BME613x' },
  { name: 'Open Elective - I', credits: 3, code: 'BME654x' },
  { name: 'Major Project Phase - I', credits: 2, code: 'BME685' },
  { name: 'Design Lab', credits: 1, code: 'BMEL606L' },
  { name: 'Ability Enhancement Course/Skill Development Course V', credits: 1, code: 'BME657x' },
  { name: 'NSS/PE/Yoga', credits: 0, code: 'BNSK658 / BPEK658 / BYOK658' },
];

const isCSE3rdSem = (semester, stream) => {
  if (semester !== '3rd') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  console.log('isCSE3rdSem check - semester:', semester, 'stream:', stream, 'lowercase:', s);
  return (
    s.includes('cse') ||
    s.includes('ise') ||
    s.includes('aiml') ||
    s.includes('cs') ||
    s.includes('is') ||
    s.includes('cse / is / aiml') ||
    s.includes('cse/is/aiml') ||
    s.includes('cse / is') ||
    s.includes('cse/is')
  );
};

const isECE3rdSem = (semester, stream) => {
  if (semester !== '3rd') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  console.log('isECE3rdSem check - semester:', semester, 'stream:', stream, 'lowercase:', s);
  return (
    s === 'ec' ||
    s === 'ece' ||
    s.includes('electronics') ||
    s.includes('ec branch') ||
    s.includes('ece branch') ||
    s.includes('ece / ec') ||
    s.includes('ece/ec')
  );
};

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

const isChemistryCycleCivil = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  // Accept 'chemistry cycle', 'c-cycle', 'c cycle', 'c cycle', 'c-cycle', etc.
  const isChem =
    sem === 'c-cycle' ||
    sem === 'c cycle' ||
    sem === 'chemistry cycle' ||
    sem.includes('chemistry cycle') ||
    sem.includes('c-cycle') ||
    sem.includes('c cycle');
  const isCivil =
    s.includes('civil engineering') ||
    s.includes('civil') ||
    s.includes('cv') ||
    s.includes('ev') ||
    s.includes('tr') ||
    s.includes('cc');
  return isChem && isCivil;
};

const isChemistryCycleCSE = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  // Accept 'chemistry cycle', 'c-cycle', 'c cycle', 'c cycle', 'c-cycle', etc.
  const isChem =
    sem === 'c-cycle' ||
    sem === 'c cycle' ||
    sem === 'chemistry cycle' ||
    sem.includes('chemistry cycle') ||
    sem.includes('c-cycle') ||
    sem.includes('c cycle');
  const isCSE =
    s.includes('cse stream') ||
    s.includes('cse scheme') ||
    s.includes('cse') ||
    s.includes('isc') ||
    s.includes('bt');
  return isChem && isCSE;
};

const isChemistryCycleElec = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  const isChem =
    sem === 'c-cycle' ||
    sem === 'c cycle' ||
    sem === 'chemistry cycle' ||
    sem.includes('chemistry cycle') ||
    sem.includes('c-cycle') ||
    sem.includes('c cycle');
  const isElec =
    s.includes('electrical engg science') ||
    s.includes('eee') ||
    s.includes('ece') ||
    s.includes('etc') ||
    s.includes('bm') ||
    s.includes('ie') ||
    s.includes('ml');
  return isChem && isElec;
};

const isChemistryCycleMech = (semester, stream) => {
  if (!semester || !stream) return false;
  const sem = semester.trim().toLowerCase().replace(/\s+/g, ' ');
  const s = stream.trim().toLowerCase().replace(/\s+/g, ' ');
  const isChem =
    sem === 'c-cycle' ||
    sem === 'c cycle' ||
    sem === 'chemistry cycle' ||
    sem.includes('chemistry cycle') ||
    sem.includes('c-cycle') ||
    sem.includes('c cycle');
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
  return isChem && isMech;
};

const isEEE3rdSem = (semester, stream) => {
  if (semester !== '3rd') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  console.log('isEEE3rdSem check - semester:', semester, 'stream:', stream, 'lowercase:', s);
  return (
    s === 'eee' ||
    s.includes('eee branch') ||
    s.includes('electrical') ||
    s.includes('electrical and electronics') ||
    s.includes('electrical engineering')
  );
};

const isCivil3rdSem = (semester, stream) => {
  if (semester !== '3rd') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s.includes('civil engineering') ||
    s === 'civil' ||
    s.includes('civil branch')
  );
};

const isMech3rdSem = (semester, stream) => {
  if (semester !== '3rd') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s.includes('mechanical engineering') ||
    s === 'mechanical' ||
    s.includes('mech branch') ||
    s.includes('mech')
  );
};

const isCSE5thSem = (semester, stream) => {
  if (semester !== '5th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s.includes('cse') ||
    s.includes('ise') ||
    s.includes('aiml') ||
    s.includes('cs') ||
    s.includes('is')
  );
};

const isECE5thSem = (semester, stream) => {
  if (semester !== '5th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s === 'ec' ||
    s === 'ece' ||
    s.includes('electronics') ||
    s.includes('ec branch') ||
    s.includes('ece branch')
  );
};

const isEEE5thSem = (semester, stream) => {
  if (semester !== '5th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s === 'eee' ||
    s.includes('eee branch') ||
    s.includes('electrical') ||
    s.includes('electrical and electronics') ||
    s.includes('electrical engineering')
  );
};

const isCivil5thSem = (semester, stream) => {
  if (semester !== '5th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s.includes('civil engineering') ||
    s === 'civil' ||
    s.includes('civil branch')
  );
};

const isMech5thSem = (semester, stream) => {
  if (semester !== '5th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s.includes('mechanical engineering') ||
    s === 'mechanical' ||
    s.includes('mech branch') ||
    s.includes('mechanical branch')
  );
};

const isCSE6thSem = (semester, stream) => {
  if (semester !== '6th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s.includes('cse') ||
    s.includes('ise') ||
    s.includes('aiml') ||
    s.includes('cs') ||
    s.includes('is')
  );
};

const isECE6thSem = (semester, stream) => {
  if (semester !== '6th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s === 'ec' ||
    s === 'ece' ||
    s.includes('electronics') ||
    s.includes('ec branch') ||
    s.includes('ece branch')
  );
};

const isEEE6thSem = (semester, stream) => {
  if (semester !== '6th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s === 'eee' ||
    s.includes('eee branch') ||
    s.includes('electrical and electronics')
  );
};

const isCivil6thSem = (semester, stream) => {
  if (semester !== '6th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s === 'civil engineering' ||
    s === 'civil' ||
    s.includes('civil branch')
  );
};

const isMech6thSem = (semester, stream) => {
  if (semester !== '6th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase().trim();
  return (
    s === 'mechanical engineering' ||
    s === 'mechanical' ||
    s.includes('mech branch') ||
    s.includes('mechanical branch')
  );
};

const SubjectInputForm = ({ subjects, setSubjects, mode = 'sgpa', semester, stream, firstInputRef }) => {
  // Debug log for all detection functions
  console.log('semester:', semester, 'stream:', stream, 'isCSE3rdSem:', isCSE3rdSem(semester, stream), 'isECE3rdSem:', isECE3rdSem(semester, stream), 'isEEE3rdSem:', isEEE3rdSem(semester, stream), 'isCSE4thSem:', isCSE4thSem(semester, stream), 'isPhysicsCycleCivil:', isPhysicsCycleCivil(semester, stream), 'isPhysicsCycleCSE:', isPhysicsCycleCSE(semester, stream));
  // Auto-populate for CSE/ISE/AIML 3rd and 4th sem, and ECE 3rd sem
  useEffect(() => {
    if (mode === 'sgpa' && isCSE3rdSem(semester, stream)) {
      setSubjects(CSE_3RD_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isECE3rdSem(semester, stream)) {
      setSubjects(ECE_3RD_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isEEE3rdSem(semester, stream)) {
      setSubjects(EEE_3RD_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCSE4thSem(semester, stream)) {
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
    } else if (mode === 'sgpa' && isChemistryCycleCSE(semester, stream)) {
      console.log('Setting CSE Chemistry Cycle subjects');
      setSubjects(CHEMISTRY_CSE_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isChemistryCycleElec(semester, stream)) {
      console.log('Setting Electrical Chemistry Cycle subjects');
      setSubjects(CHEMISTRY_ELEC_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isChemistryCycleMech(semester, stream)) {
      console.log('Setting Mechanical Chemistry Cycle subjects');
      setSubjects(CHEMISTRY_MECH_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isChemistryCycleCivil(semester, stream)) {
      console.log('Setting Civil Chemistry Cycle subjects');
      setSubjects(CHEMISTRY_CIVIL_CYCLE_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCivil3rdSem(semester, stream)) {
      setSubjects(CIVIL_3RD_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isMech3rdSem(semester, stream)) {
      setSubjects(MECH_3RD_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCSE5thSem(semester, stream)) {
      setSubjects(CSE_5TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isECE5thSem(semester, stream)) {
      setSubjects(ECE_5TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isEEE5thSem(semester, stream)) {
      setSubjects(EEE_5TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCivil5thSem(semester, stream)) {
      setSubjects(CIVIL_5TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isMech5thSem(semester, stream)) {
      setSubjects(MECH_5TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCSE6thSem(semester, stream)) {
      setSubjects(CSE_6TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isECE6thSem(semester, stream)) {
      setSubjects(ECE_6TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isEEE6thSem(semester, stream)) {
      setSubjects(EEE_6TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isCivil6thSem(semester, stream)) {
      setSubjects(CIVIL_6TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    } else if (mode === 'sgpa' && isMech6thSem(semester, stream)) {
      setSubjects(MECH_6TH_SEM_SUBJECTS.map(subj => ({ ...subj, marks: '', gradePoint: '' })));
    }
    // eslint-disable-next-line
  }, [semester, stream, mode]);

  // Handle marks input for CSE/ISE/AIML 3rd sem
  const handleMarksChangeCSE3rd = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for ECE 3rd sem
  const handleMarksChangeECE3rd = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

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

  // Handle marks input for EEE 3rd sem
  const handleMarksChangeEEE3rd = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Civil 3rd sem
  const handleMarksChangeCivil3rd = (idx, value) => {
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

  // Handle marks input for Mechanical 3rd sem
  const handleMarksChangeMech3rd = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for CSE/ISE/AIML 5th sem
  const handleMarksChangeCSE5th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for ECE 5th sem
  const handleMarksChangeECE5th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for EEE 5th sem
  const handleMarksChangeEEE5th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Civil 5th sem
  const handleMarksChangeCivil5th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Mechanical 5th sem
  const handleMarksChangeMech5th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for CSE/ISE/AIML 6th sem
  const handleMarksChangeCSE6th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for ECE 6th sem
  const handleMarksChangeECE6th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for EEE 6th sem
  const handleMarksChangeEEE6th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Civil 6th sem
  const handleMarksChangeCivil6th = (idx, value) => {
    const gradePoint = getGradePointFromMarks(Number(value));
    const updated = subjects.map((subj, i) =>
      i === idx ? { ...subj, marks: value, gradePoint } : subj
    );
    setSubjects(updated);
  };

  // Handle marks input for Mechanical 6th sem
  const handleMarksChangeMech6th = (idx, value) => {
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

  // Render for CSE/ISE/AIML 3rd sem
  if (mode === 'sgpa' && isCSE3rdSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 3rd Semester | CS / IS / AIML</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE3rd(idx, e.target.value)}
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

  // Render for ECE 3rd sem
  if (mode === 'sgpa' && isECE3rdSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 3rd Semester | ECE</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeECE3rd(idx, e.target.value)}
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

  // Render for EEE 3rd sem
  if (mode === 'sgpa' && isEEE3rdSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 3rd Semester | EEE</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeEEE3rd(idx, e.target.value)}
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

  // Render for CSE/ISE/AIML 4th sem
  if (mode === 'sgpa' && isCSE4thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 4th Semester | CSE / ISE / AIML</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
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
          <div className="subject-card" key={`${subj.code}-${idx}`}>
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
          <div className="subject-card" key={`${subj.code}-${idx}`}>
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
          <div className="subject-card" key={`${subj.code}-${idx}`}>
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
          <div className="subject-card" key={`${subj.code}-${idx}`}>
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

  // Render for Chemistry Cycle CSE Stream Scheme
  if (mode === 'sgpa' && isChemistryCycleCSE(semester, stream)) {
    console.log('CHEMISTRY_CSE_CYCLE_SUBJECTS:', CHEMISTRY_CSE_CYCLE_SUBJECTS);
    console.log('subjects state:', subjects);
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Chemistry Cycle | CSE Stream Scheme<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(CSE/ISC/BT) branch</span>
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

  // Render for Chemistry Cycle Electrical Engg Science Streams
  if (mode === 'sgpa' && isChemistryCycleElec(semester, stream)) {
    console.log('Rendering Electrical Chemistry Cycle:', subjects);
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Chemistry Cycle | Electrical Engg Science Streams<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(EEE/ECE/ETC/BM/IE/ML) branch</span>
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

  // Render for Chemistry Cycle Civil Engineering
  if (mode === 'sgpa' && isChemistryCycleCivil(semester, stream)) {
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Chemistry Cycle | Civil Engineering Stream<br/>
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

  // Render for Chemistry Cycle Mechanical Engineering Streams
  if (mode === 'sgpa' && isChemistryCycleMech(semester, stream)) {
    return (
      <div className="section-card">
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.3 }}>
          Enter your marks for 2022 scheme | Chemistry Cycle | Mechanical Engineering Streams<br/>
          <span style={{ fontWeight: 500, fontSize: '1rem' }}>(AE/AS/AU/ME/IP/IM/CH/SX/TX) branch</span>
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

  // Render for Civil 3rd sem
  if (mode === 'sgpa' && isCivil3rdSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 3rd Semester | Civil Engineering</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCivil3rd(idx, e.target.value)}
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

  // Render for Mechanical 3rd sem
  if (mode === 'sgpa' && isMech3rdSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 3rd Semester | Mechanical Engineering</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeMech3rd(idx, e.target.value)}
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

  // Render for CSE/IS/AIML 5th sem
  if (mode === 'sgpa' && isCSE5thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 5th Semester | CS / IS / AIML</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE5th(idx, e.target.value)}
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

  // Render for ECE 5th sem
  if (mode === 'sgpa' && isECE5thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 5th Semester | ECE</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeECE5th(idx, e.target.value)}
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

  // Render for EEE 5th sem
  if (mode === 'sgpa' && isEEE5thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 5th Semester | EEE</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeEEE5th(idx, e.target.value)}
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

  // Render for Civil 5th sem
  if (mode === 'sgpa' && isCivil5thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 5th Semester | Civil Engineering</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCivil5th(idx, e.target.value)}
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

  // Render for Mechanical 5th sem
  if (mode === 'sgpa' && isMech5thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter Your Marks – 2022 Scheme | 5th Semester | Mechanical Engineering Branch</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeMech5th(idx, e.target.value)}
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

  // Render for CSE/IS/AIML 6th sem
  if (mode === 'sgpa' && isCSE6thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 2022 scheme | 6th Semester | CS/IS/AIML branch</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCSE6th(idx, e.target.value)}
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

  // Render for ECE 6th sem
  if (mode === 'sgpa' && isECE6thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 2022 scheme | 6th Semester | ECE branch</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeECE6th(idx, e.target.value)}
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

  // Render for EEE 6th sem
  if (mode === 'sgpa' && isEEE6thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 2022 scheme | 6th Semester | EEE branch</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeEEE6th(idx, e.target.value)}
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

  // Render for Civil 6th sem
  if (mode === 'sgpa' && isCivil6thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 2022 scheme | 6th Semester | Civil Engineering branch</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeCivil6th(idx, e.target.value)}
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

  // Render for Mechanical 6th sem
  if (mode === 'sgpa' && isMech6thSem(semester, stream)) {
    return (
      <div className="section-card">
        <h3>Enter your marks for 2022 scheme | 6th Semester | Mechanical Engineering branch</h3>
        {subjects.map((subj, idx) => (
          <div className="subject-card" key={`${subj.code}-${idx}`}>
            <div className="subject-title">{subj.name}</div>
            <div style={{ color: '#555', marginBottom: '0.5rem' }}>Code: {subj.code} | Credits: {subj.credits}</div>
            <div className="subject-fields">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Marks"
                value={subj.marks}
                onChange={e => handleMarksChangeMech6th(idx, e.target.value)}
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