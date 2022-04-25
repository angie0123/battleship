/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var game = function game(player, computer, gameboard, ship, view) {
  var playerTurf, computerTurf, playerA, computerAI, playerShips, computerShips, appView;
  var shipPointer = 0;
  var playerBoardId = 0;
  var computerBoardId = 1;

  var init = function init() {
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    playerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    computerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    appView = view();
    appView.init();
    appView.bindHandlers(playerBoardHandlers, playerBoardId);
  };

  var beginGame = function beginGame() {
    appView.removeAllHandlers(playerBoardId);
    populateComputerTurf();
    appView.bindHandlers(computerBoardHandlers, computerBoardId);
    appView.startGameMsg();
  };

  var populateComputerTurf = function populateComputerTurf() {
    var randomInt = function randomInt() {
      return Math.floor(Math.random() * 10);
    };

    computerShips.map(function (ship) {
      var x, y;

      do {
        x = randomInt();
        y = randomInt();
      } while (!computerTurf.isValidPosition(ship, x, y));

      computerTurf.placeShip(ship, x, y);
    });
  };

  var handleAttackCallback = function handleAttackCallback(x, y, boardIndex) {
    return function handleAttack() {
      var playerDidHit = playerA.attack(x, y, computerTurf);
      appView.disable(x, y, boardIndex);
      appView.paint(x, y, boardIndex, playerDidHit);

      var _computerAI$randomAtt = computerAI.randomAttack(playerTurf),
          _computerAI$randomAtt2 = _slicedToArray(_computerAI$randomAtt, 3),
          computerDidHit = _computerAI$randomAtt2[0],
          computerAttackX = _computerAI$randomAtt2[1],
          computerAttackY = _computerAI$randomAtt2[2];

      appView.paint(computerAttackX, computerAttackY, playerBoardId, computerDidHit);

      if (computerTurf.checkHasLost() || playerTurf.checkHasLost()) {
        handleGameOver();
      }
    };
  };

  var handleGameOver = function handleGameOver() {
    appView.removeAllHandlers(computerBoardId);
    var message = computerTurf.checkHasLost() ? 'You win!' : 'You lose';
    appView.displayWinner(message);
    appView.displayPlayAgain();
  };

  var handleCheckPlacementCallback = function handleCheckPlacementCallback(x, y, boardIndex) {
    return function handleCheckPlacement() {
      var currentShip = playerShips[shipPointer];
      appView.clearPrevHighlights();

      if (playerTurf.isValidPosition(currentShip, x, y)) {
        appView.highlightShip(currentShip.body.length, x, y, true, boardIndex);
      }
    };
  };

  var handlePlacementCallback = function handlePlacementCallback(x, y, boardIndex) {
    return function handlePlacement() {
      var currentShip = playerShips[shipPointer];

      if (playerTurf.isValidPosition(currentShip, x, y)) {
        appView.clearPrevHighlights();
        appView.highlightShip(currentShip.body.length, x, y, false, boardIndex);
        playerTurf.placeShip(currentShip, x, y);
        shipPointer += 1;
      }

      if (shipPointer === playerShips.length) beginGame();
    };
  };

  var computerBoardHandlers = {
    clickHandler: handleAttackCallback
  };
  var playerBoardHandlers = {
    clickHandler: handlePlacementCallback,
    hoverHandler: handleCheckPlacementCallback
  };
  return {
    init: init
  };
};

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
var gameboard = function gameboard() {
  var board = []; // x coordinates

  for (var i = 0; i < 10; i++) {
    board[i] = []; //y coordinates

    for (var j = 0; j < 10; j++) {
      board[i][j] = null;
    }
  }

  var placeShip = function placeShip(ship, x, y) {
    for (var _i = 0; _i < ship.body.length; _i++) {
      board[x + _i][y] = ship;
    }
  };

  var isValidPosition = function isValidPosition(ship, x, y) {
    var isAlreadyOccupied = false;
    var isOutOfBounds = ship.body.length + x > 10;

    if (!isOutOfBounds) {
      for (var _i2 = 0; _i2 < ship.body.length; _i2++) {
        if (board[x + _i2][y] !== null) {
          isAlreadyOccupied = true;
        }
      }
    }

    return !isAlreadyOccupied && !isOutOfBounds;
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (typeof board[x][y] !== 'string' && board[x][y] !== null) {
      var ship = board[x][y];

      for (var _i3 = 0; _i3 < 10; _i3++) {
        if (board[_i3][y] === ship) {
          board[x][y] = 'hit';
          return true;
        }
      }
    }

    board[x][y] = 'missed';
    return false;
  };

  var checkHasLost = function checkHasLost() {
    var shipsPresent = false;

    for (var _i4 = 0; _i4 < 10; _i4++) {
      for (var _j = 0; _j < 10; _j++) {
        if (typeof board[_i4][_j] !== 'string' && board[_i4][_j] !== null) {
          shipsPresent = true;
        }
      }
    }

    return !shipsPresent;
  };

  return {
    placeShip: placeShip,
    board: board,
    receiveAttack: receiveAttack,
    checkHasLost: checkHasLost,
    isValidPosition: isValidPosition
  };
};

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });


