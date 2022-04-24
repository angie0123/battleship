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

  var init = function init() {
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    playerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    computerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    appView = view();
    appView.init();
    appView.bindHandlers({
      hoverHandler: handleCheckPlacement,
      clickHandler: handlePlacement
    }, 0);
  };

  var beginGame = function beginGame() {
    appView.removeAllHandlers(0);
    populateComputerTurf();
    appView.bindHandlers({
      clickHandler: handleAttack
    }, 1); // appView.startGame();
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

  var handleAttack = function handleAttack(x, y, boardIndex) {
    var playerDidHit = playerA.attack(x, y, computerTurf);
    appView.disable(x, y, boardIndex);
    appView.paint(x, y, boardIndex, playerDidHit);

    var _computerAI$randomAtt = computerAI.randomAttack(playerTurf),
        _computerAI$randomAtt2 = _slicedToArray(_computerAI$randomAtt, 3),
        computerDidHit = _computerAI$randomAtt2[0],
        computerAttackX = _computerAI$randomAtt2[1],
        computerAttackY = _computerAI$randomAtt2[2];

    var playerBoardIndex = 0;
    appView.paint(computerAttackX, computerAttackY, playerBoardIndex, computerDidHit);

    if (computerTurf.checkHasLost() || playerTurf.checkHasLost()) {
      handleGameOver();
    }
  };

  var handleGameOver = function handleGameOver() {
    var message = computerTurf.checkHasLost() ? 'You win!' : 'You lose';
    appView.displayWinner(message);
    appView.displayPlayAgain();
  };

  var handleCheckPlacement = function handleCheckPlacement(x, y, boardIndex) {
    var currentShip = playerShips[shipPointer];
    appView.clearPrevHighlights();

    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, true, boardIndex);
    }
  };

  var handlePlacement = function handlePlacement(x, y, boardIndex) {
    var currentShip = playerShips[shipPointer];

    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.clearPrevHighlights();
      appView.highlightShip(currentShip.body.length, x, y, false, boardIndex);
      playerTurf.placeShip(currentShip, x, y);
      shipPointer += 1;
    }

    if (shipPointer === playerShips.length) beginGame();
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
      var x = index % 10;
      var y = Math.floor(index / 10);

      if (handlersObj.hasOwnProperty('hoverHandler')) {
        square.addEventListener('mouseenter', function () {
          handlersObj.hoverHandler(x, y, boardIndex);
        });
      }

      if (handlersObj.hasOwnProperty('clickHandler')) square.addEventListener('click', function () {
        handlersObj.clickHandler(x, y, boardIndex);
      });
    });
  };

  var createBoard = function createBoard() {
    var board = createElement('div', 'board-grid');

    for (var i = 0; i < 10; i++) {
      var row = createElement('div', 'row');

      for (var j = 0; j < 10; j++) {
        var square = createElement('div', 'square');
        square.textContent = "".concat(j, ", ").concat(i);
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
    square.replaceWith(square.cloneNode(false));
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
    var button = createElement('div', 'play-again');
    button.textContent = 'Play Again';
    parent.insertBefore(button, boardsContainer);
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
    displayPlayAgain: displayPlayAgain
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNNEUsVUFBVSxHQUFHM0gsMkNBQUksQ0FBQ0MsMkNBQUQsRUFBU0MsNkNBQVQsRUFBbUJDLGlEQUFuQixFQUE4QkMsdUNBQTlCLEVBQW9DQyx1Q0FBcEMsQ0FBdkI7QUFDQXNILFVBQVUsQ0FBQzdHLElBQVgsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnYW1lID0gKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldykgPT4ge1xuICBsZXQgcGxheWVyVHVyZixcbiAgICBjb21wdXRlclR1cmYsXG4gICAgcGxheWVyQSxcbiAgICBjb21wdXRlckFJLFxuICAgIHBsYXllclNoaXBzLFxuICAgIGNvbXB1dGVyU2hpcHMsXG4gICAgYXBwVmlldztcblxuICBsZXQgc2hpcFBvaW50ZXIgPSAwO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIHBsYXllckEgPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlckFJID0gY29tcHV0ZXIoKTtcbiAgICBwbGF5ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBjb21wdXRlclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGFwcFZpZXcgPSB2aWV3KCk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gICAgYXBwVmlldy5iaW5kSGFuZGxlcnMoXG4gICAgICB7IGhvdmVySGFuZGxlcjogaGFuZGxlQ2hlY2tQbGFjZW1lbnQsIGNsaWNrSGFuZGxlcjogaGFuZGxlUGxhY2VtZW50IH0sXG4gICAgICAwXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBiZWdpbkdhbWUgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5yZW1vdmVBbGxIYW5kbGVycygwKTtcbiAgICBwb3B1bGF0ZUNvbXB1dGVyVHVyZigpO1xuICAgIGFwcFZpZXcuYmluZEhhbmRsZXJzKHsgY2xpY2tIYW5kbGVyOiBoYW5kbGVBdHRhY2sgfSwgMSk7XG4gICAgLy8gYXBwVmlldy5zdGFydEdhbWUoKTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUNvbXB1dGVyVHVyZiA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21JbnQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH07XG4gICAgY29tcHV0ZXJTaGlwcy5tYXAoKHNoaXApID0+IHtcbiAgICAgIGxldCB4LCB5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tSW50KCk7XG4gICAgICAgIHkgPSByYW5kb21JbnQoKTtcbiAgICAgIH0gd2hpbGUgKCFjb21wdXRlclR1cmYuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHkpKTtcbiAgICAgIGNvbXB1dGVyVHVyZi5wbGFjZVNoaXAoc2hpcCwgeCwgeSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJEaWRIaXQgPSBwbGF5ZXJBLmF0dGFjayh4LCB5LCBjb21wdXRlclR1cmYpO1xuICAgIGFwcFZpZXcuZGlzYWJsZSh4LCB5LCBib2FyZEluZGV4KTtcbiAgICBhcHBWaWV3LnBhaW50KHgsIHksIGJvYXJkSW5kZXgsIHBsYXllckRpZEhpdCk7XG4gICAgY29uc3QgW2NvbXB1dGVyRGlkSGl0LCBjb21wdXRlckF0dGFja1gsIGNvbXB1dGVyQXR0YWNrWV0gPVxuICAgICAgY29tcHV0ZXJBSS5yYW5kb21BdHRhY2socGxheWVyVHVyZik7XG4gICAgY29uc3QgcGxheWVyQm9hcmRJbmRleCA9IDA7XG4gICAgYXBwVmlldy5wYWludChcbiAgICAgIGNvbXB1dGVyQXR0YWNrWCxcbiAgICAgIGNvbXB1dGVyQXR0YWNrWSxcbiAgICAgIHBsYXllckJvYXJkSW5kZXgsXG4gICAgICBjb21wdXRlckRpZEhpdFxuICAgICk7XG4gICAgaWYgKGNvbXB1dGVyVHVyZi5jaGVja0hhc0xvc3QoKSB8fCBwbGF5ZXJUdXJmLmNoZWNrSGFzTG9zdCgpKSB7XG4gICAgICBoYW5kbGVHYW1lT3ZlcigpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVHYW1lT3ZlciA9ICgpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gY29tcHV0ZXJUdXJmLmNoZWNrSGFzTG9zdCgpID8gJ1lvdSB3aW4hJyA6ICdZb3UgbG9zZSc7XG4gICAgYXBwVmlldy5kaXNwbGF5V2lubmVyKG1lc3NhZ2UpO1xuICAgIGFwcFZpZXcuZGlzcGxheVBsYXlBZ2FpbigpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNoZWNrUGxhY2VtZW50ID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBhcHBWaWV3LmNsZWFyUHJldkhpZ2hsaWdodHMoKTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRydWUsIGJvYXJkSW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQbGFjZW1lbnQgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gcGxheWVyU2hpcHNbc2hpcFBvaW50ZXJdO1xuICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgIGFwcFZpZXcuY2xlYXJQcmV2SGlnaGxpZ2h0cygpO1xuICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCBmYWxzZSwgYm9hcmRJbmRleCk7XG4gICAgICBwbGF5ZXJUdXJmLnBsYWNlU2hpcChjdXJyZW50U2hpcCwgeCwgeSk7XG4gICAgICBzaGlwUG9pbnRlciArPSAxO1xuICAgIH1cbiAgICBpZiAoc2hpcFBvaW50ZXIgPT09IHBsYXllclNoaXBzLmxlbmd0aCkgYmVnaW5HYW1lKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIC8vIHggY29vcmRpbmF0ZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgYm9hcmRbaV0gPSBbXTtcbiAgICAvL3kgY29vcmRpbmF0ZXNcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGJvYXJkW2ldW2pdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFt4ICsgaV1beV0gPSBzaGlwO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGxldCBpc0FscmVhZHlPY2N1cGllZCA9IGZhbHNlO1xuICAgIGxldCBpc091dE9mQm91bmRzID0gc2hpcC5ib2R5Lmxlbmd0aCArIHggPiAxMDtcbiAgICBpZiAoIWlzT3V0T2ZCb3VuZHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFt4ICsgaV1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICBpc0FscmVhZHlPY2N1cGllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFpc0FscmVhZHlPY2N1cGllZCAmJiAhaXNPdXRPZkJvdW5kcztcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldICE9PSAnc3RyaW5nJyAmJiBib2FyZFt4XVt5XSAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3hdW3ldO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVt5XSA9PT0gc2hpcCkge1xuICAgICAgICAgIGJvYXJkW3hdW3ldID0gJ2hpdCc7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgYm9hcmRbeF1beV0gPSAnbWlzc2VkJztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tIYXNMb3N0ID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1ByZXNlbnQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2pdICE9PSAnc3RyaW5nJyAmJiBib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNoaXBzUHJlc2VudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFzaGlwc1ByZXNlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0hhc0xvc3QsXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gW2dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpLCB4LCB5XTtcbiAgICB9LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgYm9keSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYm9keS5wdXNoKG51bGwpO1xuICB9XG4gIGNvbnN0IG1ldGhvZHMgPSBzaGlwTWV0aG9kcygpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbWV0aG9kcywgeyBib2R5IH0pO1xufTtcblxuY29uc3Qgc2hpcE1ldGhvZHMgPSAoKSA9PiB7XG4gIC8vaW5wdXQ6IGluZGV4IG9mIGJvZHlcbiAgZnVuY3Rpb24gaGl0KHBvcykge1xuICAgIGxldCBpc0hpdCA9IGZhbHNlO1xuICAgIGlmIChwb3MgPCB0aGlzLmJvZHkubGVuZ3RoICYmIHBvcyA+PSAwKSB7XG4gICAgICB0aGlzLmJvZHlbcG9zXSA9ICdoaXQnO1xuICAgICAgaXNIaXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9keS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSAnaGl0Jyk7XG4gIH1cblxuICAvL291dHB1dDogYm9vbGVhblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHZpZXcgPSAoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgLi4uY2xhc3NOYW1lcykgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc05hbWVzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXNbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnZ2FtZS10aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0JBVFRMRVNISVBTJztcblxuICAgIGNvbnN0IHN0YXR1cyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzdGF0dXMnKTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyc7XG5cbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9ICdQbGF5ZXInO1xuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZCwgcGxheWVyTmFtZSk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBjb21wdXRlck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBjb21wdXRlck5hbWUudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXInO1xuICAgIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyTmFtZSk7XG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZENvbnRhaW5lciwgY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKHRpdGxlLCBzdGF0dXMsIGJvYXJkc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQWxsSGFuZGxlcnMgPSAoYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWdyaWQnKVtib2FyZEluZGV4XTtcbiAgICBib2FyZC5yZXBsYWNlV2l0aChib2FyZC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNxdWFyZScpO1xuICAgIGNvbnN0IGluZGV4U3RhcnQgPSBib2FyZEluZGV4ICogMTAwO1xuICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIDEwMDtcbiAgICBjb25zdCBib2FyZEdyaWQgPSBbLi4uZ3JpZF0uc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpO1xuICAgIHJldHVybiBib2FyZEdyaWQ7XG4gIH07XG5cbiAgY29uc3QgYmluZEhhbmRsZXJzID0gKGhhbmRsZXJzT2JqLCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBnZXRCb2FyZChib2FyZEluZGV4KTtcblxuICAgIGJvYXJkLm1hcCgoc3F1YXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgeCA9IGluZGV4ICUgMTA7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnaG92ZXJIYW5kbGVyJykpIHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnNPYmouaG92ZXJIYW5kbGVyKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnY2xpY2tIYW5kbGVyJykpXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVyc09iai5jbGlja0hhbmRsZXIoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGxldCBib2FyZCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NxdWFyZScpO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBgJHtqfSwgJHtpfWA7XG4gICAgICAgIHJvdy5hcHBlbmQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgaGlnaGxpZ2h0U2hpcCA9IChsZW5ndGgsIHgsIHksIHRlbXAsIGJvYXJkSW5kZXgpID0+IHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGVtcCA/ICdzaGlwLXBvc3NpYmxlJyA6ICdzaGlwJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoeCArIGksIHksIGJvYXJkSW5kZXgpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0U3F1YXJlID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm93JylbeSArIGJvYXJkSW5kZXggKiAxMF07XG4gICAgcmV0dXJuIHJvdy5jaGlsZE5vZGVzW3hdO1xuICB9O1xuXG4gIGNvbnN0IGRpc2FibGUgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGdldFNxdWFyZSh4LCB5LCBib2FyZEluZGV4KTtcbiAgICBzcXVhcmUucmVwbGFjZVdpdGgoc3F1YXJlLmNsb25lTm9kZShmYWxzZSkpO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyUHJldkhpZ2hsaWdodHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJldkhpZ2hsaWdodHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1wb3NzaWJsZScpO1xuICAgIFsuLi5wcmV2SGlnaGxpZ2h0c10ubWFwKChwb3NzaWJsZVNoaXApID0+XG4gICAgICBwb3NzaWJsZVNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1wb3NzaWJsZScpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBwYWludCA9ICh4LCB5LCBib2FyZEluZGV4LCBkaWRIaXQpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gZGlkSGl0ID8gJ2hpdCcgOiAnbWlzcyc7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5V2lubmVyID0gKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UGxheUFnYWluID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGFyZW50ID0gYm9hcmRzQ29udGFpbmVyLnBhcmVudE5vZGU7XG4gICAgY29uc3QgYnV0dG9uID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXktYWdhaW4nKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnUGxheSBBZ2Fpbic7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShidXR0b24sIGJvYXJkc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGhpZ2hsaWdodFNoaXAsXG4gICAgYmluZEhhbmRsZXJzLFxuICAgIHJlbW92ZUFsbEhhbmRsZXJzLFxuICAgIGNsZWFyUHJldkhpZ2hsaWdodHMsXG4gICAgZGlzYWJsZSxcbiAgICBwYWludCxcbiAgICBkaXNwbGF5V2lubmVyLFxuICAgIGRpc3BsYXlQbGF5QWdhaW4sXG4gIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBiYXR0bGVzaGlwID0gZ2FtZShwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpO1xuYmF0dGxlc2hpcC5pbml0KCk7XG4iXSwibmFtZXMiOlsiZ2FtZSIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZWJvYXJkIiwic2hpcCIsInZpZXciLCJwbGF5ZXJUdXJmIiwiY29tcHV0ZXJUdXJmIiwicGxheWVyQSIsImNvbXB1dGVyQUkiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJhcHBWaWV3Iiwic2hpcFBvaW50ZXIiLCJpbml0IiwiYmluZEhhbmRsZXJzIiwiaG92ZXJIYW5kbGVyIiwiaGFuZGxlQ2hlY2tQbGFjZW1lbnQiLCJjbGlja0hhbmRsZXIiLCJoYW5kbGVQbGFjZW1lbnQiLCJiZWdpbkdhbWUiLCJyZW1vdmVBbGxIYW5kbGVycyIsInBvcHVsYXRlQ29tcHV0ZXJUdXJmIiwiaGFuZGxlQXR0YWNrIiwicmFuZG9tSW50IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWFwIiwieCIsInkiLCJpc1ZhbGlkUG9zaXRpb24iLCJwbGFjZVNoaXAiLCJib2FyZEluZGV4IiwicGxheWVyRGlkSGl0IiwiYXR0YWNrIiwiZGlzYWJsZSIsInBhaW50IiwicmFuZG9tQXR0YWNrIiwiY29tcHV0ZXJEaWRIaXQiLCJjb21wdXRlckF0dGFja1giLCJjb21wdXRlckF0dGFja1kiLCJwbGF5ZXJCb2FyZEluZGV4IiwiY2hlY2tIYXNMb3N0IiwiaGFuZGxlR2FtZU92ZXIiLCJtZXNzYWdlIiwiZGlzcGxheVdpbm5lciIsImRpc3BsYXlQbGF5QWdhaW4iLCJjdXJyZW50U2hpcCIsImNsZWFyUHJldkhpZ2hsaWdodHMiLCJoaWdobGlnaHRTaGlwIiwiYm9keSIsImxlbmd0aCIsImJvYXJkIiwiaSIsImoiLCJpc0FscmVhZHlPY2N1cGllZCIsImlzT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwic2hpcHNQcmVzZW50IiwiZ2FtZUJvYXJkIiwiYWxyZWFkeVBsYXllZCIsInJhbmRvbUNvb3JkIiwia2V5IiwiaW5jbHVkZXMiLCJwdXNoIiwibWV0aG9kcyIsInNoaXBNZXRob2RzIiwiT2JqZWN0IiwiYXNzaWduIiwiaGl0IiwicG9zIiwiaXNIaXQiLCJpc1N1bmsiLCJldmVyeSIsInBvc2l0aW9uIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJlbCIsImRvY3VtZW50IiwiY2xhc3NOYW1lcyIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInN0YXR1cyIsImJvYXJkc0NvbnRhaW5lciIsInBsYXllckJvYXJkQ29udGFpbmVyIiwicGxheWVyTmFtZSIsInBsYXllckJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhcHBlbmQiLCJjb21wdXRlckJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJOYW1lIiwiY29tcHV0ZXJCb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVwbGFjZVdpdGgiLCJjbG9uZU5vZGUiLCJnZXRCb2FyZCIsImdyaWQiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJib2FyZEdyaWQiLCJzbGljZSIsImhhbmRsZXJzT2JqIiwic3F1YXJlIiwiaGFzT3duUHJvcGVydHkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93IiwidGVtcCIsImNsYXNzTmFtZSIsImdldFNxdWFyZSIsImNoaWxkTm9kZXMiLCJwcmV2SGlnaGxpZ2h0cyIsInBvc3NpYmxlU2hpcCIsInJlbW92ZSIsImRpZEhpdCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJidXR0b24iLCJpbnNlcnRCZWZvcmUiLCJiYXR0bGVzaGlwIl0sInNvdXJjZVJvb3QiOiIifQ==