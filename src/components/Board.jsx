import React from 'react';
import Tile from './Tile';

const TILE_SIZE = 80;

const Board = ({ board, size }) => {
  return (
    <div
      className="bg-amber-600 p-4 rounded-xl shadow-2xl inline-block"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${size}, ${TILE_SIZE}px)`,
        gap: '12px',
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => <Tile key={`${i}-${j}`} value={cell} />)
      )}
    </div>
  );
};

export default Board;