var player = function player() {
  return {
    attack: function attack(x, y, gameBoard) {
      return gameBoard.receiveAttack(x, y);
    }
  };
};

var computer = function computer() {
  var alreadyPlayed = [];

  var randomCoord = function randomCoord() {
    return Math.floor(Math.random() * 10);
  };

  return {
    randomAttack: function randomAttack(gameBoard) {
      var x, y, key;

      do {
        x = randomCoord();
        y = randomCoord();
        key = "".concat(x, " ").concat(y);
      } while (alreadyPlayed.includes(key));

      alreadyPlayed.push(key);
      return [gameBoard.receiveAttack(x, y), x, y];
    }
  };
};

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
var ship = function ship(length) {
  var body = [];

  for (var i = 0; i < length; i++) {
    body.push(null);
  }

  var methods = shipMethods();
  return Object.assign({}, methods, {
    body: body
  });
};

var shipMethods = function shipMethods() {
  //input: index of body
  function hit(pos) {
    var isHit = false;

    if (pos < this.body.length && pos >= 0) {
      this.body[pos] = 'hit';
      isHit = true;
    }

    return isHit;
  }

  function isSunk() {
    return this.body.every(function (position) {
      return position === 'hit';
    });
  } //output: boolean


  return {
    hit: hit,
    isSunk: isSunk
  };
};

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "view": () => (/* binding */ view)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var view = function view() {
  var createElement = function createElement(type) {
    var el = document.createElement(type);

    for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classNames[_key - 1] = arguments[_key];
    }

    for (var index in classNames) {
      el.classList.add(classNames[index]);
    }

    return el;
  };

  var init = function init() {
    var title = createElement('div', 'game-title');
    title.textContent = 'BATTLESHIPS';
    var status = createElement('div', 'status');
    status.textContent = 'Place your ships';
    var boardsContainer = createElement('div', 'boards-container');
    var playerBoardContainer = createElement('div', 'board-container');
    var playerName = createElement('div', 'player-name');
    var playerBoard = createBoard();
    playerName.textContent = 'Player';
    playerBoardContainer.append(playerBoard, playerName);
    var computerBoardContainer = createElement('div', 'board-container');
    var computerName = createElement('div', 'player-name');
    var computerBoard = createBoard();
    computerName.textContent = 'Computer';
    computerBoardContainer.append(computerBoard, computerName);
    boardsContainer.append(playerBoardContainer, computerBoardContainer);
    document.querySelector('body').append(title, status, boardsContainer);
  };

  var removeAllHandlers = function removeAllHandlers(boardIndex) {
    var board = document.querySelectorAll('.board-grid')[boardIndex];
    board.replaceWith(board.cloneNode(true));
    var boardIterable = getBoard(boardIndex);
    boardIterable.map(function (square) {
      return square.classList.remove('hoverable');
    });
  };

  var getBoard = function getBoard(boardIndex) {
    var grid = document.querySelectorAll('.square');
    var indexStart = boardIndex * 100;
    var indexEnd = indexStart + 100;

    var boardGrid = _toConsumableArray(grid).slice(indexStart, indexEnd);

    return boardGrid;
  };

  var bindHandlers = function bindHandlers(handlersObj, boardIndex) {
    var board = getBoard(boardIndex);
    board.map(function (square, index) {
      square.classList.add('hoverable');
      var x = index % 10;
      var y = Math.floor(index / 10);

      if (handlersObj.hasOwnProperty('hoverHandler')) {
        square.addEventListener('mouseenter', handlersObj.hoverHandler(x, y, boardIndex));
      }

      if (handlersObj.hasOwnProperty('clickHandler')) square.addEventListener('click', handlersObj.clickHandler(x, y, boardIndex));
    });
  };

  var createBoard = function createBoard() {
    var board = createElement('div', 'board-grid');

    for (var i = 0; i < 10; i++) {
      var row = createElement('div', 'row');

      for (var j = 0; j < 10; j++) {
        var square = createElement('div', 'square');
        row.append(square);
      }

      board.append(row);
    }

    return board;
  };

  var highlightShip = function highlightShip(length, x, y, temp, boardIndex) {
    var className = temp ? 'ship-possible' : 'ship';

    for (var i = 0; i < length; i++) {
      var square = getSquare(x + i, y, boardIndex);
      square.classList.add(className);
    }
  };

  var getSquare = function getSquare(x, y, boardIndex) {
    var row = document.querySelectorAll('.row')[y + boardIndex * 10];
    return row.childNodes[x];
  };

  var disable = function disable(x, y, boardIndex) {
    var square = getSquare(x, y, boardIndex);
    var newSquare = createElement('div', 'square');
    square.replaceWith(newSquare);
  };

  var clearPrevHighlights = function clearPrevHighlights() {
    var prevHighlights = document.querySelectorAll('.ship-possible');

    _toConsumableArray(prevHighlights).map(function (possibleShip) {
      return possibleShip.classList.remove('ship-possible');
    });
  };

  var paint = function paint(x, y, boardIndex, didHit) {
    var square = getSquare(x, y, boardIndex);
    var className = didHit ? 'hit' : 'miss';
    square.classList.add(className);
  };

  var displayWinner = function displayWinner(message) {
    var status = document.querySelector('.status');
    status.textContent = message;
  };

  var displayPlayAgain = function displayPlayAgain() {
    var boardsContainer = document.querySelector('.boards-container');
    var parent = boardsContainer.parentNode;
    var button = createElement('div', 'play-again', 'hoverable');
    button.textContent = 'Play Again';
    parent.insertBefore(button, boardsContainer);
  };

  var startGameMsg = function startGameMsg() {
    var status = document.querySelector('.status');
    status.textContent = 'Begin!';
  };

  return {
    init: init,
    highlightShip: highlightShip,
    bindHandlers: bindHandlers,
    removeAllHandlers: removeAllHandlers,
    clearPrevHighlights: clearPrevHighlights,
    disable: disable,
    paint: paint,
    displayWinner: displayWinner,
    displayPlayAgain: displayPlayAgain,
    startGameMsg: startGameMsg
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view */ "./src/view.js");





