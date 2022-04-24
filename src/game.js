export const game = (player, computer, gameboard, ship, view) => {
  let playerTurf,
    computerTurf,
    playerA,
    computerAI,
    playerShips,
    computerShips,
    appView;

  let shipPointer = 0;

  const init = () => {
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    playerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    computerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    appView = view();
    appView.init();
    appView.bindHandlers(
      { hoverHandler: handleCheckPlacement, clickHandler: handlePlacement },
      0
    );
  };

  const beginGame = () => {
    appView.removeAllHandlers(0);
    populateComputerTurf();
    appView.bindHandlers({ clickHandler: handleAttack }, 1);
    // appView.startGame();
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

  const handleAttack = (x, y, boardIndex) => {
    const playerDidHit = playerA.attack(x, y, computerTurf);
    console.log(playerDidHit);
  };

  const handleCheckPlacement = (x, y, boardIndex) => {
    const currentShip = playerShips[shipPointer];
    appView.clearPrevHighlights();
    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, true, boardIndex);
    }
  };

  const handlePlacement = (x, y, boardIndex) => {
    const currentShip = playerShips[shipPointer];
    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.clearPrevHighlights();
      appView.highlightShip(currentShip.body.length, x, y, false, boardIndex);
      playerTurf.placeShip(currentShip, x, y);
      shipPointer += 1;
    }
    if (shipPointer === playerShips.length) beginGame();
  };

  return {
    init,
  };
};
