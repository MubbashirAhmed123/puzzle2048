
export const createEmptyBoard = (size) => {
  return Array(size).fill(null).map(() => Array(size).fill(0));
};


export const getEmptyPositions = (board) => {
  const positions = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) positions.push({ row: i, col: j });
    });
  });
  return positions;
};


export const addRandomTile = (board) => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;
  
  const { row, col } = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = value;
  return newBoard;
};


export const initializeBoard = (size) => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};


export const checkGameOver = (board) => {
  if (getEmptyPositions(board).length > 0) return false;
  
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (j < board[i].length - 1 && board[i][j] === board[i][j + 1]) return false;
      if (i < board.length - 1 && board[i][j] === board[i + 1][j]) return false;
    }
  }
  
  return true;
};


export const checkWin = (board) => {
  return board.some(row => row.some(cell => cell >= 2048));
};