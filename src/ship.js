export const ship = (length) => {
  let body = [];
  for (let i = 0; i < length; i++) {
    body.push(null);
  }
  const methods = shipMethods();
  return Object.assign({}, methods, { body });
};

const shipMethods = () => {
  //input: index of body
  function hit(pos) {
    let isHit = false;
    if (pos < this.body.length && pos >= 0) {
      this.body[pos] = 'hit';
      isHit = true;
    }
    return isHit;
  }

  function isSunk() {
    return this.body.every((position) => position === 'hit');
  }

  //output: boolean
  return {
    hit,
    isSunk,
  };
};
