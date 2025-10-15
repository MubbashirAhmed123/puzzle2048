import React from 'react';

const ScoreDisplay = ({ score, bestScore }) => {
  return (
    <div className="flex gap-4">
      <div className="bg-amber-600 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="text-xs uppercase font-semibold opacity-80">Score</div>
        <div className="text-2xl font-bold">{score}</div>
      </div>
      <div className="bg-amber-700 text-white px-6 py-3 rounded-lg shadow-lg">
        <div className="text-xs uppercase font-semibold opacity-80">Best</div>
        <div className="text-2xl font-bold">{bestScore}</div>
      </div>
    </div>
  );
};

export default ScoreDisplay;