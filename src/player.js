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
      let x, y, key;
      do {
        x = randomCoord();
        y = randomCoord();
        key = `${x} ${y}`;
      } while (alreadyPlayed.includes(key));
      alreadyPlayed.push(key);
      return gameBoard.receiveAttack(x, y);
    },
  };
};
