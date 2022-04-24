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
    appView.init();
    appView.bindHandlers({
      clickHandler: handlePlacement,
      hoverHandler: handlePlacement
    }, 1);
  };

  var beginGame = function beginGame() {
    appView.removePlacementHandler(handlePlacement);
    appView.bindAttackHandler({
      handleAttack: handleAttack
    });
    appView.startGame();
  };

  var handleAttack = function handleAttack() {};

  var handlePlacement = function handlePlacement(x, y, temp, boardNum) {
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

  var checkHasWon = function checkHasWon() {
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

  var bindAttackHandler = function bindAttackHandler(attackHandler) {
    console.log(attackHandler);
  };

  var bindHandlers = function bindHandlers(handlersObj, boardId) {
    var grid = document.querySelectorAll('.square');
    var indexStart = boardId * 100;
    var indexEnd = indexStart + 100;

    var boardGrid = _toConsumableArray(grid).slice(indexStart, indexEnd);

    boardGrid.map(function (square, index) {
      var x = index % 10;
      var y = Math.floor(index / 10);

      if (handlersObj.hasOwnProperty('hoverHandler')) {
        square.addEventListener('mouseenter', function () {
          handlersObj.hoverHandler(x, y, boardId);
        });
      }

      if (handlersObj.hasOwnProperty('clickHandler')) square.addEventListener('click', function () {
        handlersObj.clickHandler(x, y, boardId);
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
    highlightShip: highlightShip,
    bindHandlers: bindHandlers
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxHQUFoQyxDQUFvQzhCLFNBQXBDO0FBQ0Q7QUFDRixHQVpEOztBQWNBLFNBQU87QUFDTHZGLElBQUFBLElBQUksRUFBSkEsSUFESztBQUVMZ0IsSUFBQUEsYUFBYSxFQUFiQSxhQUZLO0FBR0xmLElBQUFBLFlBQVksRUFBWkE7QUFISyxHQUFQO0FBS0QsQ0ExRk07Ozs7OztVQ0FQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU0yRixVQUFVLEdBQUcxRywyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBcUcsVUFBVSxDQUFDNUYsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3O1xuXG4gIGxldCBzaGlwUG9pbnRlciA9IDA7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQSA9IHBsYXllcigpO1xuICAgIGNvbXB1dGVyQUkgPSBjb21wdXRlcigpO1xuICAgIHBsYXllclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGNvbXB1dGVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgYXBwVmlldyA9IHZpZXcoKTtcbiAgICBhcHBWaWV3LmluaXQoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyhcbiAgICAgIHsgY2xpY2tIYW5kbGVyOiBoYW5kbGVQbGFjZW1lbnQsIGhvdmVySGFuZGxlcjogaGFuZGxlUGxhY2VtZW50IH0sXG4gICAgICAxXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBiZWdpbkdhbWUgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5yZW1vdmVQbGFjZW1lbnRIYW5kbGVyKGhhbmRsZVBsYWNlbWVudCk7XG5cbiAgICBhcHBWaWV3LmJpbmRBdHRhY2tIYW5kbGVyKHsgaGFuZGxlQXR0YWNrIH0pO1xuICAgIGFwcFZpZXcuc3RhcnRHYW1lKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrID0gKCkgPT4ge307XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50ID0gKHgsIHksIHRlbXAsIGJvYXJkTnVtKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0ZW1wKTtcbiAgICAgIGlmICghdGVtcCkge1xuICAgICAgICBwbGF5ZXJUdXJmLnBsYWNlU2hpcChjdXJyZW50U2hpcCwgeCwgeSk7XG4gICAgICAgIHNoaXBQb2ludGVyICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzaGlwUG9pbnRlciA9PT0gcGxheWVyU2hpcHMubGVuZ3RoKSBiZWdpbkdhbWUoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgLy8geCBjb29yZGluYXRlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICAgIC8veSBjb29yZGluYXRlc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgYm9hcmRbaV1bal0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgbGV0IGlzQWxyZWFkeU9jY3VwaWVkID0gZmFsc2U7XG4gICAgbGV0IGlzT3V0T2ZCb3VuZHMgPSBzaGlwLmJvZHkubGVuZ3RoICsgeCA+IDEwO1xuICAgIGlmICghaXNPdXRPZkJvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3ggKyBpXVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzQWxyZWFkeU9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIWlzQWxyZWFkeU9jY3VwaWVkICYmICFpc091dE9mQm91bmRzO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gIT09ICdzdHJpbmcnICYmIGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbeF1beV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW3ldID09PSBzaGlwKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9ICdtaXNzZWQnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hhc1dvbiA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNQcmVzZW50ID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtqXSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICBzaGlwc1ByZXNlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhc2hpcHNQcmVzZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNXb24sXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2s6ICh4LCB5LCBnYW1lQm9hcmQpID0+IHtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFscmVhZHlQbGF5ZWQgPSBbXTtcbiAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiB7XG4gICAgcmFuZG9tQXR0YWNrOiAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBsZXQgeCwgeSwga2V5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIGtleSA9IGAke3h9ICR7eX1gO1xuICAgICAgfSB3aGlsZSAoYWxyZWFkeVBsYXllZC5pbmNsdWRlcyhrZXkpKTtcbiAgICAgIGFscmVhZHlQbGF5ZWQucHVzaChrZXkpO1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBib2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2R5LnB1c2gobnVsbCk7XG4gIH1cbiAgY29uc3QgbWV0aG9kcyA9IHNoaXBNZXRob2RzKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZXRob2RzLCB7IGJvZHkgfSk7XG59O1xuXG5jb25zdCBzaGlwTWV0aG9kcyA9ICgpID0+IHtcbiAgLy9pbnB1dDogaW5kZXggb2YgYm9keVxuICBmdW5jdGlvbiBoaXQocG9zKSB7XG4gICAgbGV0IGlzSGl0ID0gZmFsc2U7XG4gICAgaWYgKHBvcyA8IHRoaXMuYm9keS5sZW5ndGggJiYgcG9zID49IDApIHtcbiAgICAgIHRoaXMuYm9keVtwb3NdID0gJ2hpdCc7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09ICdoaXQnKTtcbiAgfVxuXG4gIC8vb3V0cHV0OiBib29sZWFuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlldyA9ICgpID0+IHtcbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCAuLi5jbGFzc05hbWVzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzTmFtZXMpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdnYW1lLXRpdGxlJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQkFUVExFU0hJUFMnO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3N0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gJ1BsYXllcic7XG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkLCBwbGF5ZXJOYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9ICdDb21wdXRlcic7XG4gICAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJOYW1lKTtcbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkQ29udGFpbmVyLCBjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQodGl0bGUsIHN0YXR1cywgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCBiaW5kQXR0YWNrSGFuZGxlciA9IChhdHRhY2tIYW5kbGVyKSA9PiB7XG4gICAgY29uc29sZS5sb2coYXR0YWNrSGFuZGxlcik7XG4gIH07XG5cbiAgY29uc3QgYmluZEhhbmRsZXJzID0gKGhhbmRsZXJzT2JqLCBib2FyZElkKSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcbiAgICBjb25zdCBpbmRleFN0YXJ0ID0gYm9hcmRJZCAqIDEwMDtcbiAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyAxMDA7XG4gICAgY29uc3QgYm9hcmRHcmlkID0gWy4uLmdyaWRdLnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKTtcblxuICAgIGJvYXJkR3JpZC5tYXAoKHNxdWFyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHggPSBpbmRleCAlIDEwO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoaW5kZXggLyAxMCk7XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2hvdmVySGFuZGxlcicpKSB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXJzT2JqLmhvdmVySGFuZGxlcih4LCB5LCBib2FyZElkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2NsaWNrSGFuZGxlcicpKVxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnNPYmouY2xpY2tIYW5kbGVyKHgsIHksIGJvYXJkSWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gYCR7an0sICR7aX1gO1xuICAgICAgICByb3cuYXBwZW5kKHNxdWFyZSk7XG4gICAgICB9XG4gICAgICBib2FyZC5hcHBlbmQocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGhpZ2hsaWdodFNoaXAgPSAobGVuZ3RoLCB4LCB5LCB0ZW1wKSA9PiB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRlbXAgPyAnc2hpcC1wb3NzaWJsZScgOiAnc2hpcCc7XG4gICAgaWYgKHRlbXApIHtcbiAgICAgIGNvbnN0IHByZXZIaWdobGlnaHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcG9zc2libGUnKTtcbiAgICAgIFsuLi5wcmV2SGlnaGxpZ2h0c10ubWFwKChwb3NzaWJsZVNoaXApID0+XG4gICAgICAgIHBvc3NpYmxlU2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXBvc3NpYmxlJylcbiAgICAgICk7XG4gICAgfVxuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3cnKVt5XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByb3cuY2hpbGROb2Rlc1t4ICsgaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgaGlnaGxpZ2h0U2hpcCxcbiAgICBiaW5kSGFuZGxlcnMsXG4gIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBiYXR0bGVzaGlwID0gZ2FtZShwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpO1xuYmF0dGxlc2hpcC5pbml0KCk7XG4iXSwibmFtZXMiOlsiZ2FtZSIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZWJvYXJkIiwic2hpcCIsInZpZXciLCJwbGF5ZXJUdXJmIiwiY29tcHV0ZXJUdXJmIiwicGxheWVyQSIsImNvbXB1dGVyQUkiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJhcHBWaWV3Iiwic2hpcFBvaW50ZXIiLCJpbml0IiwiYmluZEhhbmRsZXJzIiwiY2xpY2tIYW5kbGVyIiwiaGFuZGxlUGxhY2VtZW50IiwiaG92ZXJIYW5kbGVyIiwiYmVnaW5HYW1lIiwicmVtb3ZlUGxhY2VtZW50SGFuZGxlciIsImJpbmRBdHRhY2tIYW5kbGVyIiwiaGFuZGxlQXR0YWNrIiwic3RhcnRHYW1lIiwieCIsInkiLCJ0ZW1wIiwiYm9hcmROdW0iLCJjdXJyZW50U2hpcCIsImlzVmFsaWRQb3NpdGlvbiIsImhpZ2hsaWdodFNoaXAiLCJib2R5IiwibGVuZ3RoIiwicGxhY2VTaGlwIiwiYm9hcmQiLCJpIiwiaiIsImlzQWxyZWFkeU9jY3VwaWVkIiwiaXNPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJjaGVja0hhc1dvbiIsInNoaXBzUHJlc2VudCIsIm5hbWUiLCJhdHRhY2siLCJnYW1lQm9hcmQiLCJhbHJlYWR5UGxheWVkIiwicmFuZG9tQ29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21BdHRhY2siLCJrZXkiLCJpbmNsdWRlcyIsInB1c2giLCJtZXRob2RzIiwic2hpcE1ldGhvZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJoaXQiLCJwb3MiLCJpc0hpdCIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImVsIiwiZG9jdW1lbnQiLCJjbGFzc05hbWVzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0aXRsZSIsInRleHRDb250ZW50Iiwic3RhdHVzIiwiYm9hcmRzQ29udGFpbmVyIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyQm9hcmQiLCJjcmVhdGVCb2FyZCIsImFwcGVuZCIsImNvbXB1dGVyQm9hcmRDb250YWluZXIiLCJjb21wdXRlck5hbWUiLCJjb21wdXRlckJvYXJkIiwicXVlcnlTZWxlY3RvciIsImF0dGFja0hhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlcnNPYmoiLCJib2FyZElkIiwiZ3JpZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJib2FyZEdyaWQiLCJzbGljZSIsIm1hcCIsInNxdWFyZSIsImhhc093blByb3BlcnR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJvdyIsImNsYXNzTmFtZSIsInByZXZIaWdobGlnaHRzIiwicG9zc2libGVTaGlwIiwicmVtb3ZlIiwiY2hpbGROb2RlcyIsImJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9