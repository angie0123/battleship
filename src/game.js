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
    appView.setHandlers({ handlePlacement });
    appView.init();
  };

  const handlePlacement = (x, y, temp) => {
    if (shipPointer >= playerShips.length) return;
    const currentShip = playerShips[shipPointer];
    if (playerTurf.isValidPosition(currentShip, x)) {
      appView.highlightShip(currentShip.body.length, x, y, temp);
    }
    if (!temp) shipPointer += 1;
  };

  return {
    init,
  };
};
