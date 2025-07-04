import React from 'react';
import '../styles/SelectorGroup.css';

const streamOptions = {
  'P-cycle': [
    'Civil Engineering Stream (CV/EV/TR/CC)',
    'CSE Stream Scheme (CSE/ISC/BT)',
    'Electrical Engg Science Streams (EEE/ECE/ETC/BM/IE/ML)',
    'Mechanical Engineering Streams (AE/AS/AU/ME/IP/IM/CH/SX/TX)',
  ],
  'C-cycle': [
    'Civil Engineering Stream (CV/EV/TR/CC)',
    'CSE Stream Scheme (CSE/ISC/BT)',
    'Electrical Engg Science Streams (EEE/ECE/ETC/BM/IE/ML)',
    'Mechanical Engineering Streams (AE/AS/AU/ME/IP/IM/CH/SX/TX)',
  ],
  'default': [
    'CSE / IS / AIML',
    'EC',
    'EEE',
    'Civil Engineering',
    'Mechanical Engineering',
  ]
};

const StreamSelector = ({ semester, stream, setStream }) => {
  const isCycle = semester === 'P-cycle' || semester === 'C-cycle';
  const streams = isCycle ? streamOptions[semester] : streamOptions['default'];

  return (
    <div className="section-card">
      <h3>Choose Branch:</h3>
      <div className="selector-group">
        {streams.map(s => (
          <button
            key={s}
            className={`selector-btn${stream === s ? ' selected' : ''}`}
            onClick={() => setStream(s)}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
      {stream && (
        <div className="selected-label">selected branch: <b>{stream}</b></div>
      )}
    </div>
  );
};

export default StreamSelector; 