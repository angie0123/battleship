import { expect, test } from '@jest/globals';
import { ship } from './ship';

describe('ship API is working', () => {
  test('ship to have property body', () => {
    expect(ship(3).body).toEqual([null, null, null]);
  });
  test('hit is true when position is within body length', () => {
    expect(ship(2).hit(1)).toBe(true);
  });
  test('hit is false when position is outside body length bounds', () => {
    expect(ship(2).hit(4)).toBe(false);
  });
  test('hit is false when position is outside body length bounds', () => {
    expect(ship(2).hit(2)).toBe(false);
  });
  test('hit is false when position is in negative bounds', () => {
    expect(ship(2).hit(-1)).toBe(false);
  });
  test('body was marked as hit at given position', () => {
    const testShip = ship(3);
    testShip.hit(2);
    expect(testShip.body).toEqual([null, null, 'hit']);
  });
  test('ship sinks when all positions are hit', () => {
    const testShip = ship(2);
    testShip.hit(0);
    testShip.hit(1);
    expect(testShip.isSunk()).toEqual(true);
  });
  test('ship does not sink when only some positions are hit', () => {
    const testShip = ship(2);
    testShip.hit(0);
    expect(testShip.isSunk()).toEqual(false);
  });
});
