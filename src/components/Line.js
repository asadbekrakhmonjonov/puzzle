import React from 'react';
import { motion } from 'framer-motion';
import './Line.css';

export default function Line({ guess, isFinal, solution }) {
  const letters = guess.split('');

  const getStatus = (letter, index) => {
    if (!isFinal || !solution) return '';
    if (solution[index] === letter) return 'correct';
    else if (solution.includes(letter)) return 'close';
    else return 'wrong';
  };

  return (
    <div className="line">
      {[0, 1, 2, 3, 4].map((i) => {
        const letter = letters[i] || '';
        const status = getStatus(letter, i);

        return (
          <motion.div
            key={i}
            className={`tile ${status}`}
            initial={false}
            animate={
              isFinal
                ? {
                    rotateX: [0, 90, 0],
                    transition: {
                      duration: 0.6,
                      delay: i * 0.3,
                      times: [0, 0.5, 1],
                    },
                  }
                : {}
            }
          >
            {letter}
          </motion.div>
        );
      })}
    </div>
  );
}
