import React, { useState, useEffect, useCallback } from 'react';
import Header from "./components/Header";
import Line from "./components/Line";
import Keyboard from "./components/Keyboard";
import Scoreboard from './components/Scoreboard';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameKey, setGameKey] = useState(0);
  const [stats, setStats] = useState({ played: 0, wins: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const fetchWord = async () => {
    const response = await fetch(API_URL);
    const text = await response.text();
    const words = text.split('\n');
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSolution(randomWord.trim());
  };

  const resetGame = () => {
    setGuesses(Array(6).fill(null));
    setCurrentGuess('');
    setIsGameOver(false);
    fetchWord();
    setGameKey(prev => prev + 1);
  };

  const handleType = useCallback((eventOrKey) => {
    const key = eventOrKey.key || eventOrKey;

    if (isGameOver) return;

    setCurrentGuess(prev => {
      let next = prev;

      if (solution && key.match(/^[a-zA-Z]$/) && prev.length < 5) {
        next += key.toLowerCase();
      } else if (key === 'Backspace') {
        next = prev.slice(0, -1);
      } else if (key === 'Enter' && prev.length === 5) {
        const nextGuesses = [...guesses];
        const index = nextGuesses.findIndex(g => g === null);
        if (index !== -1) {
          nextGuesses[index] = prev;
          setGuesses(nextGuesses);

          const isCorrect = prev === solution;
          const isLastGuess = index === 5;

          if (isCorrect) {
            setIsGameOver(true);
            setStats(s => ({ ...s, played: s.played + 1, wins: s.wins + 1 }));
            setTimeout(() => {
              alert('You got it!');
            }, 800);
          } else if (isLastGuess) {
            setIsGameOver(true);
            setStats(s => ({ ...s, played: s.played + 1 }));
            setTimeout(() => {
              alert(`The word was "${solution}". Try again!`);
            }, 800);
          }
        }
        return '';
      }

      return next;
    });
  }, [guesses, solution, isGameOver]);

  useEffect(() => {
    const listener = (e) => handleType(e);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handleType]);

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div className={`board ${darkMode ? 'dark' : ''}`}>
      <Header />
      <Scoreboard stats={stats} />
      <button className="darkToggle" onClick={() => setDarkMode(d => !d)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {guesses.map((guess, i) => {
        const currentGuessIndex = guesses.findIndex(g => g === null);
        const isCurrent = i === currentGuessIndex;
        return (
          <Line
            key={`${gameKey}-${i}`}
            guess={isCurrent ? currentGuess : guess ?? ""}
            isFinal={!isCurrent && guess !== null}
            solution={solution}
          />
        );
      })}

      <Keyboard onKey={handleType} />
      <button type="button" className="replayButton" onClick={resetGame}>Replay</button>
    </div>
  );
}
