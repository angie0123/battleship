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
    appView.displayPlayAgain(handleRestart);
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

  var handleRestart = function handleRestart() {
    appView.clear();
    init();
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

  var displayPlayAgain = function displayPlayAgain(restartHandler) {
    var boardsContainer = document.querySelector('.boards-container');
    var parent = boardsContainer.parentNode;
    var button = createElement('div', 'play-again', 'hoverable');
    button.textContent = 'Play Again';
    button.addEventListener('click', function () {
      restartHandler();
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNZ0gsVUFBVSxHQUFHdkksMkNBQUksQ0FBQ0MsMkNBQUQsRUFBU0MsNkNBQVQsRUFBbUJDLGlEQUFuQixFQUE4QkMsdUNBQTlCLEVBQW9DQyx1Q0FBcEMsQ0FBdkI7QUFDQWtJLFVBQVUsQ0FBQ3ZILElBQVgsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnYW1lID0gKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldykgPT4ge1xuICBsZXQgcGxheWVyVHVyZixcbiAgICBjb21wdXRlclR1cmYsXG4gICAgcGxheWVyQSxcbiAgICBjb21wdXRlckFJLFxuICAgIHBsYXllclNoaXBzLFxuICAgIGNvbXB1dGVyU2hpcHMsXG4gICAgYXBwVmlldztcblxuICBsZXQgc2hpcFBvaW50ZXIgPSAwO1xuICBjb25zdCBwbGF5ZXJCb2FyZElkID0gMDtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZElkID0gMTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHBsYXllclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXJBID0gcGxheWVyKCk7XG4gICAgY29tcHV0ZXJBSSA9IGNvbXB1dGVyKCk7XG4gICAgcGxheWVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgY29tcHV0ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBhcHBWaWV3ID0gdmlldygpO1xuICAgIGFwcFZpZXcuaW5pdCgpO1xuICAgIGFwcFZpZXcuYmluZEhhbmRsZXJzKHBsYXllckJvYXJkSGFuZGxlcnMsIHBsYXllckJvYXJkSWQpO1xuICB9O1xuXG4gIGNvbnN0IGJlZ2luR2FtZSA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnJlbW92ZUFsbEhhbmRsZXJzKHBsYXllckJvYXJkSWQpO1xuICAgIHBvcHVsYXRlQ29tcHV0ZXJUdXJmKCk7XG4gICAgYXBwVmlldy5iaW5kSGFuZGxlcnMoY29tcHV0ZXJCb2FyZEhhbmRsZXJzLCBjb21wdXRlckJvYXJkSWQpO1xuICAgIGFwcFZpZXcuc3RhcnRHYW1lTXNnKCk7XG4gIH07XG5cbiAgY29uc3QgcG9wdWxhdGVDb21wdXRlclR1cmYgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tSW50ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9O1xuICAgIGNvbXB1dGVyU2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICBsZXQgeCwgeTtcbiAgICAgIGRvIHtcbiAgICAgICAgeCA9IHJhbmRvbUludCgpO1xuICAgICAgICB5ID0gcmFuZG9tSW50KCk7XG4gICAgICB9IHdoaWxlICghY29tcHV0ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihzaGlwLCB4LCB5KSk7XG4gICAgICBjb21wdXRlclR1cmYucGxhY2VTaGlwKHNoaXAsIHgsIHkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUF0dGFja0NhbGxiYWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlQXR0YWNrKCkge1xuICAgICAgY29uc3QgcGxheWVyRGlkSGl0ID0gcGxheWVyQS5hdHRhY2soeCwgeSwgY29tcHV0ZXJUdXJmKTtcbiAgICAgIGFwcFZpZXcuZGlzYWJsZSh4LCB5LCBib2FyZEluZGV4KTtcbiAgICAgIGFwcFZpZXcucGFpbnQoeCwgeSwgYm9hcmRJbmRleCwgcGxheWVyRGlkSGl0KTtcbiAgICAgIGNvbnN0IFtjb21wdXRlckRpZEhpdCwgY29tcHV0ZXJBdHRhY2tYLCBjb21wdXRlckF0dGFja1ldID1cbiAgICAgICAgY29tcHV0ZXJBSS5yYW5kb21BdHRhY2socGxheWVyVHVyZik7XG4gICAgICBhcHBWaWV3LnBhaW50KFxuICAgICAgICBjb21wdXRlckF0dGFja1gsXG4gICAgICAgIGNvbXB1dGVyQXR0YWNrWSxcbiAgICAgICAgcGxheWVyQm9hcmRJZCxcbiAgICAgICAgY29tcHV0ZXJEaWRIaXRcbiAgICAgICk7XG4gICAgICBpZiAoY29tcHV0ZXJUdXJmLmNoZWNrSGFzTG9zdCgpIHx8IHBsYXllclR1cmYuY2hlY2tIYXNMb3N0KCkpIHtcbiAgICAgICAgaGFuZGxlR2FtZU92ZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUdhbWVPdmVyID0gKCkgPT4ge1xuICAgIGFwcFZpZXcucmVtb3ZlQWxsSGFuZGxlcnMoY29tcHV0ZXJCb2FyZElkKTtcbiAgICBjb25zdCBtZXNzYWdlID0gY29tcHV0ZXJUdXJmLmNoZWNrSGFzTG9zdCgpID8gJ1lvdSB3aW4hJyA6ICdZb3UgbG9zZSc7XG4gICAgYXBwVmlldy5kaXNwbGF5V2lubmVyKG1lc3NhZ2UpO1xuICAgIGFwcFZpZXcuZGlzcGxheVBsYXlBZ2FpbihoYW5kbGVSZXN0YXJ0KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGVja1BsYWNlbWVudENhbGxiYWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlQ2hlY2tQbGFjZW1lbnQoKSB7XG4gICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICAgIGFwcFZpZXcuY2xlYXJQcmV2SGlnaGxpZ2h0cygpO1xuICAgICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRydWUsIGJvYXJkSW5kZXgpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50Q2FsbGJhY2sgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoKSB7XG4gICAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgICAgYXBwVmlldy5jbGVhclByZXZIaWdobGlnaHRzKCk7XG4gICAgICAgIGFwcFZpZXcuaGlnaGxpZ2h0U2hpcChjdXJyZW50U2hpcC5ib2R5Lmxlbmd0aCwgeCwgeSwgZmFsc2UsIGJvYXJkSW5kZXgpO1xuICAgICAgICBwbGF5ZXJUdXJmLnBsYWNlU2hpcChjdXJyZW50U2hpcCwgeCwgeSk7XG4gICAgICAgIHNoaXBQb2ludGVyICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoc2hpcFBvaW50ZXIgPT09IHBsYXllclNoaXBzLmxlbmd0aCkgYmVnaW5HYW1lKCk7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXN0YXJ0ID0gKCkgPT4ge1xuICAgIGFwcFZpZXcuY2xlYXIoKTtcbiAgICBpbml0KCk7XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJCb2FyZEhhbmRsZXJzID0ge1xuICAgIGNsaWNrSGFuZGxlcjogaGFuZGxlQXR0YWNrQ2FsbGJhY2ssXG4gIH07XG5cbiAgY29uc3QgcGxheWVyQm9hcmRIYW5kbGVycyA9IHtcbiAgICBjbGlja0hhbmRsZXI6IGhhbmRsZVBsYWNlbWVudENhbGxiYWNrLFxuICAgIGhvdmVySGFuZGxlcjogaGFuZGxlQ2hlY2tQbGFjZW1lbnRDYWxsYmFjayxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgLy8geCBjb29yZGluYXRlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICAgIC8veSBjb29yZGluYXRlc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgYm9hcmRbaV1bal0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgbGV0IGlzQWxyZWFkeU9jY3VwaWVkID0gZmFsc2U7XG4gICAgbGV0IGlzT3V0T2ZCb3VuZHMgPSBzaGlwLmJvZHkubGVuZ3RoICsgeCA+IDEwO1xuICAgIGlmICghaXNPdXRPZkJvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3ggKyBpXVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzQWxyZWFkeU9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIWlzQWxyZWFkeU9jY3VwaWVkICYmICFpc091dE9mQm91bmRzO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gIT09ICdzdHJpbmcnICYmIGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbeF1beV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW3ldID09PSBzaGlwKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9ICdtaXNzZWQnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hhc0xvc3QgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzUHJlc2VudCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbaV1bal0gIT09ICdzdHJpbmcnICYmIGJvYXJkW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgICAgc2hpcHNQcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIXNoaXBzUHJlc2VudDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBib2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGNoZWNrSGFzTG9zdCxcbiAgICBpc1ZhbGlkUG9zaXRpb24sXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuXG5jb25zdCBwbGF5ZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgYXR0YWNrOiAoeCwgeSwgZ2FtZUJvYXJkKSA9PiB7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IGNvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBhbHJlYWR5UGxheWVkID0gW107XG4gIGNvbnN0IHJhbmRvbUNvb3JkID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICByZXR1cm4ge1xuICAgIHJhbmRvbUF0dGFjazogKGdhbWVCb2FyZCkgPT4ge1xuICAgICAgbGV0IHgsIHksIGtleTtcbiAgICAgIGRvIHtcbiAgICAgICAgeCA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIHkgPSByYW5kb21Db29yZCgpO1xuICAgICAgICBrZXkgPSBgJHt4fSAke3l9YDtcbiAgICAgIH0gd2hpbGUgKGFscmVhZHlQbGF5ZWQuaW5jbHVkZXMoa2V5KSk7XG4gICAgICBhbHJlYWR5UGxheWVkLnB1c2goa2V5KTtcbiAgICAgIHJldHVybiBbZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSksIHgsIHldO1xuICAgIH0sXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBib2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2R5LnB1c2gobnVsbCk7XG4gIH1cbiAgY29uc3QgbWV0aG9kcyA9IHNoaXBNZXRob2RzKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZXRob2RzLCB7IGJvZHkgfSk7XG59O1xuXG5jb25zdCBzaGlwTWV0aG9kcyA9ICgpID0+IHtcbiAgLy9pbnB1dDogaW5kZXggb2YgYm9keVxuICBmdW5jdGlvbiBoaXQocG9zKSB7XG4gICAgbGV0IGlzSGl0ID0gZmFsc2U7XG4gICAgaWYgKHBvcyA8IHRoaXMuYm9keS5sZW5ndGggJiYgcG9zID49IDApIHtcbiAgICAgIHRoaXMuYm9keVtwb3NdID0gJ2hpdCc7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09ICdoaXQnKTtcbiAgfVxuXG4gIC8vb3V0cHV0OiBib29sZWFuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlldyA9ICgpID0+IHtcbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCAuLi5jbGFzc05hbWVzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzTmFtZXMpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdnYW1lLXRpdGxlJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQkFUVExFU0hJUFMnO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3N0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gJ1BsYXllcic7XG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkLCBwbGF5ZXJOYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9ICdDb21wdXRlcic7XG4gICAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJOYW1lKTtcbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkQ29udGFpbmVyLCBjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQodGl0bGUsIHN0YXR1cywgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVBbGxIYW5kbGVycyA9IChib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtZ3JpZCcpW2JvYXJkSW5kZXhdO1xuICAgIGJvYXJkLnJlcGxhY2VXaXRoKGJvYXJkLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgY29uc3QgYm9hcmRJdGVyYWJsZSA9IGdldEJvYXJkKGJvYXJkSW5kZXgpO1xuICAgIGJvYXJkSXRlcmFibGUubWFwKChzcXVhcmUpID0+IHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcmFibGUnKSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XG4gICAgY29uc3QgaW5kZXhTdGFydCA9IGJvYXJkSW5kZXggKiAxMDA7XG4gICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgMTAwO1xuICAgIGNvbnN0IGJvYXJkR3JpZCA9IFsuLi5ncmlkXS5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCk7XG4gICAgcmV0dXJuIGJvYXJkR3JpZDtcbiAgfTtcblxuICBjb25zdCBiaW5kSGFuZGxlcnMgPSAoaGFuZGxlcnNPYmosIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGdldEJvYXJkKGJvYXJkSW5kZXgpO1xuICAgIGJvYXJkLm1hcCgoc3F1YXJlLCBpbmRleCkgPT4ge1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hvdmVyYWJsZScpO1xuICAgICAgY29uc3QgeCA9IGluZGV4ICUgMTA7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnaG92ZXJIYW5kbGVyJykpIHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICAgIGhhbmRsZXJzT2JqLmhvdmVySGFuZGxlcih4LCB5LCBib2FyZEluZGV4KVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGhhbmRsZXJzT2JqLmhhc093blByb3BlcnR5KCdjbGlja0hhbmRsZXInKSlcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICBoYW5kbGVyc09iai5jbGlja0hhbmRsZXIoeCwgeSwgYm9hcmRJbmRleClcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICAgICAgcm93LmFwcGVuZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdGVtcCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGxldCBjbGFzc05hbWUgPSB0ZW1wID8gJ3NoaXAtcG9zc2libGUnIDogJ3NoaXAnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGdldFNxdWFyZSh4ICsgaSwgeSwgYm9hcmRJbmRleCk7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRTcXVhcmUgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3cnKVt5ICsgYm9hcmRJbmRleCAqIDEwXTtcbiAgICByZXR1cm4gcm93LmNoaWxkTm9kZXNbeF07XG4gIH07XG5cbiAgY29uc3QgZGlzYWJsZSA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgIGNvbnN0IG5ld1NxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICBzcXVhcmUucmVwbGFjZVdpdGgobmV3U3F1YXJlKTtcbiAgfTtcblxuICBjb25zdCBjbGVhclByZXZIaWdobGlnaHRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByZXZIaWdobGlnaHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcG9zc2libGUnKTtcbiAgICBbLi4ucHJldkhpZ2hsaWdodHNdLm1hcCgocG9zc2libGVTaGlwKSA9PlxuICAgICAgcG9zc2libGVTaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcG9zc2libGUnKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcGFpbnQgPSAoeCwgeSwgYm9hcmRJbmRleCwgZGlkSGl0KSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGRpZEhpdCA/ICdoaXQnIDogJ21pc3MnO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVdpbm5lciA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXlBZ2FpbiA9IChyZXN0YXJ0SGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGFyZW50ID0gYm9hcmRzQ29udGFpbmVyLnBhcmVudE5vZGU7XG4gICAgY29uc3QgYnV0dG9uID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXktYWdhaW4nLCAnaG92ZXJhYmxlJyk7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ1BsYXkgQWdhaW4nO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHJlc3RhcnRIYW5kbGVyKCk7XG4gICAgfSk7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShidXR0b24sIGJvYXJkc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRHYW1lTXNnID0gKCkgPT4ge1xuICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnQmVnaW4hJztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgaGlnaGxpZ2h0U2hpcCxcbiAgICBiaW5kSGFuZGxlcnMsXG4gICAgcmVtb3ZlQWxsSGFuZGxlcnMsXG4gICAgY2xlYXJQcmV2SGlnaGxpZ2h0cyxcbiAgICBkaXNhYmxlLFxuICAgIHBhaW50LFxuICAgIGRpc3BsYXlXaW5uZXIsXG4gICAgZGlzcGxheVBsYXlBZ2FpbixcbiAgICBzdGFydEdhbWVNc2csXG4gIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBiYXR0bGVzaGlwID0gZ2FtZShwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpO1xuYmF0dGxlc2hpcC5pbml0KCk7XG4iXSwibmFtZXMiOlsiZ2FtZSIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZWJvYXJkIiwic2hpcCIsInZpZXciLCJwbGF5ZXJUdXJmIiwiY29tcHV0ZXJUdXJmIiwicGxheWVyQSIsImNvbXB1dGVyQUkiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJhcHBWaWV3Iiwic2hpcFBvaW50ZXIiLCJwbGF5ZXJCb2FyZElkIiwiY29tcHV0ZXJCb2FyZElkIiwiaW5pdCIsImJpbmRIYW5kbGVycyIsInBsYXllckJvYXJkSGFuZGxlcnMiLCJiZWdpbkdhbWUiLCJyZW1vdmVBbGxIYW5kbGVycyIsInBvcHVsYXRlQ29tcHV0ZXJUdXJmIiwiY29tcHV0ZXJCb2FyZEhhbmRsZXJzIiwic3RhcnRHYW1lTXNnIiwicmFuZG9tSW50IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWFwIiwieCIsInkiLCJpc1ZhbGlkUG9zaXRpb24iLCJwbGFjZVNoaXAiLCJoYW5kbGVBdHRhY2tDYWxsYmFjayIsImJvYXJkSW5kZXgiLCJoYW5kbGVBdHRhY2siLCJwbGF5ZXJEaWRIaXQiLCJhdHRhY2siLCJkaXNhYmxlIiwicGFpbnQiLCJyYW5kb21BdHRhY2siLCJjb21wdXRlckRpZEhpdCIsImNvbXB1dGVyQXR0YWNrWCIsImNvbXB1dGVyQXR0YWNrWSIsImNoZWNrSGFzTG9zdCIsImhhbmRsZUdhbWVPdmVyIiwibWVzc2FnZSIsImRpc3BsYXlXaW5uZXIiLCJkaXNwbGF5UGxheUFnYWluIiwiaGFuZGxlUmVzdGFydCIsImhhbmRsZUNoZWNrUGxhY2VtZW50Q2FsbGJhY2siLCJoYW5kbGVDaGVja1BsYWNlbWVudCIsImN1cnJlbnRTaGlwIiwiY2xlYXJQcmV2SGlnaGxpZ2h0cyIsImhpZ2hsaWdodFNoaXAiLCJib2R5IiwibGVuZ3RoIiwiaGFuZGxlUGxhY2VtZW50Q2FsbGJhY2siLCJoYW5kbGVQbGFjZW1lbnQiLCJjbGVhciIsImNsaWNrSGFuZGxlciIsImhvdmVySGFuZGxlciIsImJvYXJkIiwiaSIsImoiLCJpc0FscmVhZHlPY2N1cGllZCIsImlzT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwic2hpcHNQcmVzZW50IiwiZ2FtZUJvYXJkIiwiYWxyZWFkeVBsYXllZCIsInJhbmRvbUNvb3JkIiwia2V5IiwiaW5jbHVkZXMiLCJwdXNoIiwibWV0aG9kcyIsInNoaXBNZXRob2RzIiwiT2JqZWN0IiwiYXNzaWduIiwiaGl0IiwicG9zIiwiaXNIaXQiLCJpc1N1bmsiLCJldmVyeSIsInBvc2l0aW9uIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJlbCIsImRvY3VtZW50IiwiY2xhc3NOYW1lcyIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInN0YXR1cyIsImJvYXJkc0NvbnRhaW5lciIsInBsYXllckJvYXJkQ29udGFpbmVyIiwicGxheWVyTmFtZSIsInBsYXllckJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhcHBlbmQiLCJjb21wdXRlckJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJOYW1lIiwiY29tcHV0ZXJCb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVwbGFjZVdpdGgiLCJjbG9uZU5vZGUiLCJib2FyZEl0ZXJhYmxlIiwiZ2V0Qm9hcmQiLCJzcXVhcmUiLCJyZW1vdmUiLCJncmlkIiwiaW5kZXhTdGFydCIsImluZGV4RW5kIiwiYm9hcmRHcmlkIiwic2xpY2UiLCJoYW5kbGVyc09iaiIsImhhc093blByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdyIsInRlbXAiLCJjbGFzc05hbWUiLCJnZXRTcXVhcmUiLCJjaGlsZE5vZGVzIiwibmV3U3F1YXJlIiwicHJldkhpZ2hsaWdodHMiLCJwb3NzaWJsZVNoaXAiLCJkaWRIaXQiLCJyZXN0YXJ0SGFuZGxlciIsInBhcmVudCIsInBhcmVudE5vZGUiLCJidXR0b24iLCJpbnNlcnRCZWZvcmUiLCJiYXR0bGVzaGlwIl0sInNvdXJjZVJvb3QiOiIifQ==