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

  var handlePlacement = function handlePlacement(x, y, temp) {
    if (shipPointer >= playerShips.length) return;
    var currentShip = playerShips[shipPointer];

    if (playerTurf.isValidPosition(currentShip, x)) {
      appView.highlightShip(currentShip.body.length, x, y, temp);
    }

    if (!temp) shipPointer += 1;
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
      board[i][j] = j;
    }
  }

  var placeShip = function placeShip(ship, x, y) {
    if (!isValidPosition(ship, x, y)) return false;

    for (var _i = 0; _i < ship.body.length; _i++) {
      board[x + _i][y] = ship;
    }

    return true;
  };

  var isValidPosition = function isValidPosition(ship, x, y) {
    var isAlreadyOccupied = false;
    var isOutOfBounds = ship.body.length + x > 9;

    if (!isOutOfBounds) {
      for (var _i2 = 0; _i2 < ship.body.length; _i2++) {
        if (_typeof(board[x + _i2][y]) === 'object') {
          isAlreadyOccupied = true;
        }
      }
    }

    return !isAlreadyOccupied && !isOutOfBounds;
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (_typeof(board[x][y]) === 'object') {
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
    console.log(temp);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFwQixFQUE0Qk0sQ0FBQyxFQUE3QixFQUFpQztBQUMvQnNELE1BQUFBLEdBQUcsQ0FBQ1csVUFBSixDQUFlMUUsQ0FBQyxHQUFHUyxDQUFuQixFQUFzQnVDLFNBQXRCLENBQWdDQyxHQUFoQyxDQUFvQ2lCLFNBQXBDO0FBQ0Q7QUFDRixHQWJEOztBQWVBLFNBQU87QUFDTHhFLElBQUFBLElBQUksRUFBSkEsSUFESztBQUVMQyxJQUFBQSxXQUFXLEVBQVhBLFdBRks7QUFHTFcsSUFBQUEsYUFBYSxFQUFiQTtBQUhLLEdBQVA7QUFLRCxDQTlFTTs7Ozs7O1VDQVA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTXFFLFVBQVUsR0FBRy9GLDJDQUFJLENBQUNDLDJDQUFELEVBQVNDLDZDQUFULEVBQW1CQyxpREFBbkIsRUFBOEJDLHVDQUE5QixFQUFvQ0MsdUNBQXBDLENBQXZCO0FBQ0EwRixVQUFVLENBQUNqRixJQUFYLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2FtZSA9IChwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpID0+IHtcbiAgbGV0IHBsYXllclR1cmYsXG4gICAgY29tcHV0ZXJUdXJmLFxuICAgIHBsYXllckEsXG4gICAgY29tcHV0ZXJBSSxcbiAgICBwbGF5ZXJTaGlwcyxcbiAgICBjb21wdXRlclNoaXBzLFxuICAgIGFwcFZpZXc7XG5cbiAgbGV0IHNoaXBQb2ludGVyID0gMDtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHBsYXllclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXJBID0gcGxheWVyKCk7XG4gICAgY29tcHV0ZXJBSSA9IGNvbXB1dGVyKCk7XG4gICAgcGxheWVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgY29tcHV0ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBhcHBWaWV3ID0gdmlldygpO1xuICAgIGFwcFZpZXcuc2V0SGFuZGxlcnMoeyBoYW5kbGVQbGFjZW1lbnQgfSk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gIH07XG5cbiAgY29uc3QgYmVnaW5HYW1lID0gKCkgPT4ge1xuICAgIGFwcFZpZXcuc2V0SGFuZGxlcnMoeyBoYW5kbGVBdHRhY2sgfSk7XG4gICAgYXBwVmlldy5zdGFydEdhbWUoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVQbGFjZW1lbnQgPSAoeCwgeSwgdGVtcCkgPT4ge1xuICAgIGlmIChzaGlwUG9pbnRlciA+PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIHJldHVybjtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgpKSB7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRlbXApO1xuICAgIH1cbiAgICBpZiAoIXRlbXApIHNoaXBQb2ludGVyICs9IDE7XG4gICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IGo7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBpZiAoIWlzVmFsaWRQb3NpdGlvbihzaGlwLCB4LCB5KSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFt4ICsgaV1beV0gPSBzaGlwO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGxldCBpc0FscmVhZHlPY2N1cGllZCA9IGZhbHNlO1xuICAgIGxldCBpc091dE9mQm91bmRzID0gc2hpcC5ib2R5Lmxlbmd0aCArIHggPiA5O1xuICAgIGlmICghaXNPdXRPZkJvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt4ICsgaV1beV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaXNBbHJlYWR5T2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhaXNBbHJlYWR5T2NjdXBpZWQgJiYgIWlzT3V0T2ZCb3VuZHM7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzV29uID0gKCkgPT4ge1xuICAgIHJldHVybiBib2FyZC5ldmVyeSgoeFBvcykgPT5cbiAgICAgIHhQb3MuZXZlcnkoKHlQb3MpID0+IHR5cGVvZiB5UG9zICE9PSAnb2JqZWN0JylcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNXb24sXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2s6ICh4LCB5LCBnYW1lQm9hcmQpID0+IHtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFscmVhZHlQbGF5ZWQgPSBbXTtcbiAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiB7XG4gICAgcmFuZG9tQXR0YWNrOiAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBsZXQgeCwgeSwga2V5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIGtleSA9IGAke3h9ICR7eX1gO1xuICAgICAgfSB3aGlsZSAoYWxyZWFkeVBsYXllZC5pbmNsdWRlcyhrZXkpKTtcbiAgICAgIGFscmVhZHlQbGF5ZWQucHVzaChrZXkpO1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBib2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2R5LnB1c2gobnVsbCk7XG4gIH1cbiAgY29uc3QgbWV0aG9kcyA9IHNoaXBNZXRob2RzKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZXRob2RzLCB7IGJvZHkgfSk7XG59O1xuXG5jb25zdCBzaGlwTWV0aG9kcyA9ICgpID0+IHtcbiAgLy9pbnB1dDogaW5kZXggb2YgYm9keVxuICBmdW5jdGlvbiBoaXQocG9zKSB7XG4gICAgbGV0IGlzSGl0ID0gZmFsc2U7XG4gICAgaWYgKHBvcyA8IHRoaXMuYm9keS5sZW5ndGggJiYgcG9zID49IDApIHtcbiAgICAgIHRoaXMuYm9keVtwb3NdID0gJ2hpdCc7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09ICdoaXQnKTtcbiAgfVxuXG4gIC8vb3V0cHV0OiBib29sZWFuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlldyA9ICgpID0+IHtcbiAgbGV0IGhhbmRsZXJzO1xuXG4gIGNvbnN0IHNldEhhbmRsZXJzID0gKGhhbmRsZXJPYmopID0+IHtcbiAgICBoYW5kbGVycyA9IGhhbmRsZXJPYmo7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCAuLi5jbGFzc05hbWVzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzTmFtZXMpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdnYW1lLXRpdGxlJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQkFUVExFU0hJUFMnO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3N0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gJ1BsYXllcic7XG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkLCBwbGF5ZXJOYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9ICdDb21wdXRlcic7XG4gICAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJOYW1lKTtcbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkQ29udGFpbmVyLCBjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQodGl0bGUsIHN0YXR1cywgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gYCR7an0sICR7aX1gO1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVycy5oYW5kbGVQbGFjZW1lbnQoaiwgaSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnMuaGFuZGxlUGxhY2VtZW50KGosIGksIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJvdy5hcHBlbmQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgaGlnaGxpZ2h0U2hpcCA9IChsZW5ndGgsIHgsIHksIHRlbXApID0+IHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGVtcCA/ICdzaGlwLXBvc3NpYmxlJyA6ICdzaGlwJztcbiAgICBjb25zb2xlLmxvZyh0ZW1wKTtcbiAgICBpZiAodGVtcCkge1xuICAgICAgY29uc3QgcHJldkhpZ2hsaWdodHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1wb3NzaWJsZScpO1xuICAgICAgWy4uLnByZXZIaWdobGlnaHRzXS5tYXAoKHBvc3NpYmxlU2hpcCkgPT5cbiAgICAgICAgcG9zc2libGVTaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcG9zc2libGUnKVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdycpW3ldO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJvdy5jaGlsZE5vZGVzW3ggKyBpXS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBzZXRIYW5kbGVycyxcbiAgICBoaWdobGlnaHRTaGlwLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3JztcblxuY29uc3QgYmF0dGxlc2hpcCA9IGdhbWUocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KTtcbmJhdHRsZXNoaXAuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVib2FyZCIsInNoaXAiLCJ2aWV3IiwicGxheWVyVHVyZiIsImNvbXB1dGVyVHVyZiIsInBsYXllckEiLCJjb21wdXRlckFJIiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiYXBwVmlldyIsInNoaXBQb2ludGVyIiwiaW5pdCIsInNldEhhbmRsZXJzIiwiaGFuZGxlUGxhY2VtZW50IiwiYmVnaW5HYW1lIiwiaGFuZGxlQXR0YWNrIiwic3RhcnRHYW1lIiwieCIsInkiLCJ0ZW1wIiwibGVuZ3RoIiwiY3VycmVudFNoaXAiLCJpc1ZhbGlkUG9zaXRpb24iLCJoaWdobGlnaHRTaGlwIiwiYm9keSIsImJvYXJkIiwiaSIsImoiLCJwbGFjZVNoaXAiLCJpc0FscmVhZHlPY2N1cGllZCIsImlzT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwiY2hlY2tIYXNXb24iLCJldmVyeSIsInhQb3MiLCJ5UG9zIiwibmFtZSIsImF0dGFjayIsImdhbWVCb2FyZCIsImFscmVhZHlQbGF5ZWQiLCJyYW5kb21Db29yZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbUF0dGFjayIsImtleSIsImluY2x1ZGVzIiwicHVzaCIsIm1ldGhvZHMiLCJzaGlwTWV0aG9kcyIsIk9iamVjdCIsImFzc2lnbiIsImhpdCIsInBvcyIsImlzSGl0IiwiaXNTdW5rIiwicG9zaXRpb24iLCJoYW5kbGVycyIsImhhbmRsZXJPYmoiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImVsIiwiZG9jdW1lbnQiLCJjbGFzc05hbWVzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0aXRsZSIsInRleHRDb250ZW50Iiwic3RhdHVzIiwiYm9hcmRzQ29udGFpbmVyIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyQm9hcmQiLCJjcmVhdGVCb2FyZCIsImFwcGVuZCIsImNvbXB1dGVyQm9hcmRDb250YWluZXIiLCJjb21wdXRlck5hbWUiLCJjb21wdXRlckJvYXJkIiwicXVlcnlTZWxlY3RvciIsInJvdyIsInNxdWFyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc05hbWUiLCJjb25zb2xlIiwibG9nIiwicHJldkhpZ2hsaWdodHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWFwIiwicG9zc2libGVTaGlwIiwicmVtb3ZlIiwiY2hpbGROb2RlcyIsImJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9