var battleship = (0,_game__WEBPACK_IMPORTED_MODULE_0__.game)(_player__WEBPACK_IMPORTED_MODULE_1__.player, _player__WEBPACK_IMPORTED_MODULE_1__.computer, _gameboard__WEBPACK_IMPORTED_MODULE_3__.gameboard, _ship__WEBPACK_IMPORTED_MODULE_2__.ship, _view__WEBPACK_IMPORTED_MODULE_4__.view);
battleship.init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNwSCxJQUFYLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2FtZSA9IChwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpID0+IHtcbiAgbGV0IHBsYXllclR1cmYsXG4gICAgY29tcHV0ZXJUdXJmLFxuICAgIHBsYXllckEsXG4gICAgY29tcHV0ZXJBSSxcbiAgICBwbGF5ZXJTaGlwcyxcbiAgICBjb21wdXRlclNoaXBzLFxuICAgIGFwcFZpZXc7XG5cbiAgbGV0IHNoaXBQb2ludGVyID0gMDtcbiAgY29uc3QgcGxheWVyQm9hcmRJZCA9IDA7XG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRJZCA9IDE7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQSA9IHBsYXllcigpO1xuICAgIGNvbXB1dGVyQUkgPSBjb21wdXRlcigpO1xuICAgIHBsYXllclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGNvbXB1dGVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgYXBwVmlldyA9IHZpZXcoKTtcbiAgICBhcHBWaWV3LmluaXQoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyhwbGF5ZXJCb2FyZEhhbmRsZXJzLCBwbGF5ZXJCb2FyZElkKTtcbiAgfTtcblxuICBjb25zdCBiZWdpbkdhbWUgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5yZW1vdmVBbGxIYW5kbGVycyhwbGF5ZXJCb2FyZElkKTtcbiAgICBwb3B1bGF0ZUNvbXB1dGVyVHVyZigpO1xuICAgIGFwcFZpZXcuYmluZEhhbmRsZXJzKGNvbXB1dGVyQm9hcmRIYW5kbGVycywgY29tcHV0ZXJCb2FyZElkKTtcbiAgICBhcHBWaWV3LnN0YXJ0R2FtZU1zZygpO1xuICB9O1xuXG4gIGNvbnN0IHBvcHVsYXRlQ29tcHV0ZXJUdXJmID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUludCA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfTtcbiAgICBjb21wdXRlclNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgbGV0IHgsIHk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21JbnQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUludCgpO1xuICAgICAgfSB3aGlsZSAoIWNvbXB1dGVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSkpO1xuICAgICAgY29tcHV0ZXJUdXJmLnBsYWNlU2hpcChzaGlwLCB4LCB5KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBdHRhY2tDYWxsYmFjayA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUF0dGFjaygpIHtcbiAgICAgIGNvbnN0IHBsYXllckRpZEhpdCA9IHBsYXllckEuYXR0YWNrKHgsIHksIGNvbXB1dGVyVHVyZik7XG4gICAgICBhcHBWaWV3LmRpc2FibGUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgICBhcHBWaWV3LnBhaW50KHgsIHksIGJvYXJkSW5kZXgsIHBsYXllckRpZEhpdCk7XG4gICAgICBjb25zdCBbY29tcHV0ZXJEaWRIaXQsIGNvbXB1dGVyQXR0YWNrWCwgY29tcHV0ZXJBdHRhY2tZXSA9XG4gICAgICAgIGNvbXB1dGVyQUkucmFuZG9tQXR0YWNrKHBsYXllclR1cmYpO1xuICAgICAgYXBwVmlldy5wYWludChcbiAgICAgICAgY29tcHV0ZXJBdHRhY2tYLFxuICAgICAgICBjb21wdXRlckF0dGFja1ksXG4gICAgICAgIHBsYXllckJvYXJkSWQsXG4gICAgICAgIGNvbXB1dGVyRGlkSGl0XG4gICAgICApO1xuICAgICAgaWYgKGNvbXB1dGVyVHVyZi5jaGVja0hhc0xvc3QoKSB8fCBwbGF5ZXJUdXJmLmNoZWNrSGFzTG9zdCgpKSB7XG4gICAgICAgIGhhbmRsZUdhbWVPdmVyKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHYW1lT3ZlciA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnJlbW92ZUFsbEhhbmRsZXJzKGNvbXB1dGVyQm9hcmRJZCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGNvbXB1dGVyVHVyZi5jaGVja0hhc0xvc3QoKSA/ICdZb3Ugd2luIScgOiAnWW91IGxvc2UnO1xuICAgIGFwcFZpZXcuZGlzcGxheVdpbm5lcihtZXNzYWdlKTtcbiAgICBhcHBWaWV3LmRpc3BsYXlQbGF5QWdhaW4oKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGVja1BsYWNlbWVudENhbGxiYWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlQ2hlY2tQbGFjZW1lbnQoKSB7XG4gICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICAgIGFwcFZpZXcuY2xlYXJQcmV2SGlnaGxpZ2h0cygpO1xuICAgICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRydWUsIGJvYXJkSW5kZXgpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50Q2FsbGJhY2sgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoKSB7XG4gICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgICAgYXBwVmlldy5jbGVhclByZXZIaWdobGlnaHRzKCk7XG4gICAgICAgIGFwcFZpZXcuaGlnaGxpZ2h0U2hpcChjdXJyZW50U2hpcC5ib2R5Lmxlbmd0aCwgeCwgeSwgZmFsc2UsIGJvYXJkSW5kZXgpO1xuICAgICAgICBwbGF5ZXJUdXJmLnBsYWNlU2hpcChjdXJyZW50U2hpcCwgeCwgeSk7XG4gICAgICAgIHNoaXBQb2ludGVyICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcFBvaW50ZXIgPT09IHBsYXllclNoaXBzLmxlbmd0aCkgYmVnaW5HYW1lKCk7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBjb21wdXRlckJvYXJkSGFuZGxlcnMgPSB7XG4gICAgY2xpY2tIYW5kbGVyOiBoYW5kbGVBdHRhY2tDYWxsYmFjayxcbiAgfTtcblxuICBjb25zdCBwbGF5ZXJCb2FyZEhhbmRsZXJzID0ge1xuICAgIGNsaWNrSGFuZGxlcjogaGFuZGxlUGxhY2VtZW50Q2FsbGJhY2ssXG4gICAgaG92ZXJIYW5kbGVyOiBoYW5kbGVDaGVja1BsYWNlbWVudENhbGxiYWNrLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBsZXQgaXNBbHJlYWR5T2NjdXBpZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNPdXRPZkJvdW5kcyA9IHNoaXAuYm9keS5sZW5ndGggKyB4ID4gMTA7XG4gICAgaWYgKCFpc091dE9mQm91bmRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNBbHJlYWR5T2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhaXNBbHJlYWR5T2NjdXBpZWQgJiYgIWlzT3V0T2ZCb3VuZHM7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzTG9zdCA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNQcmVzZW50ID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtqXSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICBzaGlwc1ByZXNlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhc2hpcHNQcmVzZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNMb3N0LFxuICAgIGlzVmFsaWRQb3NpdGlvbixcbiAgfTtcbn07XG4iLCJleHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG5cbmNvbnN0IHBsYXllciA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2s6ICh4LCB5LCBnYW1lQm9hcmQpID0+IHtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFscmVhZHlQbGF5ZWQgPSBbXTtcbiAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiB7XG4gICAgcmFuZG9tQXR0YWNrOiAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBsZXQgeCwgeSwga2V5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIGtleSA9IGAke3h9ICR7eX1gO1xuICAgICAgfSB3aGlsZSAoYWxyZWFkeVBsYXllZC5pbmNsdWRlcyhrZXkpKTtcbiAgICAgIGFscmVhZHlQbGF5ZWQucHVzaChrZXkpO1xuICAgICAgcmV0dXJuIFtnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KSwgeCwgeV07XG4gICAgfSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJvZHkucHVzaChudWxsKTtcbiAgfVxuICBjb25zdCBtZXRob2RzID0gc2hpcE1ldGhvZHMoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHsgYm9keSB9KTtcbn07XG5cbmNvbnN0IHNoaXBNZXRob2RzID0gKCkgPT4ge1xuICAvL2lucHV0OiBpbmRleCBvZiBib2R5XG4gIGZ1bmN0aW9uIGhpdChwb3MpIHtcbiAgICBsZXQgaXNIaXQgPSBmYWxzZTtcbiAgICBpZiAocG9zIDwgdGhpcy5ib2R5Lmxlbmd0aCAmJiBwb3MgPj0gMCkge1xuICAgICAgdGhpcy5ib2R5W3Bvc10gPSAnaGl0JztcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkuZXZlcnkoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbiA9PT0gJ2hpdCcpO1xuICB9XG5cbiAgLy9vdXRwdXQ6IGJvb2xlYW5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCB2aWV3ID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIC4uLmNsYXNzTmFtZXMpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3NOYW1lcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2dhbWUtdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQUyc7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSAnUGxheWVyJztcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmQsIHBsYXllck5hbWUpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyJztcbiAgICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckJvYXJkLCBjb21wdXRlck5hbWUpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZCh0aXRsZSwgc3RhdHVzLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUFsbEhhbmRsZXJzID0gKGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1ncmlkJylbYm9hcmRJbmRleF07XG4gICAgYm9hcmQucmVwbGFjZVdpdGgoYm9hcmQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICBjb25zdCBib2FyZEl0ZXJhYmxlID0gZ2V0Qm9hcmQoYm9hcmRJbmRleCk7XG4gICAgYm9hcmRJdGVyYWJsZS5tYXAoKHNxdWFyZSkgPT4gc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyYWJsZScpKTtcbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9IChib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcbiAgICBjb25zdCBpbmRleFN0YXJ0ID0gYm9hcmRJbmRleCAqIDEwMDtcbiAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyAxMDA7XG4gICAgY29uc3QgYm9hcmRHcmlkID0gWy4uLmdyaWRdLnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKTtcbiAgICByZXR1cm4gYm9hcmRHcmlkO1xuICB9O1xuXG4gIGNvbnN0IGJpbmRIYW5kbGVycyA9IChoYW5kbGVyc09iaiwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZ2V0Qm9hcmQoYm9hcmRJbmRleCk7XG4gICAgYm9hcmQubWFwKChzcXVhcmUsIGluZGV4KSA9PiB7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnaG92ZXJhYmxlJyk7XG4gICAgICBjb25zdCB4ID0gaW5kZXggJSAxMDtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGluZGV4IC8gMTApO1xuICAgICAgaWYgKGhhbmRsZXJzT2JqLmhhc093blByb3BlcnR5KCdob3ZlckhhbmRsZXInKSkge1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnbW91c2VlbnRlcicsXG4gICAgICAgICAgaGFuZGxlcnNPYmouaG92ZXJIYW5kbGVyKHgsIHksIGJvYXJkSW5kZXgpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2NsaWNrSGFuZGxlcicpKVxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgIGhhbmRsZXJzT2JqLmNsaWNrSGFuZGxlcih4LCB5LCBib2FyZEluZGV4KVxuICAgICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGxldCBib2FyZCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NxdWFyZScpO1xuICAgICAgICByb3cuYXBwZW5kKHNxdWFyZSk7XG4gICAgICB9XG4gICAgICBib2FyZC5hcHBlbmQocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGhpZ2hsaWdodFNoaXAgPSAobGVuZ3RoLCB4LCB5LCB0ZW1wLCBib2FyZEluZGV4KSA9PiB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRlbXAgPyAnc2hpcC1wb3NzaWJsZScgOiAnc2hpcCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHggKyBpLCB5LCBib2FyZEluZGV4KTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFNxdWFyZSA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdycpW3kgKyBib2FyZEluZGV4ICogMTBdO1xuICAgIHJldHVybiByb3cuY2hpbGROb2Rlc1t4XTtcbiAgfTtcblxuICBjb25zdCBkaXNhYmxlID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgY29uc3QgbmV3U3F1YXJlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NxdWFyZScpO1xuICAgIHNxdWFyZS5yZXBsYWNlV2l0aChuZXdTcXVhcmUpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyUHJldkhpZ2hsaWdodHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJldkhpZ2hsaWdodHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1wb3NzaWJsZScpO1xuICAgIFsuLi5wcmV2SGlnaGxpZ2h0c10ubWFwKChwb3NzaWJsZVNoaXApID0+XG4gICAgICBwb3NzaWJsZVNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1wb3NzaWJsZScpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBwYWludCA9ICh4LCB5LCBib2FyZEluZGV4LCBkaWRIaXQpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gZGlkSGl0ID8gJ2hpdCcgOiAnbWlzcyc7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5V2lubmVyID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UGxheUFnYWluID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGFyZW50ID0gYm9hcmRzQ29udGFpbmVyLnBhcmVudE5vZGU7XG4gICAgY29uc3QgYnV0dG9uID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXktYWdhaW4nLCAnaG92ZXJhYmxlJyk7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1BsYXkgQWdhaW4nO1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoYnV0dG9uLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0R2FtZU1zZyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ0JlZ2luISc7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGhpZ2hsaWdodFNoaXAsXG4gICAgYmluZEhhbmRsZXJzLFxuICAgIHJlbW92ZUFsbEhhbmRsZXJzLFxuICAgIGNsZWFyUHJldkhpZ2hsaWdodHMsXG4gICAgZGlzYWJsZSxcbiAgICBwYWludCxcbiAgICBkaXNwbGF5V2lubmVyLFxuICAgIGRpc3BsYXlQbGF5QWdhaW4sXG4gICAgc3RhcnRHYW1lTXNnLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3JztcblxuY29uc3QgYmF0dGxlc2hpcCA9IGdhbWUocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KTtcbmJhdHRsZXNoaXAuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVib2FyZCIsInNoaXAiLCJ2aWV3IiwicGxheWVyVHVyZiIsImNvbXB1dGVyVHVyZiIsInBsYXllckEiLCJjb21wdXRlckFJIiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiYXBwVmlldyIsInNoaXBQb2ludGVyIiwicGxheWVyQm9hcmRJZCIsImNvbXB1dGVyQm9hcmRJZCIsImluaXQiLCJiaW5kSGFuZGxlcnMiLCJwbGF5ZXJCb2FyZEhhbmRsZXJzIiwiYmVnaW5HYW1lIiwicmVtb3ZlQWxsSGFuZGxlcnMiLCJwb3B1bGF0ZUNvbXB1dGVyVHVyZiIsImNvbXB1dGVyQm9hcmRIYW5kbGVycyIsInN0YXJ0R2FtZU1zZyIsInJhbmRvbUludCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1hcCIsIngiLCJ5IiwiaXNWYWxpZFBvc2l0aW9uIiwicGxhY2VTaGlwIiwiaGFuZGxlQXR0YWNrQ2FsbGJhY2siLCJib2FyZEluZGV4IiwiaGFuZGxlQXR0YWNrIiwicGxheWVyRGlkSGl0IiwiYXR0YWNrIiwiZGlzYWJsZSIsInBhaW50IiwicmFuZG9tQXR0YWNrIiwiY29tcHV0ZXJEaWRIaXQiLCJjb21wdXRlckF0dGFja1giLCJjb21wdXRlckF0dGFja1kiLCJjaGVja0hhc0xvc3QiLCJoYW5kbGVHYW1lT3ZlciIsIm1lc3NhZ2UiLCJkaXNwbGF5V2lubmVyIiwiZGlzcGxheVBsYXlBZ2FpbiIsImhhbmRsZUNoZWNrUGxhY2VtZW50Q2FsbGJhY2siLCJoYW5kbGVDaGVja1BsYWNlbWVudCIsImN1cnJlbnRTaGlwIiwiY2xlYXJQcmV2SGlnaGxpZ2h0cyIsImhpZ2hsaWdodFNoaXAiLCJib2R5IiwibGVuZ3RoIiwiaGFuZGxlUGxhY2VtZW50Q2FsbGJhY2siLCJoYW5kbGVQbGFjZW1lbnQiLCJjbGlja0hhbmRsZXIiLCJob3ZlckhhbmRsZXIiLCJib2FyZCIsImkiLCJqIiwiaXNBbHJlYWR5T2NjdXBpZWQiLCJpc091dE9mQm91bmRzIiwicmVjZWl2ZUF0dGFjayIsInNoaXBzUHJlc2VudCIsImdhbWVCb2FyZCIsImFscmVhZHlQbGF5ZWQiLCJyYW5kb21Db29yZCIsImtleSIsImluY2x1ZGVzIiwicHVzaCIsIm1ldGhvZHMiLCJzaGlwTWV0aG9kcyIsIk9iamVjdCIsImFzc2lnbiIsImhpdCIsInBvcyIsImlzSGl0IiwiaXNTdW5rIiwiZXZlcnkiLCJwb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNsYXNzTmFtZXMiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGF0dXMiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJwbGF5ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwiYXBwZW5kIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsImNvbXB1dGVyTmFtZSIsImNvbXB1dGVyQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlcGxhY2VXaXRoIiwiY2xvbmVOb2RlIiwiYm9hcmRJdGVyYWJsZSIsImdldEJvYXJkIiwic3F1YXJlIiwicmVtb3ZlIiwiZ3JpZCIsImluZGV4U3RhcnQiLCJpbmRleEVuZCIsImJvYXJkR3JpZCIsInNsaWNlIiwiaGFuZGxlcnNPYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3ciLCJ0ZW1wIiwiY2xhc3NOYW1lIiwiZ2V0U3F1YXJlIiwiY2hpbGROb2RlcyIsIm5ld1NxdWFyZSIsInByZXZIaWdobGlnaHRzIiwicG9zc2libGVTaGlwIiwiZGlkSGl0IiwicGFyZW50IiwicGFyZW50Tm9kZSIsImJ1dHRvbiIsImluc2VydEJlZm9yZSIsImJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9