export const game = (player, computer, gameboard, ship, view) => {
  let playerTurf, computerTurf, playerA, computerAI, playerShips, computerShips;

  const init = () => {
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    playerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    computerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    view.init();
  };

  return {
    init,
  };
};
