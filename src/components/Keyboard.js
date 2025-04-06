import React from 'react';
import './Keyboard.css';

const KEYS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['Enter','z','x','c','v','b','n','m','Backspace'],
];

export default function Keyboard({ onKey }) {
  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button 
              key={key}
              className={`key ${key === 'Enter' || key === 'Backspace' ? 'wide' : ''}`}
              onClick={(e) => {
                e.currentTarget.blur();
                onKey(key)}}
            >
              {key === 'Backspace' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
