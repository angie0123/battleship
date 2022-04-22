import { player } from './player';

let testPlayer;
let receiveAttack;

beforeEach(() => {
  testPlayer = player('Sal');
  receiveAttack = jest.fn();
});

test('player is named correctly', () => {
  expect(testPlayer).toHaveProperty('name', 'Sal');
});
test('player receives coordinates to launch attack', () => {
  testPlayer.attack(3, 4, { receiveAttack });
  expect(receiveAttack).toHaveBeenCalledWith(3, 4);
});
test('player can generate random coordinates to launch attack', () => {
  testPlayer.randomAttack({ receiveAttack });
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
