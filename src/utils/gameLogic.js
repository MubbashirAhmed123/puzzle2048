
export const slideRow = (row) => {
  const filtered = row.filter(cell => cell !== 0);
  const merged = [];
  let score = 0;
  let i = 0;
  
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2;
      merged.push(mergedValue);
      score += mergedValue;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i += 1;
    }
  }
  
  while (merged.length < row.length) {
    merged.push(0);
  }
  
  return { row: merged, score };
};


export const moveLeft = (board) => {
  let totalScore = 0;
  const newBoard = board.map(row => {
    const { row: newRow, score } = slideRow(row);
    totalScore += score;
    return newRow;
  });
  return { board: newBoard, score: totalScore };
};


export const rotateBoard = (board) => {
  const size = board.length;
  return board[0].map((_, colIndex) => 
    board.map(row => row[colIndex]).reverse()
  );
};


export const moveBoard = (board, direction) => {
  let rotations = 0;
  let workingBoard = board.map(r => [...r]);
  
  switch (direction) {
    case 'left':
      rotations = 0;
      break;
    case 'up':
      rotations = 1;
      break;
    case 'right':
      rotations = 2;
      break;
    case 'down':
      rotations = 3;
      break;
    default:
      return { board, score: 0, moved: false };
  }
  
  for (let i = 0; i < rotations; i++) {
    workingBoard = rotateBoard(workingBoard);
  }
  
  const { board: movedBoard, score } = moveLeft(workingBoard);
  
  for (let i = 0; i < (4 - rotations) % 4; i++) {
    workingBoard = rotateBoard(movedBoard);
  }
  
  const moved = JSON.stringify(board) !== JSON.stringify(workingBoard);
  
  return { board: workingBoard, score, moved };
};