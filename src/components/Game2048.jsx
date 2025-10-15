import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import Board from './Board';
import ScoreDisplay from './ScoreDisplay';
import Modal from './Modal';
import { initializeBoard, addRandomTile, checkGameOver, checkWin } from '../utils/boardUtils';
import { moveBoard } from '../utils/gameLogic';

const Game2048 = () => {
  const [size, setSize] = useState(4);
  const [board, setBoard] = useState(() => initializeBoard(4));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore2048');
    return saved ? parseInt(saved) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const resetGame = useCallback((newSize = size) => {
    setBoard(initializeBoard(newSize));
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setSize(newSize);
  }, [size]);

  const handleMove = useCallback((direction) => {
    if (gameOver) return;

    const { board: newBoard, score: moveScore, moved } = moveBoard(board, direction);
    if (!moved) return;

    const boardWithNewTile = addRandomTile(newBoard);
    setBoard(boardWithNewTile);

    const newScore = score + moveScore;
    setScore(newScore);

    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('bestScore2048', newScore.toString());
    }

    if (checkWin(boardWithNewTile) && !gameWon) setGameWon(true);
    if (checkGameOver(boardWithNewTile)) setGameOver(true);
  }, [board, score, bestScore, gameOver, gameWon]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const directionMap = {
          'ArrowUp': 'up',
          'ArrowDown': 'down',
          'ArrowLeft': 'left',
          'ArrowRight': 'right'
        };
        handleMove(directionMap[e.key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  const handleSizeChange = (newSize) => {
    resetGame(newSize);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-6xl font-bold text-amber-700 mb-2">2048</h1>
            <p className="text-gray-600">Join the tiles to reach 2048!</p>
          </div>
          <ScoreDisplay score={score} bestScore={bestScore} />
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => resetGame()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors flex items-center gap-2"
          >
            <RotateCcw size={20} />
            New Game
          </button>
          
        </div>

        <div className="flex justify-center mb-6">
          <Board board={board} size={size} />
        </div>

        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto md:hidden">
          <div></div>
          <button
            onClick={() => handleMove('up')}
            className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-lg font-bold shadow-lg"
          >
            ↑
          </button>
          <div></div>
          <button
            onClick={() => handleMove('left')}
            className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-lg font-bold shadow-lg"
          >
            ←
          </button>
          <button
            onClick={() => handleMove('down')}
            className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-lg font-bold shadow-lg"
          >
            ↓
          </button>
          <button
            onClick={() => handleMove('right')}
            className="bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-lg font-bold shadow-lg"
          >
            →
          </button>
        </div>

        <div className="text-center text-gray-600 mt-6">
          <p className="font-semibold">Use arrow keys to move tiles</p>
        </div>
      </div>

      <Modal isOpen={gameOver} onClose={() => setGameOver(false)} title="Game Over!">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-6">
            Final Score: <span className="font-bold text-amber-600">{score}</span>
          </p>
          <button
            onClick={() => resetGame()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-colors w-full"
          >
            Try Again
          </button>
        </div>
      </Modal>

      <Modal isOpen={gameWon && !gameOver} onClose={() => setGameWon(false)} title="You Win!">
        <div className="text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-6">You reached 2048!</p>
          <div className="flex gap-3">
            <button
              onClick={() => setGameWon(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors flex-1"
            >
              Keep Playing
            </button>
            <button
              onClick={() => resetGame()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors flex-1"
            >
              New Game
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Board Size">
        <div className="space-y-3">
          {[3, 4, 5, 6, 8].map(s => (
            <button
              key={s}
              onClick={() => handleSizeChange(s)}
              className={`w-full px-6 py-4 rounded-lg font-semibold shadow-lg transition-colors ${
                s === size ? 'bg-amber-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {s} x {s}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Game2048;
