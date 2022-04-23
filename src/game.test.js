import { game } from './game';
import { gameboard } from './gameboard';
import { player, computer } from './player';
import { ship } from './ship';

let testGame;
let testView;
let testBoard;
let testPlayer;
let testComputer;
let testShip;

describe('game API works', () => {
  beforeEach(() => {
    testView = () => {
      return {
        init: jest.fn(),
        setHandlers: jest.fn(),
      };
    };
    testBoard = gameboard;
    testPlayer = player;
    testComputer = computer;
    testShip = ship;
    testGame = game(testPlayer, testComputer, testBoard, testShip, testView);
  });
  test('initializer calls the player', () => {
    const mockPlayer = jest.fn();
    testGame = game(mockPlayer, testComputer, testBoard, testShip, testView);
    testGame.init();
    expect(mockPlayer).toHaveBeenCalled();
  });
  test('initializer calls the computer', () => {
    const mockComputer = jest.fn();
    testGame = game(testPlayer, mockComputer, testBoard, testShip, testView);
    testGame.init();
    expect(mockComputer).toHaveBeenCalled();
  });
  test('initializer calls the board', () => {
    const mockBoard = jest.fn();
    testGame = game(testPlayer, testComputer, mockBoard, testShip, testView);
    testGame.init();
    expect(mockBoard).toHaveBeenCalled();
  });
  test('initializer calls the ship', () => {
    const mockShip = jest.fn();
    testGame = game(testPlayer, testComputer, testBoard, mockShip, testView);
    testGame.init();
    expect(mockShip.mock.calls.length).toBe(10);
  });
  test('initializer calls the view init function', () => {
    testGame.init();
    expect(testView().init).toHaveBeenCalled();
  });
  test('initializer calls view setHandler function', () => {
    testGame.init();
    const view = testView();
    expect(view.setHandlers).toHaveBeenCalled();
  });
});
