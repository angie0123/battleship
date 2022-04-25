export const game = (player, computer, gameboard, ship, view) => {
  let playerTurf,
    computerTurf,
    playerA,
    computerAI,
    playerShips,
    computerShips,
    appView,
    shipPointer;
  const playerBoardId = 0;
  const computerBoardId = 1;

  const init = () => {
    shipPointer = 0;
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    playerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    computerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    appView = view();
    appView.init();
    appView.bindHandlers(playerBoardHandlers, playerBoardId);
  };

  const beginGame = () => {
    appView.removeAllHandlers(playerBoardId);
    populateComputerTurf();
    appView.bindHandlers(computerBoardHandlers, computerBoardId);
    appView.startGameMsg();
  };

  const populateComputerTurf = () => {
    const randomInt = () => {
      return Math.floor(Math.random() * 10);
    };
    computerShips.map((ship) => {
      let x, y;
      do {
        x = randomInt();
        y = randomInt();
      } while (!computerTurf.isValidPosition(ship, x, y));
      computerTurf.placeShip(ship, x, y);
    });
  };

  const handleAttackCallback = (x, y, boardIndex) => {
    return function handleAttack() {
      const playerDidHit = playerA.attack(x, y, computerTurf);
      appView.disable(x, y, boardIndex);
      appView.paint(x, y, boardIndex, playerDidHit);
      const [computerDidHit, computerAttackX, computerAttackY] =
        computerAI.randomAttack(playerTurf);
      appView.paint(
        computerAttackX,
        computerAttackY,
        playerBoardId,
        computerDidHit
      );
      if (computerTurf.checkHasLost() || playerTurf.checkHasLost()) {
        handleGameOver();
      }
    };
  };

  const handleGameOver = () => {
    appView.removeAllHandlers(computerBoardId);
    const message = computerTurf.checkHasLost() ? 'You win!' : 'You lose';
    appView.displayWinner(message);
    appView.displayPlayAgain(handleRestart);
  };

  const handleCheckPlacementCallback = (x, y, boardIndex) => {
    return function handleCheckPlacement() {
      const currentShip = playerShips[shipPointer];
      appView.clearPrevHighlights();
      if (playerTurf.isValidPosition(currentShip, x, y)) {
        appView.highlightShip(currentShip.body.length, x, y, true, boardIndex);
      }
    };
  };

  const handlePlacementCallback = (x, y, boardIndex) => {
    return function handlePlacement() {
      const currentShip = playerShips[shipPointer];
      if (playerTurf.isValidPosition(currentShip, x, y)) {
        appView.clearPrevHighlights();
        appView.highlightShip(currentShip.body.length, x, y, false, boardIndex);
        playerTurf.placeShip(currentShip, x, y);
        shipPointer += 1;
      }
      if (shipPointer === playerShips.length) beginGame();
    };
  };

  const handleRestart = () => {
    appView.clear();
    init();
  };

  const computerBoardHandlers = {
    clickHandler: handleAttackCallback,
  };

  const playerBoardHandlers = {
    clickHandler: handlePlacementCallback,
    hoverHandler: handleCheckPlacementCallback,
  };

  return {
    init,
  };
};
