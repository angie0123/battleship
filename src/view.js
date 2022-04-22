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
    const playerBoard = createElement('div', 'player-board');
    const playerName = createElement('div', 'player-name');
    playerName.textContent = 'Player';
    playerBoard.append(playerName);
    const computerBoard = createElement('div', 'computer-board');
    const computerName = createElement('div', 'player-name');
    computerName.textContent = 'Computer';
    computerBoard.append(computerName);
    boardsContainer.append(playerBoard, computerBoard);

    document.querySelector('body').append(title, status, boardsContainer);
  };

  return {
    init,
  };
};
