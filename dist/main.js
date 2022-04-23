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
    appView.bindPlacementHandlers(handlePlacement, handlePlacement);
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

  var bindPlacementHandlers = function bindPlacementHandlers(clickHandler, hoverHandler) {
    var grid = document.querySelectorAll('.square');

    var playerGrid = _toConsumableArray(grid).slice(0, 100);

    playerGrid.map(function (square, index) {
      var x = index % 10;
      var y = Math.floor(index / 10);
      square.addEventListener('mouseenter', function () {
        hoverHandler(x, y, true);
      });
      square.addEventListener('click', function () {
        clickHandler(x, y, false);
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
    bindPlacementHandlers: bindPlacementHandlers
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNaUYsVUFBVSxHQUFHaEcsMkNBQUksQ0FBQ0MsMkNBQUQsRUFBU0MsNkNBQVQsRUFBbUJDLGlEQUFuQixFQUE4QkMsdUNBQTlCLEVBQW9DQyx1Q0FBcEMsQ0FBdkI7QUFDQTJGLFVBQVUsQ0FBQ2xGLElBQVgsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnYW1lID0gKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldykgPT4ge1xuICBsZXQgcGxheWVyVHVyZixcbiAgICBjb21wdXRlclR1cmYsXG4gICAgcGxheWVyQSxcbiAgICBjb21wdXRlckFJLFxuICAgIHBsYXllclNoaXBzLFxuICAgIGNvbXB1dGVyU2hpcHMsXG4gICAgYXBwVmlldztcblxuICBsZXQgc2hpcFBvaW50ZXIgPSAwO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIHBsYXllckEgPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlckFJID0gY29tcHV0ZXIoKTtcbiAgICBwbGF5ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBjb21wdXRlclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGFwcFZpZXcgPSB2aWV3KCk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gICAgYXBwVmlldy5iaW5kUGxhY2VtZW50SGFuZGxlcnMoaGFuZGxlUGxhY2VtZW50LCBoYW5kbGVQbGFjZW1lbnQpO1xuICB9O1xuXG4gIGNvbnN0IGJlZ2luR2FtZSA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnNldEhhbmRsZXJzKHsgaGFuZGxlQXR0YWNrIH0pO1xuICAgIGFwcFZpZXcuc3RhcnRHYW1lKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrID0gKCkgPT4ge307XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50ID0gKHgsIHksIHRlbXApID0+IHtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRlbXApO1xuICAgICAgaWYgKCF0ZW1wKSB7XG4gICAgICAgIHBsYXllclR1cmYucGxhY2VTaGlwKGN1cnJlbnRTaGlwLCB4LCB5KTtcbiAgICAgICAgc2hpcFBvaW50ZXIgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBsZXQgaXNBbHJlYWR5T2NjdXBpZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNPdXRPZkJvdW5kcyA9IHNoaXAuYm9keS5sZW5ndGggKyB4ID4gMTA7XG4gICAgaWYgKCFpc091dE9mQm91bmRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNBbHJlYWR5T2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhaXNBbHJlYWR5T2NjdXBpZWQgJiYgIWlzT3V0T2ZCb3VuZHM7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzV29uID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1ByZXNlbnQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2pdICE9PSAnc3RyaW5nJyAmJiBib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNoaXBzUHJlc2VudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFzaGlwc1ByZXNlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0hhc1dvbixcbiAgICBpc1ZhbGlkUG9zaXRpb24sXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJvZHkucHVzaChudWxsKTtcbiAgfVxuICBjb25zdCBtZXRob2RzID0gc2hpcE1ldGhvZHMoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHsgYm9keSB9KTtcbn07XG5cbmNvbnN0IHNoaXBNZXRob2RzID0gKCkgPT4ge1xuICAvL2lucHV0OiBpbmRleCBvZiBib2R5XG4gIGZ1bmN0aW9uIGhpdChwb3MpIHtcbiAgICBsZXQgaXNIaXQgPSBmYWxzZTtcbiAgICBpZiAocG9zIDwgdGhpcy5ib2R5Lmxlbmd0aCAmJiBwb3MgPj0gMCkge1xuICAgICAgdGhpcy5ib2R5W3Bvc10gPSAnaGl0JztcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkuZXZlcnkoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbiA9PT0gJ2hpdCcpO1xuICB9XG5cbiAgLy9vdXRwdXQ6IGJvb2xlYW5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCB2aWV3ID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIC4uLmNsYXNzTmFtZXMpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3NOYW1lcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2dhbWUtdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQUyc7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSAnUGxheWVyJztcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmQsIHBsYXllck5hbWUpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyJztcbiAgICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckJvYXJkLCBjb21wdXRlck5hbWUpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZCh0aXRsZSwgc3RhdHVzLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IGJpbmRQbGFjZW1lbnRIYW5kbGVycyA9IChjbGlja0hhbmRsZXIsIGhvdmVySGFuZGxlcikgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IFsuLi5ncmlkXS5zbGljZSgwLCAxMDApO1xuICAgIHBsYXllckdyaWQubWFwKChzcXVhcmUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB4ID0gaW5kZXggJSAxMDtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGluZGV4IC8gMTApO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgIGhvdmVySGFuZGxlcih4LCB5LCB0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjbGlja0hhbmRsZXIoeCwgeSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IGJvYXJkID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IGAke2p9LCAke2l9YDtcbiAgICAgICAgcm93LmFwcGVuZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdGVtcCkgPT4ge1xuICAgIGxldCBjbGFzc05hbWUgPSB0ZW1wID8gJ3NoaXAtcG9zc2libGUnIDogJ3NoaXAnO1xuICAgIGlmICh0ZW1wKSB7XG4gICAgICBjb25zdCBwcmV2SGlnaGxpZ2h0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXBvc3NpYmxlJyk7XG4gICAgICBbLi4ucHJldkhpZ2hsaWdodHNdLm1hcCgocG9zc2libGVTaGlwKSA9PlxuICAgICAgICBwb3NzaWJsZVNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1wb3NzaWJsZScpXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm93JylbeV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcm93LmNoaWxkTm9kZXNbeCArIGldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGhpZ2hsaWdodFNoaXAsXG4gICAgYmluZFBsYWNlbWVudEhhbmRsZXJzLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3JztcblxuY29uc3QgYmF0dGxlc2hpcCA9IGdhbWUocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KTtcbmJhdHRsZXNoaXAuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVib2FyZCIsInNoaXAiLCJ2aWV3IiwicGxheWVyVHVyZiIsImNvbXB1dGVyVHVyZiIsInBsYXllckEiLCJjb21wdXRlckFJIiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiYXBwVmlldyIsInNoaXBQb2ludGVyIiwiaW5pdCIsImJpbmRQbGFjZW1lbnRIYW5kbGVycyIsImhhbmRsZVBsYWNlbWVudCIsImJlZ2luR2FtZSIsInNldEhhbmRsZXJzIiwiaGFuZGxlQXR0YWNrIiwic3RhcnRHYW1lIiwieCIsInkiLCJ0ZW1wIiwiY3VycmVudFNoaXAiLCJpc1ZhbGlkUG9zaXRpb24iLCJoaWdobGlnaHRTaGlwIiwiYm9keSIsImxlbmd0aCIsInBsYWNlU2hpcCIsImJvYXJkIiwiaSIsImoiLCJpc0FscmVhZHlPY2N1cGllZCIsImlzT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwiY2hlY2tIYXNXb24iLCJzaGlwc1ByZXNlbnQiLCJuYW1lIiwiYXR0YWNrIiwiZ2FtZUJvYXJkIiwiYWxyZWFkeVBsYXllZCIsInJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQXR0YWNrIiwia2V5IiwiaW5jbHVkZXMiLCJwdXNoIiwibWV0aG9kcyIsInNoaXBNZXRob2RzIiwiT2JqZWN0IiwiYXNzaWduIiwiaGl0IiwicG9zIiwiaXNIaXQiLCJpc1N1bmsiLCJldmVyeSIsInBvc2l0aW9uIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJlbCIsImRvY3VtZW50IiwiY2xhc3NOYW1lcyIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInN0YXR1cyIsImJvYXJkc0NvbnRhaW5lciIsInBsYXllckJvYXJkQ29udGFpbmVyIiwicGxheWVyTmFtZSIsInBsYXllckJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhcHBlbmQiLCJjb21wdXRlckJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJOYW1lIiwiY29tcHV0ZXJCb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGlja0hhbmRsZXIiLCJob3ZlckhhbmRsZXIiLCJncmlkIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllckdyaWQiLCJzbGljZSIsIm1hcCIsInNxdWFyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3ciLCJjbGFzc05hbWUiLCJwcmV2SGlnaGxpZ2h0cyIsInBvc3NpYmxlU2hpcCIsInJlbW92ZSIsImNoaWxkTm9kZXMiLCJiYXR0bGVzaGlwIl0sInNvdXJjZVJvb3QiOiIifQ==