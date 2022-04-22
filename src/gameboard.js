export const gameboard = () => {
  const board = [];
  // x coordinates
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    //y coordinates
    for (let j = 0; j < 10; j++) {
      board[i][j] = j;
    }
  }

  const placeShip = (ship, x, y) => {
    if (!isValidPosition(ship, x, y)) return false;
    for (let i = 0; i < ship.body.length; i++) {
      board[x + i][y] = ship;
    }
    return true;
  };

  const isValidPosition = (ship, x) => {
    const shipLength = ship.body.length;
    return !(shipLength + x > 9);
  };

  const receiveAttack = (x, y) => {
    if (typeof board[x][y] === 'object') {
      const ship = board[x][y];
      for (let i = 0; i < 10; i++) {
        if (board[i][y] === ship) {
          board[x][y] = 'hit';
          return true;
        }
      }
    }
    board[x][y] = 'missed';
    return false;
  };

  const checkHasWon = () => {
    return board.every((xPos) =>
      xPos.every((yPos) => typeof yPos !== 'object')
    );
  };

  return {
    placeShip,
    board,
    receiveAttack,
    checkHasWon,
  };
};
