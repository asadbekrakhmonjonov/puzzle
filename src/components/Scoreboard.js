import React from 'react';


export default function Scoreboard({ stats }) {
  return (
    <div className="scoreboard">
      <p>Games Played: {stats.played}</p>
      <p>Wins: {stats.wins}</p>
      <p>Win Rate: {stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0}%</p>
    </div>
  );
}
