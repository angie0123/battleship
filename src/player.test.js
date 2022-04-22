import { player, computer } from './player';

let receiveAttack;

beforeEach(() => {
  receiveAttack = jest.fn();
});
describe('player API works', () => {
  let testPlayer;
  beforeEach(() => {
    testPlayer = player('Sal');
  });
  test('player is named correctly', () => {
    expect(testPlayer).toHaveProperty('name', 'Sal');
  });
  test('player receives coordinates to launch attack', () => {
    testPlayer.attack(3, 4, { receiveAttack });
    expect(receiveAttack).toHaveBeenCalledWith(3, 4);
  });
});

describe('computer API works', () => {
  let testComputer;
  beforeEach(() => {
    testComputer = computer();
  });
  test('computer can generate random coordinates to launch attack', () => {
    testComputer.randomAttack({ receiveAttack });
    const xCoord = receiveAttack.mock.calls[0][0];
    const yCoord = receiveAttack.mock.calls[0][1];
    expect(receiveAttack).toHaveBeenCalled();
    expect(Number.isInteger(xCoord)).toBe(true);
    expect(Number.isInteger(yCoord)).toBe(true);
    expect(xCoord).toBeLessThanOrEqual(9);
    expect(xCoord).toBeGreaterThanOrEqual(0);
    expect(yCoord).toBeLessThanOrEqual(9);
    expect(yCoord).toBeGreaterThanOrEqual(0);
  });
  test(`computer doesn't pick the same coordinates twice in 100 calls`, () => {
    const argList = [];
    for (let i = 0; i < 100; i++) {
      testComputer.randomAttack({ receiveAttack });
      const xCoord = receiveAttack.mock.calls[i][0];
      const yCoord = receiveAttack.mock.calls[i][1];
      argList.push([xCoord, yCoord]);
    }
    const noDuplicates = new Set(argList).size === argList.length;
    expect(noDuplicates).toBe(true);
    expect(receiveAttack.mock.calls.length).toBe(100);
  });
});
