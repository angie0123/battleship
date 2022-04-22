export { player, computer };

const player = (name) => {
  return {
    name,
    attack: (x, y, gameBoard) => {
      return gameBoard.receiveAttack(x, y);
    },
  };
};

const computer = () => {
  const alreadyPlayed = [];
  const randomCoord = () => Math.floor(Math.random() * 10);
  return {
    randomAttack: (gameBoard) => {
      let x, y;
      do {
        x = randomCoord();
        y = randomCoord();
      } while (alreadyPlayed.contains([x, y]));
      alreadyPlayed.push([x, y]);
      return gameBoard.receiveAttack(intBetween0And9, intBetween0And9);
    },
  };
};
