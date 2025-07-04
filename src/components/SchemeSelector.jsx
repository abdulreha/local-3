import React from 'react';
import '../styles/SelectorGroup.css';

const schemes = ['2022', '2021', '2018'];

const SchemeSelector = ({ scheme, setScheme }) => (
  <div className="section-card">
    <h3>Choose Scheme:</h3>
    <div className="selector-group">
      {schemes.map(s => (
        <button
          key={s}
          className={`selector-btn${scheme === s ? ' selected' : ''}`}
          onClick={() => setScheme(s)}
          type="button"
        >
          {s}
        </button>
      ))}
    </div>
    <div className="selected-label">selected scheme: <b>{scheme}</b></div>
  </div>
);

export default SchemeSelector; 