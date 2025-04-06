import './Header.css';

export default function Header() {
  return (
    <header>
      <div className="headerContainer">
        <h1>🎮 Puzzle — A Wordle-Inspired Word Game</h1>
        <p>
          <strong>Puzzle</strong> is a fun and interactive word guessing game inspired by Wordle. 
          Players get six attempts to guess a five-letter word. With every guess, tile colors give clues:
        </p>
        <ul className="legend">
          <li>🟩 <strong>Green</strong> — Correct letter in the correct place</li>
          <li>🟨 <strong>Yellow</strong> — Correct letter in the wrong place</li>
          <li>⬜ <strong>Gray</strong> — Letter not in the word</li>
        </ul>
      </div>
    </header>
  );
}
