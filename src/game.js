export const game = (player, computer, gameboard, view) => {
  let playerTurf, computerTurf, playerA, computerAI;

  const init = (view) => {
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    view.init();
    // placeShips();
  };

  const placeShips = (computerTurf) => {
    const handleValidPlacement = computerTurf.isValidPlacement;
    view.renderPlacement(handleValidPlacement);
  };

  return {
    init,
    placeShips,
  };
};
