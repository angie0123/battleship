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
    appView.setHandlers({
      handlePlacement: handlePlacement
    });
    appView.init();
  };

  var beginGame = function beginGame() {
    appView.setHandlers({
      handleAttack: handleAttack
    });
    appView.startGame();
  };

  var handleAttack = function handleAttack() {};

  var handlePlacement = function handlePlacement(x, y, temp) {
    var currentShip = playerShips[shipPointer];

    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, temp);

      if (!temp) {
        playerTurf.placeShip(currentShip, x, y);
        shipPointer += 1;
      }
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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

    console.log(board[x][y], ship);
  };

  var isValidPosition = function isValidPosition(ship, x, y) {
    var isAlreadyOccupied = false;
    var isOutOfBounds = ship.body.length + x > 10;

    if (!isOutOfBounds) {
      for (var _i2 = 0; _i2 < ship.body.length; _i2++) {
        if (board[x + _i2][y] !== null) {
          isAlreadyOccupied = true;
          console.log('occupied!');
        }
      }
    }

    console.log(board[x][y]);
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

  var checkHasWon = function checkHasWon() {
    return board.every(function (xPos) {
      return xPos.every(function (yPos) {
        return _typeof(yPos) !== 'object';
      });
    });
  };

  return {
    placeShip: placeShip,
    board: board,
    receiveAttack: receiveAttack,
    checkHasWon: checkHasWon,
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


var player = function player(name) {
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
      return gameBoard.receiveAttack(x, y);
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
  var handlers;

  var setHandlers = function setHandlers(handlerObj) {
    handlers = handlerObj;
  };

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

  var createBoard = function createBoard() {
    var board = createElement('div', 'board-grid');

    var _loop = function _loop(i) {
      var row = createElement('div', 'row');

      var _loop2 = function _loop2(j) {
        var square = createElement('div', 'square');
        square.textContent = "".concat(j, ", ").concat(i);
        square.addEventListener('mouseenter', function () {
          handlers.handlePlacement(j, i, true);
        });
        square.addEventListener('click', function () {
          handlers.handlePlacement(j, i, false);
        });
        row.append(square);
      };

      for (var j = 0; j < 10; j++) {
        _loop2(j);
      }

      board.append(row);
    };

    for (var i = 0; i < 10; i++) {
      _loop(i);
    }

    return board;
  };

  var highlightShip = function highlightShip(length, x, y, temp) {
    var className = temp ? 'ship-possible' : 'ship';

    if (temp) {
      var prevHighlights = document.querySelectorAll('.ship-possible');

      _toConsumableArray(prevHighlights).map(function (possibleShip) {
        return possibleShip.classList.remove('ship-possible');
      });
    }

    var row = document.querySelectorAll('.row')[y];

    for (var i = 0; i < length; i++) {
      row.childNodes[x + i].classList.add(className);
    }
  };

  return {
    init: init,
    setHandlers: setHandlers,
    highlightShip: highlightShip
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnYW1lID0gKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldykgPT4ge1xuICBsZXQgcGxheWVyVHVyZixcbiAgICBjb21wdXRlclR1cmYsXG4gICAgcGxheWVyQSxcbiAgICBjb21wdXRlckFJLFxuICAgIHBsYXllclNoaXBzLFxuICAgIGNvbXB1dGVyU2hpcHMsXG4gICAgYXBwVmlldztcblxuICBsZXQgc2hpcFBvaW50ZXIgPSAwO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIHBsYXllckEgPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlckFJID0gY29tcHV0ZXIoKTtcbiAgICBwbGF5ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBjb21wdXRlclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGFwcFZpZXcgPSB2aWV3KCk7XG4gICAgYXBwVmlldy5zZXRIYW5kbGVycyh7IGhhbmRsZVBsYWNlbWVudCB9KTtcbiAgICBhcHBWaWV3LmluaXQoKTtcbiAgfTtcblxuICBjb25zdCBiZWdpbkdhbWUgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5zZXRIYW5kbGVycyh7IGhhbmRsZUF0dGFjayB9KTtcbiAgICBhcHBWaWV3LnN0YXJ0R2FtZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUF0dGFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IGhhbmRsZVBsYWNlbWVudCA9ICh4LCB5LCB0ZW1wKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0ZW1wKTtcbiAgICAgIGlmICghdGVtcCkge1xuICAgICAgICBwbGF5ZXJUdXJmLnBsYWNlU2hpcChjdXJyZW50U2hpcCwgeCwgeSk7XG4gICAgICAgIHNoaXBQb2ludGVyICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaGlwUG9pbnRlciA9PT0gcGxheWVyU2hpcHMubGVuZ3RoKSBiZWdpbkdhbWUoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgLy8geCBjb29yZGluYXRlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICAgIC8veSBjb29yZGluYXRlc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgYm9hcmRbaV1bal0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGJvYXJkW3hdW3ldLCBzaGlwKTtcbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGxldCBpc0FscmVhZHlPY2N1cGllZCA9IGZhbHNlO1xuICAgIGxldCBpc091dE9mQm91bmRzID0gc2hpcC5ib2R5Lmxlbmd0aCArIHggPiAxMDtcbiAgICBpZiAoIWlzT3V0T2ZCb3VuZHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFt4ICsgaV1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICBpc0FscmVhZHlPY2N1cGllZCA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29jY3VwaWVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGJvYXJkW3hdW3ldKTtcbiAgICByZXR1cm4gIWlzQWxyZWFkeU9jY3VwaWVkICYmICFpc091dE9mQm91bmRzO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gIT09ICdzdHJpbmcnICYmIGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbeF1beV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW3ldID09PSBzaGlwKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9ICdtaXNzZWQnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hhc1dvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gYm9hcmQuZXZlcnkoKHhQb3MpID0+XG4gICAgICB4UG9zLmV2ZXJ5KCh5UG9zKSA9PiB0eXBlb2YgeVBvcyAhPT0gJ29iamVjdCcpXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBib2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGNoZWNrSGFzV29uLFxuICAgIGlzVmFsaWRQb3NpdGlvbixcbiAgfTtcbn07XG4iLCJleHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG5cbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gIHJldHVybiB7XG4gICAgYXR0YWNrOiAoeCwgeSwgZ2FtZUJvYXJkKSA9PiB7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IGNvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBhbHJlYWR5UGxheWVkID0gW107XG4gIGNvbnN0IHJhbmRvbUNvb3JkID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICByZXR1cm4ge1xuICAgIHJhbmRvbUF0dGFjazogKGdhbWVCb2FyZCkgPT4ge1xuICAgICAgbGV0IHgsIHksIGtleTtcbiAgICAgIGRvIHtcbiAgICAgICAgeCA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIHkgPSByYW5kb21Db29yZCgpO1xuICAgICAgICBrZXkgPSBgJHt4fSAke3l9YDtcbiAgICAgIH0gd2hpbGUgKGFscmVhZHlQbGF5ZWQuaW5jbHVkZXMoa2V5KSk7XG4gICAgICBhbHJlYWR5UGxheWVkLnB1c2goa2V5KTtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgYm9keSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYm9keS5wdXNoKG51bGwpO1xuICB9XG4gIGNvbnN0IG1ldGhvZHMgPSBzaGlwTWV0aG9kcygpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbWV0aG9kcywgeyBib2R5IH0pO1xufTtcblxuY29uc3Qgc2hpcE1ldGhvZHMgPSAoKSA9PiB7XG4gIC8vaW5wdXQ6IGluZGV4IG9mIGJvZHlcbiAgZnVuY3Rpb24gaGl0KHBvcykge1xuICAgIGxldCBpc0hpdCA9IGZhbHNlO1xuICAgIGlmIChwb3MgPCB0aGlzLmJvZHkubGVuZ3RoICYmIHBvcyA+PSAwKSB7XG4gICAgICB0aGlzLmJvZHlbcG9zXSA9ICdoaXQnO1xuICAgICAgaXNIaXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9keS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSAnaGl0Jyk7XG4gIH1cblxuICAvL291dHB1dDogYm9vbGVhblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHZpZXcgPSAoKSA9PiB7XG4gIGxldCBoYW5kbGVycztcblxuICBjb25zdCBzZXRIYW5kbGVycyA9IChoYW5kbGVyT2JqKSA9PiB7XG4gICAgaGFuZGxlcnMgPSBoYW5kbGVyT2JqO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgLi4uY2xhc3NOYW1lcykgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc05hbWVzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXNbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnZ2FtZS10aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0JBVFRMRVNISVBTJztcblxuICAgIGNvbnN0IHN0YXR1cyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzdGF0dXMnKTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyc7XG5cbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9ICdQbGF5ZXInO1xuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZCwgcGxheWVyTmFtZSk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBjb21wdXRlck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBjb21wdXRlck5hbWUudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXInO1xuICAgIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyTmFtZSk7XG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZENvbnRhaW5lciwgY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKHRpdGxlLCBzdGF0dXMsIGJvYXJkc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IGJvYXJkID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IGAke2p9LCAke2l9YDtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnMuaGFuZGxlUGxhY2VtZW50KGosIGksIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXJzLmhhbmRsZVBsYWNlbWVudChqLCBpLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByb3cuYXBwZW5kKHNxdWFyZSk7XG4gICAgICB9XG4gICAgICBib2FyZC5hcHBlbmQocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGhpZ2hsaWdodFNoaXAgPSAobGVuZ3RoLCB4LCB5LCB0ZW1wKSA9PiB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRlbXAgPyAnc2hpcC1wb3NzaWJsZScgOiAnc2hpcCc7XG4gICAgaWYgKHRlbXApIHtcbiAgICAgIGNvbnN0IHByZXZIaWdobGlnaHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcG9zc2libGUnKTtcbiAgICAgIFsuLi5wcmV2SGlnaGxpZ2h0c10ubWFwKChwb3NzaWJsZVNoaXApID0+XG4gICAgICAgIHBvc3NpYmxlU2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXBvc3NpYmxlJylcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3cnKVt5XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByb3cuY2hpbGROb2Rlc1t4ICsgaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgc2V0SGFuZGxlcnMsXG4gICAgaGlnaGxpZ2h0U2hpcCxcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWUgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGJhdHRsZXNoaXAgPSBnYW1lKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldyk7XG5iYXR0bGVzaGlwLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJnYW1lIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJzaGlwIiwidmlldyIsInBsYXllclR1cmYiLCJjb21wdXRlclR1cmYiLCJwbGF5ZXJBIiwiY29tcHV0ZXJBSSIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsImFwcFZpZXciLCJzaGlwUG9pbnRlciIsImluaXQiLCJzZXRIYW5kbGVycyIsImhhbmRsZVBsYWNlbWVudCIsImJlZ2luR2FtZSIsImhhbmRsZUF0dGFjayIsInN0YXJ0R2FtZSIsIngiLCJ5IiwidGVtcCIsImN1cnJlbnRTaGlwIiwiaXNWYWxpZFBvc2l0aW9uIiwiaGlnaGxpZ2h0U2hpcCIsImJvZHkiLCJsZW5ndGgiLCJwbGFjZVNoaXAiLCJib2FyZCIsImkiLCJqIiwiY29uc29sZSIsImxvZyIsImlzQWxyZWFkeU9jY3VwaWVkIiwiaXNPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJjaGVja0hhc1dvbiIsImV2ZXJ5IiwieFBvcyIsInlQb3MiLCJuYW1lIiwiYXR0YWNrIiwiZ2FtZUJvYXJkIiwiYWxyZWFkeVBsYXllZCIsInJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQXR0YWNrIiwia2V5IiwiaW5jbHVkZXMiLCJwdXNoIiwibWV0aG9kcyIsInNoaXBNZXRob2RzIiwiT2JqZWN0IiwiYXNzaWduIiwiaGl0IiwicG9zIiwiaXNIaXQiLCJpc1N1bmsiLCJwb3NpdGlvbiIsImhhbmRsZXJzIiwiaGFuZGxlck9iaiIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNsYXNzTmFtZXMiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGF0dXMiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJwbGF5ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwiYXBwZW5kIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsImNvbXB1dGVyTmFtZSIsImNvbXB1dGVyQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwicm93Iiwic3F1YXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTmFtZSIsInByZXZIaWdobGlnaHRzIiwicXVlcnlTZWxlY3RvckFsbCIsIm1hcCIsInBvc3NpYmxlU2hpcCIsInJlbW92ZSIsImNoaWxkTm9kZXMiLCJiYXR0bGVzaGlwIl0sInNvdXJjZVJvb3QiOiIifQ==