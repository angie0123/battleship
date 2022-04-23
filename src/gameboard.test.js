import { beforeEach, expect, jest, test } from '@jest/globals';
import { gameboard } from './gameboard';
import { ship } from './ship';

describe('Gameboard API', () => {
  let newShip;
  let gameBoard;
  let testBoard;

  beforeEach(() => {
    newShip = ship(2);
    gameBoard = gameboard();
    testBoard = [];

    for (let i = 0; i < 10; i++) {
      testBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        testBoard[i][j] = j;
      }
    }
  });
  test('placing a ship on coordinates', () => {
    gameBoard.placeShip(newShip, 3, 4);
    testBoard[3][4] = newShip;
    testBoard[4][4] = newShip;
    expect(gameBoard.board).toEqual(testBoard);
    expect(gameBoard.placeShip(newShip, 3, 4)).toBe(true);
  });
  test('placing a ship on invalid coordinates', () => {
    gameBoard.placeShip(newShip, 9, 9);
    expect(gameBoard.board).toEqual(testBoard);
    expect(gameBoard.placeShip(newShip, 9, 9)).toBe(false);
  });
  test('placing a ship on invalid coordinates', () => {
    gameBoard.placeShip(newShip, 8, 1);
    expect(gameBoard.board).toEqual(testBoard);
    expect(gameBoard.placeShip(newShip, 8, 1)).toBe(false);
  });
  test('checking if ship placement is out of bounds', () => {
    gameBoard.placeShip(newShip, 8, 1);
    expect(gameBoard.isValidPosition(newShip, 8, 1)).toBe(false);
  });
  test('checking if ship placement will reject when position is already occupied', () => {
    gameBoard.placeShip(newShip, 1, 1);
    expect(gameBoard.isValidPosition(newShip, 1, 1)).toBe(false);
    expect(gameBoard.isValidPosition(newShip, 2, 1)).toBe(false);
  });
  test('receive attack and hit ship', () => {
    gameBoard.placeShip(newShip, 1, 1);
    testBoard[1][1] = newShip;
    testBoard[2][1] = newShip;
    gameBoard.receiveAttack(2, 1);
    testBoard[2][1] = 'hit';
    expect(gameBoard.board).toEqual(testBoard);
  });
  test('receive attack and miss ship', () => {
    gameBoard.placeShip(newShip, 1, 1);
    gameBoard.receiveAttack(4, 1);
    testBoard[1][1] = newShip;
    testBoard[2][1] = newShip;
    testBoard[4][1] = 'missed';
    expect(gameBoard.board).toEqual(testBoard);
  });
  test('receive attack returns false if missed', () => {
    gameBoard.placeShip(newShip, 1, 1);
    expect(gameBoard.receiveAttack(4, 1)).toBe(false);
  });
  test('receive attack returns true if hit', () => {
    gameBoard.placeShip(newShip, 1, 1);
    expect(gameBoard.receiveAttack(2, 1)).toBe(true);
  });
  test('sends true when all ships are sunk', () => {
    expect(gameBoard.checkHasWon()).toBe(true);
  });
  test('sends true when ships still exist on board', () => {
    gameBoard.placeShip(newShip, 1, 1);
    expect(gameBoard.checkHasWon()).toBe(false);
  });
});
