import { game } from './game';
import { gameboard } from './gameboard';
import { player, computer } from './player';

let testGame;
let testView;
let testBoard;
let testPlayer;
let testComputer;

describe('game API works', () => {
  beforeEach(() => {
    testView = {
      init: jest.fn(),
    };
    testBoard = gameboard;
    testPlayer = player;
    testComputer = computer;
    testGame = game(testPlayer, testComputer, testBoard, testView);
  });
  test('initializer calls the player', () => {
    const mockPlayer = jest.fn();
    testGame = game(mockPlayer, testComputer, testBoard, testView);
    testGame.init(testView);
    expect(mockPlayer).toHaveBeenCalled();
  });
  test('initializer calls the computer', () => {
    const mockComputer = jest.fn();
    testGame = game(testPlayer, mockComputer, testBoard, testView);
    testGame.init(testView);
    expect(mockComputer).toHaveBeenCalled();
  });
  test('initializer calls the board', () => {
    const mockBoard = jest.fn();
    testGame = game(testPlayer, testComputer, mockBoard, testView);
    testGame.init(testView);
    expect(mockBoard).toHaveBeenCalled();
  });
  test('initializer calls the view', () => {
    testGame.init(testView);
    expect(testView.init).toHaveBeenCalled();
  });
});
