export const gameboard = () => {
  const board = [];
  // x coordinates
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    //y coordinates
    for (let j = 0; j < 10; j++) {
      board[i][j] = null;
    }
  }

  const placeShip = (ship, x, y) => {
    for (let i = 0; i < ship.body.length; i++) {
      board[x + i][y] = ship;
    }
    console.log(board[x][y], ship);
  };

  const isValidPosition = (ship, x, y) => {
    let isAlreadyOccupied = false;
    let isOutOfBounds = ship.body.length + x > 10;
    if (!isOutOfBounds) {
      for (let i = 0; i < ship.body.length; i++) {
        if (board[x + i][y] !== null) {
          isAlreadyOccupied = true;
          console.log('occupied!');
        }
      }
    }
    console.log(board[x][y]);
    return !isAlreadyOccupied && !isOutOfBounds;
  };

  const receiveAttack = (x, y) => {
    if (typeof board[x][y] !== 'string' && board[x][y] !== null) {
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
    isValidPosition,
  };
};
