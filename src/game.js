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
      { clickHandler: handlePlacement, hoverHandler: handlePlacement },
      1
    );
  };

  const beginGame = () => {
    appView.removePlacementHandler(handlePlacement);

    appView.bindAttackHandler({ handleAttack });
    appView.startGame();
  };

  const handleAttack = () => {};

  const handlePlacement = (x, y, temp, boardNum) => {
    const currentShip = playerShips[shipPointer];
    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, temp);
      if (!temp) {
        playerTurf.placeShip(currentShip, x, y);
        shipPointer += 1;
      }
    }
    if (shipPointer === playerShips.length) beginGame();
  };

  return {
    init,
  };
};
