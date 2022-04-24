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
      hoverHandler: handleCheckPlacement,
      clickHandler: handlePlacement
    }, 0);
  };

  var beginGame = function beginGame() {
    appView.removePlacementHandler(handlePlacement);
    appView.bindAttackHandler({
      handleAttack: handleAttack
    });
    appView.startGame();
  };

  var handleAttack = function handleAttack() {};

  var handleCheckPlacement = function handleCheckPlacement(x, y, boardId) {
    var currentShip = playerShips[shipPointer];
    appView.clearPrevHighlights();

    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, true, boardId);
    }
  };

  var handlePlacement = function handlePlacement(x, y, boardId) {
    var currentShip = playerShips[shipPointer];

    if (playerTurf.isValidPosition(currentShip, x, y)) {
      appView.highlightShip(currentShip.body.length, x, y, false, boardId);
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
          console.log(handlersObj.hoverHandler);
        });
      }

      if (handlersObj.hasOwnProperty('clickHandler')) square.addEventListener('click', function () {
        handlersObj.clickHandler(x, y, boardId);
        console.log(handlersObj.clickHandler);
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

  var highlightShip = function highlightShip(length, x, y, temp, boardId) {
    var className = temp ? 'ship-possible' : 'ship';
    clearPrevHighlights();
    var row = document.querySelectorAll('.row')[y + boardId * 10];

    for (var i = 0; i < length; i++) {
      row.childNodes[x + i].classList.add(className);
    }
  };

  var clearPrevHighlights = function clearPrevHighlights() {
    var prevHighlights = document.querySelectorAll('.ship-possible');

    _toConsumableArray(prevHighlights).map(function (possibleShip) {
      return possibleShip.classList.remove('ship-possible');
    });
  };

  return {
    init: init,
    highlightShip: highlightShip,
    bindHandlers: bindHandlers,
    clearPrevHighlights: clearPrevHighlights
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU04RSxVQUFVLEdBQUczRywyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBc0csVUFBVSxDQUFDN0YsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3O1xuXG4gIGxldCBzaGlwUG9pbnRlciA9IDA7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQSA9IHBsYXllcigpO1xuICAgIGNvbXB1dGVyQUkgPSBjb21wdXRlcigpO1xuICAgIHBsYXllclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGNvbXB1dGVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgYXBwVmlldyA9IHZpZXcoKTtcbiAgICBhcHBWaWV3LmluaXQoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyhcbiAgICAgIHsgaG92ZXJIYW5kbGVyOiBoYW5kbGVDaGVja1BsYWNlbWVudCwgY2xpY2tIYW5kbGVyOiBoYW5kbGVQbGFjZW1lbnQgfSxcbiAgICAgIDBcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGJlZ2luR2FtZSA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnJlbW92ZVBsYWNlbWVudEhhbmRsZXIoaGFuZGxlUGxhY2VtZW50KTtcblxuICAgIGFwcFZpZXcuYmluZEF0dGFja0hhbmRsZXIoeyBoYW5kbGVBdHRhY2sgfSk7XG4gICAgYXBwVmlldy5zdGFydEdhbWUoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBdHRhY2sgPSAoKSA9PiB7fTtcblxuICBjb25zdCBoYW5kbGVDaGVja1BsYWNlbWVudCA9ICh4LCB5LCBib2FyZElkKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgYXBwVmlldy5jbGVhclByZXZIaWdobGlnaHRzKCk7XG4gICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0cnVlLCBib2FyZElkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50ID0gKHgsIHksIGJvYXJkSWQpID0+IHtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIGZhbHNlLCBib2FyZElkKTtcbiAgICAgIHBsYXllclR1cmYucGxhY2VTaGlwKGN1cnJlbnRTaGlwLCB4LCB5KTtcbiAgICAgIHNoaXBQb2ludGVyICs9IDE7XG4gICAgfVxuICAgIGlmIChzaGlwUG9pbnRlciA9PT0gcGxheWVyU2hpcHMubGVuZ3RoKSBiZWdpbkdhbWUoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgLy8geCBjb29yZGluYXRlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICAgIC8veSBjb29yZGluYXRlc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgYm9hcmRbaV1bal0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgbGV0IGlzQWxyZWFkeU9jY3VwaWVkID0gZmFsc2U7XG4gICAgbGV0IGlzT3V0T2ZCb3VuZHMgPSBzaGlwLmJvZHkubGVuZ3RoICsgeCA+IDEwO1xuICAgIGlmICghaXNPdXRPZkJvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3ggKyBpXVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzQWxyZWFkeU9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIWlzQWxyZWFkeU9jY3VwaWVkICYmICFpc091dE9mQm91bmRzO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gIT09ICdzdHJpbmcnICYmIGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbeF1beV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW3ldID09PSBzaGlwKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9ICdtaXNzZWQnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hhc1dvbiA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNQcmVzZW50ID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtqXSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICBzaGlwc1ByZXNlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhc2hpcHNQcmVzZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNXb24sXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2s6ICh4LCB5LCBnYW1lQm9hcmQpID0+IHtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFscmVhZHlQbGF5ZWQgPSBbXTtcbiAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiB7XG4gICAgcmFuZG9tQXR0YWNrOiAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBsZXQgeCwgeSwga2V5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIGtleSA9IGAke3h9ICR7eX1gO1xuICAgICAgfSB3aGlsZSAoYWxyZWFkeVBsYXllZC5pbmNsdWRlcyhrZXkpKTtcbiAgICAgIGFscmVhZHlQbGF5ZWQucHVzaChrZXkpO1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBib2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2R5LnB1c2gobnVsbCk7XG4gIH1cbiAgY29uc3QgbWV0aG9kcyA9IHNoaXBNZXRob2RzKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZXRob2RzLCB7IGJvZHkgfSk7XG59O1xuXG5jb25zdCBzaGlwTWV0aG9kcyA9ICgpID0+IHtcbiAgLy9pbnB1dDogaW5kZXggb2YgYm9keVxuICBmdW5jdGlvbiBoaXQocG9zKSB7XG4gICAgbGV0IGlzSGl0ID0gZmFsc2U7XG4gICAgaWYgKHBvcyA8IHRoaXMuYm9keS5sZW5ndGggJiYgcG9zID49IDApIHtcbiAgICAgIHRoaXMuYm9keVtwb3NdID0gJ2hpdCc7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09ICdoaXQnKTtcbiAgfVxuXG4gIC8vb3V0cHV0OiBib29sZWFuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlldyA9ICgpID0+IHtcbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCAuLi5jbGFzc05hbWVzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzTmFtZXMpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdnYW1lLXRpdGxlJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQkFUVExFU0hJUFMnO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3N0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gJ1BsYXllcic7XG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkLCBwbGF5ZXJOYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9ICdDb21wdXRlcic7XG4gICAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJOYW1lKTtcbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkQ29udGFpbmVyLCBjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQodGl0bGUsIHN0YXR1cywgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCBiaW5kQXR0YWNrSGFuZGxlciA9IChhdHRhY2tIYW5kbGVyKSA9PiB7XG4gICAgY29uc29sZS5sb2coYXR0YWNrSGFuZGxlcik7XG4gIH07XG5cbiAgY29uc3QgYmluZEhhbmRsZXJzID0gKGhhbmRsZXJzT2JqLCBib2FyZElkKSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcbiAgICBjb25zdCBpbmRleFN0YXJ0ID0gYm9hcmRJZCAqIDEwMDtcbiAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyAxMDA7XG4gICAgY29uc3QgYm9hcmRHcmlkID0gWy4uLmdyaWRdLnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKTtcblxuICAgIGJvYXJkR3JpZC5tYXAoKHNxdWFyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHggPSBpbmRleCAlIDEwO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoaW5kZXggLyAxMCk7XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2hvdmVySGFuZGxlcicpKSB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXJzT2JqLmhvdmVySGFuZGxlcih4LCB5LCBib2FyZElkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhoYW5kbGVyc09iai5ob3ZlckhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnY2xpY2tIYW5kbGVyJykpXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVyc09iai5jbGlja0hhbmRsZXIoeCwgeSwgYm9hcmRJZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coaGFuZGxlcnNPYmouY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IGJvYXJkID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IGAke2p9LCAke2l9YDtcbiAgICAgICAgcm93LmFwcGVuZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdGVtcCwgYm9hcmRJZCkgPT4ge1xuICAgIGxldCBjbGFzc05hbWUgPSB0ZW1wID8gJ3NoaXAtcG9zc2libGUnIDogJ3NoaXAnO1xuICAgIGNsZWFyUHJldkhpZ2hsaWdodHMoKTtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm93JylbeSArIGJvYXJkSWQgKiAxMF07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcm93LmNoaWxkTm9kZXNbeCArIGldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2xlYXJQcmV2SGlnaGxpZ2h0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcmV2SGlnaGxpZ2h0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXBvc3NpYmxlJyk7XG4gICAgWy4uLnByZXZIaWdobGlnaHRzXS5tYXAoKHBvc3NpYmxlU2hpcCkgPT5cbiAgICAgIHBvc3NpYmxlU2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXBvc3NpYmxlJylcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBoaWdobGlnaHRTaGlwLFxuICAgIGJpbmRIYW5kbGVycyxcbiAgICBjbGVhclByZXZIaWdobGlnaHRzLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3JztcblxuY29uc3QgYmF0dGxlc2hpcCA9IGdhbWUocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KTtcbmJhdHRsZXNoaXAuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVib2FyZCIsInNoaXAiLCJ2aWV3IiwicGxheWVyVHVyZiIsImNvbXB1dGVyVHVyZiIsInBsYXllckEiLCJjb21wdXRlckFJIiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiYXBwVmlldyIsInNoaXBQb2ludGVyIiwiaW5pdCIsImJpbmRIYW5kbGVycyIsImhvdmVySGFuZGxlciIsImhhbmRsZUNoZWNrUGxhY2VtZW50IiwiY2xpY2tIYW5kbGVyIiwiaGFuZGxlUGxhY2VtZW50IiwiYmVnaW5HYW1lIiwicmVtb3ZlUGxhY2VtZW50SGFuZGxlciIsImJpbmRBdHRhY2tIYW5kbGVyIiwiaGFuZGxlQXR0YWNrIiwic3RhcnRHYW1lIiwieCIsInkiLCJib2FyZElkIiwiY3VycmVudFNoaXAiLCJjbGVhclByZXZIaWdobGlnaHRzIiwiaXNWYWxpZFBvc2l0aW9uIiwiaGlnaGxpZ2h0U2hpcCIsImJvZHkiLCJsZW5ndGgiLCJwbGFjZVNoaXAiLCJib2FyZCIsImkiLCJqIiwiaXNBbHJlYWR5T2NjdXBpZWQiLCJpc091dE9mQm91bmRzIiwicmVjZWl2ZUF0dGFjayIsImNoZWNrSGFzV29uIiwic2hpcHNQcmVzZW50IiwibmFtZSIsImF0dGFjayIsImdhbWVCb2FyZCIsImFscmVhZHlQbGF5ZWQiLCJyYW5kb21Db29yZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbUF0dGFjayIsImtleSIsImluY2x1ZGVzIiwicHVzaCIsIm1ldGhvZHMiLCJzaGlwTWV0aG9kcyIsIk9iamVjdCIsImFzc2lnbiIsImhpdCIsInBvcyIsImlzSGl0IiwiaXNTdW5rIiwiZXZlcnkiLCJwb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNsYXNzTmFtZXMiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGF0dXMiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJwbGF5ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwiYXBwZW5kIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsImNvbXB1dGVyTmFtZSIsImNvbXB1dGVyQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwiYXR0YWNrSGFuZGxlciIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVyc09iaiIsImdyaWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5kZXhTdGFydCIsImluZGV4RW5kIiwiYm9hcmRHcmlkIiwic2xpY2UiLCJtYXAiLCJzcXVhcmUiLCJoYXNPd25Qcm9wZXJ0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3ciLCJ0ZW1wIiwiY2xhc3NOYW1lIiwiY2hpbGROb2RlcyIsInByZXZIaWdobGlnaHRzIiwicG9zc2libGVTaGlwIiwicmVtb3ZlIiwiYmF0dGxlc2hpcCJdLCJzb3VyY2VSb290IjoiIn0=