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
    console.log(playerDidHit);
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

  var bindHandlers = function bindHandlers(handlersObj, boardIndex) {
    var grid = document.querySelectorAll('.square');
    var indexStart = boardIndex * 100;
    var indexEnd = indexStart + 100;

    var boardGrid = _toConsumableArray(grid).slice(indexStart, indexEnd);

    boardGrid.map(function (square, index) {
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
    var row = document.querySelectorAll('.row')[y + boardIndex * 10];

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
    removeAllHandlers: removeAllHandlers,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBbUJDLGlEQUFuQixFQUE4QkMsdUNBQTlCLEVBQW9DQyx1Q0FBcEMsQ0FBdkI7QUFDQXVHLFVBQVUsQ0FBQzlGLElBQVgsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBnYW1lID0gKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldykgPT4ge1xuICBsZXQgcGxheWVyVHVyZixcbiAgICBjb21wdXRlclR1cmYsXG4gICAgcGxheWVyQSxcbiAgICBjb21wdXRlckFJLFxuICAgIHBsYXllclNoaXBzLFxuICAgIGNvbXB1dGVyU2hpcHMsXG4gICAgYXBwVmlldztcblxuICBsZXQgc2hpcFBvaW50ZXIgPSAwO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIHBsYXllckEgPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlckFJID0gY29tcHV0ZXIoKTtcbiAgICBwbGF5ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBjb21wdXRlclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGFwcFZpZXcgPSB2aWV3KCk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gICAgYXBwVmlldy5iaW5kSGFuZGxlcnMoXG4gICAgICB7IGhvdmVySGFuZGxlcjogaGFuZGxlQ2hlY2tQbGFjZW1lbnQsIGNsaWNrSGFuZGxlcjogaGFuZGxlUGxhY2VtZW50IH0sXG4gICAgICAwXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBiZWdpbkdhbWUgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5yZW1vdmVBbGxIYW5kbGVycygwKTtcbiAgICBwb3B1bGF0ZUNvbXB1dGVyVHVyZigpO1xuICAgIGFwcFZpZXcuYmluZEhhbmRsZXJzKHsgY2xpY2tIYW5kbGVyOiBoYW5kbGVBdHRhY2sgfSwgMSk7XG4gICAgLy8gYXBwVmlldy5zdGFydEdhbWUoKTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUNvbXB1dGVyVHVyZiA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21JbnQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH07XG4gICAgY29tcHV0ZXJTaGlwcy5tYXAoKHNoaXApID0+IHtcbiAgICAgIGxldCB4LCB5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tSW50KCk7XG4gICAgICAgIHkgPSByYW5kb21JbnQoKTtcbiAgICAgIH0gd2hpbGUgKCFjb21wdXRlclR1cmYuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHkpKTtcbiAgICAgIGNvbXB1dGVyVHVyZi5wbGFjZVNoaXAoc2hpcCwgeCwgeSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJEaWRIaXQgPSBwbGF5ZXJBLmF0dGFjayh4LCB5LCBjb21wdXRlclR1cmYpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllckRpZEhpdCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hlY2tQbGFjZW1lbnQgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gcGxheWVyU2hpcHNbc2hpcFBvaW50ZXJdO1xuICAgIGFwcFZpZXcuY2xlYXJQcmV2SGlnaGxpZ2h0cygpO1xuICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgIGFwcFZpZXcuaGlnaGxpZ2h0U2hpcChjdXJyZW50U2hpcC5ib2R5Lmxlbmd0aCwgeCwgeSwgdHJ1ZSwgYm9hcmRJbmRleCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBsYWNlbWVudCA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgYXBwVmlldy5jbGVhclByZXZIaWdobGlnaHRzKCk7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIGZhbHNlLCBib2FyZEluZGV4KTtcbiAgICAgIHBsYXllclR1cmYucGxhY2VTaGlwKGN1cnJlbnRTaGlwLCB4LCB5KTtcbiAgICAgIHNoaXBQb2ludGVyICs9IDE7XG4gICAgfVxuICAgIGlmIChzaGlwUG9pbnRlciA9PT0gcGxheWVyU2hpcHMubGVuZ3RoKSBiZWdpbkdhbWUoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgLy8geCBjb29yZGluYXRlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICAgIC8veSBjb29yZGluYXRlc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgYm9hcmRbaV1bal0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgbGV0IGlzQWxyZWFkeU9jY3VwaWVkID0gZmFsc2U7XG4gICAgbGV0IGlzT3V0T2ZCb3VuZHMgPSBzaGlwLmJvZHkubGVuZ3RoICsgeCA+IDEwO1xuICAgIGlmICghaXNPdXRPZkJvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3ggKyBpXVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzQWxyZWFkeU9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIWlzQWxyZWFkeU9jY3VwaWVkICYmICFpc091dE9mQm91bmRzO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gIT09ICdzdHJpbmcnICYmIGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbeF1beV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW3ldID09PSBzaGlwKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9ICdtaXNzZWQnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hhc1dvbiA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNQcmVzZW50ID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtqXSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICBzaGlwc1ByZXNlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhc2hpcHNQcmVzZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNXb24sXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gW2dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpLCB4LCB5XTtcbiAgICB9LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgYm9keSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYm9keS5wdXNoKG51bGwpO1xuICB9XG4gIGNvbnN0IG1ldGhvZHMgPSBzaGlwTWV0aG9kcygpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbWV0aG9kcywgeyBib2R5IH0pO1xufTtcblxuY29uc3Qgc2hpcE1ldGhvZHMgPSAoKSA9PiB7XG4gIC8vaW5wdXQ6IGluZGV4IG9mIGJvZHlcbiAgZnVuY3Rpb24gaGl0KHBvcykge1xuICAgIGxldCBpc0hpdCA9IGZhbHNlO1xuICAgIGlmIChwb3MgPCB0aGlzLmJvZHkubGVuZ3RoICYmIHBvcyA+PSAwKSB7XG4gICAgICB0aGlzLmJvZHlbcG9zXSA9ICdoaXQnO1xuICAgICAgaXNIaXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9keS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSAnaGl0Jyk7XG4gIH1cblxuICAvL291dHB1dDogYm9vbGVhblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHZpZXcgPSAoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgLi4uY2xhc3NOYW1lcykgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc05hbWVzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXNbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnZ2FtZS10aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0JBVFRMRVNISVBTJztcblxuICAgIGNvbnN0IHN0YXR1cyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzdGF0dXMnKTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyc7XG5cbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9ICdQbGF5ZXInO1xuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZCwgcGxheWVyTmFtZSk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBjb21wdXRlck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBjb21wdXRlck5hbWUudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXInO1xuICAgIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyTmFtZSk7XG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZENvbnRhaW5lciwgY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKHRpdGxlLCBzdGF0dXMsIGJvYXJkc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQWxsSGFuZGxlcnMgPSAoYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWdyaWQnKVtib2FyZEluZGV4XTtcbiAgICBib2FyZC5yZXBsYWNlV2l0aChib2FyZC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9O1xuXG4gIGNvbnN0IGJpbmRIYW5kbGVycyA9IChoYW5kbGVyc09iaiwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XG4gICAgY29uc3QgaW5kZXhTdGFydCA9IGJvYXJkSW5kZXggKiAxMDA7XG4gICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgMTAwO1xuICAgIGNvbnN0IGJvYXJkR3JpZCA9IFsuLi5ncmlkXS5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCk7XG5cbiAgICBib2FyZEdyaWQubWFwKChzcXVhcmUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB4ID0gaW5kZXggJSAxMDtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGluZGV4IC8gMTApO1xuICAgICAgaWYgKGhhbmRsZXJzT2JqLmhhc093blByb3BlcnR5KCdob3ZlckhhbmRsZXInKSkge1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVyc09iai5ob3ZlckhhbmRsZXIoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGhhbmRsZXJzT2JqLmhhc093blByb3BlcnR5KCdjbGlja0hhbmRsZXInKSlcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXJzT2JqLmNsaWNrSGFuZGxlcih4LCB5LCBib2FyZEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IGJvYXJkID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgICAgIHNxdWFyZS50ZXh0Q29udGVudCA9IGAke2p9LCAke2l9YDtcbiAgICAgICAgcm93LmFwcGVuZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdGVtcCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGxldCBjbGFzc05hbWUgPSB0ZW1wID8gJ3NoaXAtcG9zc2libGUnIDogJ3NoaXAnO1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3cnKVt5ICsgYm9hcmRJbmRleCAqIDEwXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByb3cuY2hpbGROb2Rlc1t4ICsgaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjbGVhclByZXZIaWdobGlnaHRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByZXZIaWdobGlnaHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcG9zc2libGUnKTtcbiAgICBbLi4ucHJldkhpZ2hsaWdodHNdLm1hcCgocG9zc2libGVTaGlwKSA9PlxuICAgICAgcG9zc2libGVTaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcG9zc2libGUnKVxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGhpZ2hsaWdodFNoaXAsXG4gICAgYmluZEhhbmRsZXJzLFxuICAgIHJlbW92ZUFsbEhhbmRsZXJzLFxuICAgIGNsZWFyUHJldkhpZ2hsaWdodHMsXG4gIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBiYXR0bGVzaGlwID0gZ2FtZShwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpO1xuYmF0dGxlc2hpcC5pbml0KCk7XG4iXSwibmFtZXMiOlsiZ2FtZSIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZWJvYXJkIiwic2hpcCIsInZpZXciLCJwbGF5ZXJUdXJmIiwiY29tcHV0ZXJUdXJmIiwicGxheWVyQSIsImNvbXB1dGVyQUkiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJhcHBWaWV3Iiwic2hpcFBvaW50ZXIiLCJpbml0IiwiYmluZEhhbmRsZXJzIiwiaG92ZXJIYW5kbGVyIiwiaGFuZGxlQ2hlY2tQbGFjZW1lbnQiLCJjbGlja0hhbmRsZXIiLCJoYW5kbGVQbGFjZW1lbnQiLCJiZWdpbkdhbWUiLCJyZW1vdmVBbGxIYW5kbGVycyIsInBvcHVsYXRlQ29tcHV0ZXJUdXJmIiwiaGFuZGxlQXR0YWNrIiwicmFuZG9tSW50IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibWFwIiwieCIsInkiLCJpc1ZhbGlkUG9zaXRpb24iLCJwbGFjZVNoaXAiLCJib2FyZEluZGV4IiwicGxheWVyRGlkSGl0IiwiYXR0YWNrIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRTaGlwIiwiY2xlYXJQcmV2SGlnaGxpZ2h0cyIsImhpZ2hsaWdodFNoaXAiLCJib2R5IiwibGVuZ3RoIiwiYm9hcmQiLCJpIiwiaiIsImlzQWxyZWFkeU9jY3VwaWVkIiwiaXNPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJjaGVja0hhc1dvbiIsInNoaXBzUHJlc2VudCIsImdhbWVCb2FyZCIsImFscmVhZHlQbGF5ZWQiLCJyYW5kb21Db29yZCIsInJhbmRvbUF0dGFjayIsImtleSIsImluY2x1ZGVzIiwicHVzaCIsIm1ldGhvZHMiLCJzaGlwTWV0aG9kcyIsIk9iamVjdCIsImFzc2lnbiIsImhpdCIsInBvcyIsImlzSGl0IiwiaXNTdW5rIiwiZXZlcnkiLCJwb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNsYXNzTmFtZXMiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGF0dXMiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJwbGF5ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwiYXBwZW5kIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsImNvbXB1dGVyTmFtZSIsImNvbXB1dGVyQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlTZWxlY3RvckFsbCIsInJlcGxhY2VXaXRoIiwiY2xvbmVOb2RlIiwiaGFuZGxlcnNPYmoiLCJncmlkIiwiaW5kZXhTdGFydCIsImluZGV4RW5kIiwiYm9hcmRHcmlkIiwic2xpY2UiLCJzcXVhcmUiLCJoYXNPd25Qcm9wZXJ0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyb3ciLCJ0ZW1wIiwiY2xhc3NOYW1lIiwiY2hpbGROb2RlcyIsInByZXZIaWdobGlnaHRzIiwicG9zc2libGVTaGlwIiwicmVtb3ZlIiwiYmF0dGxlc2hpcCJdLCJzb3VyY2VSb290IjoiIn0=