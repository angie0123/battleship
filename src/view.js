export const view = () => {
  const createElement = (type, ...classNames) => {
    const el = document.createElement(type);
    for (let index in classNames) {
      el.classList.add(classNames[index]);
    }
    return el;
  };

  const init = () => {
    const title = createElement('div', 'game-title');
    title.textContent = 'BATTLESHIPS';

    const status = createElement('div', 'status');
    status.textContent = 'Place your ships';

    const boardsContainer = createElement('div', 'boards-container');
    const playerBoardContainer = createElement('div', 'board-container');
    const playerName = createElement('div', 'player-name');
    const playerBoard = createBoard();
    playerName.textContent = 'Player';
    playerBoardContainer.append(playerBoard, playerName);
    const computerBoardContainer = createElement('div', 'board-container');
    const computerName = createElement('div', 'player-name');
    const computerBoard = createBoard();
    computerName.textContent = 'Computer';
    computerBoardContainer.append(computerBoard, computerName);
    boardsContainer.append(playerBoardContainer, computerBoardContainer);

    document.querySelector('body').append(title, status, boardsContainer);
  };

  const removeAllHandlers = (boardIndex) => {
    const board = document.querySelectorAll('.board-grid')[boardIndex];
    board.replaceWith(board.cloneNode(true));
  };

  const getBoard = (boardIndex) => {
    const grid = document.querySelectorAll('.square');
    const indexStart = boardIndex * 100;
    const indexEnd = indexStart + 100;
    const boardGrid = [...grid].slice(indexStart, indexEnd);
    return boardGrid;
  };

  const bindHandlers = (handlersObj, boardIndex) => {
    const board = getBoard(boardIndex);

    board.map((square, index) => {
      const x = index % 10;
      const y = Math.floor(index / 10);
      if (handlersObj.hasOwnProperty('hoverHandler')) {
        square.addEventListener('mouseenter', () => {
          handlersObj.hoverHandler(x, y, boardIndex);
        });
      }
      if (handlersObj.hasOwnProperty('clickHandler'))
        square.addEventListener('click', () => {
          handlersObj.clickHandler(x, y, boardIndex);
        });
    });
  };

  const createBoard = () => {
    let board = createElement('div', 'board-grid');
    for (let i = 0; i < 10; i++) {
      const row = createElement('div', 'row');
      for (let j = 0; j < 10; j++) {
        const square = createElement('div', 'square');
        square.textContent = `${j}, ${i}`;
        row.append(square);
      }
      board.append(row);
    }
    return board;
  };

  const highlightShip = (length, x, y, temp, boardIndex) => {
    let className = temp ? 'ship-possible' : 'ship';
    for (let i = 0; i < length; i++) {
      const square = getSquare(x + i, y, boardIndex);
      square.classList.add(className);
    }
  };

  const getSquare = (x, y, boardIndex) => {
    const row = document.querySelectorAll('.row')[y + boardIndex * 10];
    return row.childNodes[x];
  };

  const disable = (x, y, boardIndex) => {
    const square = getSquare(x, y, boardIndex);
    square.replaceWith(square.cloneNode(false));
  };

  const clearPrevHighlights = () => {
    const prevHighlights = document.querySelectorAll('.ship-possible');
    [...prevHighlights].map((possibleShip) =>
      possibleShip.classList.remove('ship-possible')
    );
  };

  return {
    init,
    highlightShip,
    bindHandlers,
    removeAllHandlers,
    clearPrevHighlights,
    disable,
  };
};
