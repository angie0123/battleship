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

    // appView.bindAttackHandler({ handleAttack });
    // appView.startGame();
  };

  const handleAttack = () => {};

  const handleCheckPlacement = (x, y, boardId) => {
    const currentShip = playerShips[shipPointer];
    appView.clearPrevHighlights();
    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, true, boardId);
    }
  };

  const handlePlacement = (x, y, boardId) => {
    const currentShip = playerShips[shipPointer];
    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, false, boardId);
      playerTurf.placeShip(currentShip, x, y);
      shipPointer += 1;
    }
    if (shipPointer === playerShips.length) beginGame();
  };

  return {
    init,
  };
};
