export const view = () => {
  let handlers;

  const setHandlers = (handlerObj) => {
    handlers = handlerObj;
  };

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

  const createBoard = () => {
    let board = createElement('div', 'board-grid');
    for (let i = 0; i < 10; i++) {
      const row = createElement('div', 'row');
      for (let j = 0; j < 10; j++) {
        const square = createElement('div', 'square');
        square.textContent = `${j}, ${i}`;
        square.addEventListener('mouseenter', () => {
          handlers.handleCheckPlacement(j, i);
        });
        square.addEventListener('mouseleave', () => {
          square.classList.add('ship');
        });
        row.append(square);
      }
      board.append(row);
    }
    return board;
  };

  const highlightShip = (length, x, y) => {
    console.log(length, x, y);
    const row = document.querySelectorAll('.row')[y];
    for (let i = 0; i < length; i++) {
      row.childNodes[x + i].classList.add('ship');
    }
  };

  return {
    init,
    setHandlers,
    highlightShip,
  };
};
