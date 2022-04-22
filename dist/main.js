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

  var handlePlacement = function handlePlacement(x, y, temp) {
    if (shipPointer >= playerShips.length) return;
    var currentShip = playerShips[shipPointer];

    if (playerTurf.isValidPosition(currentShip, x)) {
      appView.highlightShip(currentShip.body.length, x, y, temp);
    }

    if (!temp) shipPointer += 1;
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

  var isValidPosition = function isValidPosition(ship, x) {
    var shipLength = ship.body.length;
    return !(shipLength + x > 9);
  };

  var receiveAttack = function receiveAttack(x, y) {
    if (_typeof(board[x][y]) === 'object') {
      var ship = board[x][y];

      for (var _i2 = 0; _i2 < 10; _i2++) {
        if (board[_i2][y] === ship) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBRUEsSUFBTW9FLFVBQVUsR0FBRzNGLDJDQUFJLENBQUNDLDJDQUFELEVBQVNDLDZDQUFULEVBQW1CQyxpREFBbkIsRUFBOEJDLHVDQUE5QixFQUFvQ0MsdUNBQXBDLENBQXZCO0FBQ0FzRixVQUFVLENBQUM3RSxJQUFYLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2FtZSA9IChwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpID0+IHtcbiAgbGV0IHBsYXllclR1cmYsXG4gICAgY29tcHV0ZXJUdXJmLFxuICAgIHBsYXllckEsXG4gICAgY29tcHV0ZXJBSSxcbiAgICBwbGF5ZXJTaGlwcyxcbiAgICBjb21wdXRlclNoaXBzLFxuICAgIGFwcFZpZXc7XG5cbiAgbGV0IHNoaXBQb2ludGVyID0gMDtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHBsYXllclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXJBID0gcGxheWVyKCk7XG4gICAgY29tcHV0ZXJBSSA9IGNvbXB1dGVyKCk7XG4gICAgcGxheWVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgY29tcHV0ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBhcHBWaWV3ID0gdmlldygpO1xuICAgIGFwcFZpZXcuc2V0SGFuZGxlcnMoeyBoYW5kbGVQbGFjZW1lbnQgfSk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50ID0gKHgsIHksIHRlbXApID0+IHtcbiAgICBpZiAoc2hpcFBvaW50ZXIgPj0gcGxheWVyU2hpcHMubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4KSkge1xuICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0ZW1wKTtcbiAgICB9XG4gICAgaWYgKCF0ZW1wKSBzaGlwUG9pbnRlciArPSAxO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IGo7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBpZiAoIWlzVmFsaWRQb3NpdGlvbihzaGlwLCB4LCB5KSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFt4ICsgaV1beV0gPSBzaGlwO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAoc2hpcCwgeCkgPT4ge1xuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmJvZHkubGVuZ3RoO1xuICAgIHJldHVybiAhKHNoaXBMZW5ndGggKyB4ID4gOSk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzV29uID0gKCkgPT4ge1xuICAgIHJldHVybiBib2FyZC5ldmVyeSgoeFBvcykgPT5cbiAgICAgIHhQb3MuZXZlcnkoKHlQb3MpID0+IHR5cGVvZiB5UG9zICE9PSAnb2JqZWN0JylcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNXb24sXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2s6ICh4LCB5LCBnYW1lQm9hcmQpID0+IHtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFscmVhZHlQbGF5ZWQgPSBbXTtcbiAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiB7XG4gICAgcmFuZG9tQXR0YWNrOiAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBsZXQgeCwgeSwga2V5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIGtleSA9IGAke3h9ICR7eX1gO1xuICAgICAgfSB3aGlsZSAoYWxyZWFkeVBsYXllZC5pbmNsdWRlcyhrZXkpKTtcbiAgICAgIGFscmVhZHlQbGF5ZWQucHVzaChrZXkpO1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBib2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2R5LnB1c2gobnVsbCk7XG4gIH1cbiAgY29uc3QgbWV0aG9kcyA9IHNoaXBNZXRob2RzKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZXRob2RzLCB7IGJvZHkgfSk7XG59O1xuXG5jb25zdCBzaGlwTWV0aG9kcyA9ICgpID0+IHtcbiAgLy9pbnB1dDogaW5kZXggb2YgYm9keVxuICBmdW5jdGlvbiBoaXQocG9zKSB7XG4gICAgbGV0IGlzSGl0ID0gZmFsc2U7XG4gICAgaWYgKHBvcyA8IHRoaXMuYm9keS5sZW5ndGggJiYgcG9zID49IDApIHtcbiAgICAgIHRoaXMuYm9keVtwb3NdID0gJ2hpdCc7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09ICdoaXQnKTtcbiAgfVxuXG4gIC8vb3V0cHV0OiBib29sZWFuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlldyA9ICgpID0+IHtcbiAgbGV0IGhhbmRsZXJzO1xuXG4gIGNvbnN0IHNldEhhbmRsZXJzID0gKGhhbmRsZXJPYmopID0+IHtcbiAgICBoYW5kbGVycyA9IGhhbmRsZXJPYmo7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCAuLi5jbGFzc05hbWVzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzTmFtZXMpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdnYW1lLXRpdGxlJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQkFUVExFU0hJUFMnO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3N0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gJ1BsYXllcic7XG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkLCBwbGF5ZXJOYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9ICdDb21wdXRlcic7XG4gICAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJOYW1lKTtcbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkQ29udGFpbmVyLCBjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQodGl0bGUsIHN0YXR1cywgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gYCR7an0sICR7aX1gO1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVycy5oYW5kbGVQbGFjZW1lbnQoaiwgaSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnMuaGFuZGxlUGxhY2VtZW50KGosIGksIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJvdy5hcHBlbmQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgaGlnaGxpZ2h0U2hpcCA9IChsZW5ndGgsIHgsIHksIHRlbXApID0+IHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGVtcCA/ICdzaGlwLXBvc3NpYmxlJyA6ICdzaGlwJztcbiAgICBjb25zb2xlLmxvZyh0ZW1wKTtcbiAgICBpZiAodGVtcCkge1xuICAgICAgY29uc3QgcHJldkhpZ2hsaWdodHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1wb3NzaWJsZScpO1xuICAgICAgWy4uLnByZXZIaWdobGlnaHRzXS5tYXAoKHBvc3NpYmxlU2hpcCkgPT5cbiAgICAgICAgcG9zc2libGVTaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcG9zc2libGUnKVxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdycpW3ldO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJvdy5jaGlsZE5vZGVzW3ggKyBpXS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBzZXRIYW5kbGVycyxcbiAgICBoaWdobGlnaHRTaGlwLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3JztcblxuY29uc3QgYmF0dGxlc2hpcCA9IGdhbWUocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KTtcbmJhdHRsZXNoaXAuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVib2FyZCIsInNoaXAiLCJ2aWV3IiwicGxheWVyVHVyZiIsImNvbXB1dGVyVHVyZiIsInBsYXllckEiLCJjb21wdXRlckFJIiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiYXBwVmlldyIsInNoaXBQb2ludGVyIiwiaW5pdCIsInNldEhhbmRsZXJzIiwiaGFuZGxlUGxhY2VtZW50IiwieCIsInkiLCJ0ZW1wIiwibGVuZ3RoIiwiY3VycmVudFNoaXAiLCJpc1ZhbGlkUG9zaXRpb24iLCJoaWdobGlnaHRTaGlwIiwiYm9keSIsImJvYXJkIiwiaSIsImoiLCJwbGFjZVNoaXAiLCJzaGlwTGVuZ3RoIiwicmVjZWl2ZUF0dGFjayIsImNoZWNrSGFzV29uIiwiZXZlcnkiLCJ4UG9zIiwieVBvcyIsIm5hbWUiLCJhdHRhY2siLCJnYW1lQm9hcmQiLCJhbHJlYWR5UGxheWVkIiwicmFuZG9tQ29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21BdHRhY2siLCJrZXkiLCJpbmNsdWRlcyIsInB1c2giLCJtZXRob2RzIiwic2hpcE1ldGhvZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJoaXQiLCJwb3MiLCJpc0hpdCIsImlzU3VuayIsInBvc2l0aW9uIiwiaGFuZGxlcnMiLCJoYW5kbGVyT2JqIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJlbCIsImRvY3VtZW50IiwiY2xhc3NOYW1lcyIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInN0YXR1cyIsImJvYXJkc0NvbnRhaW5lciIsInBsYXllckJvYXJkQ29udGFpbmVyIiwicGxheWVyTmFtZSIsInBsYXllckJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhcHBlbmQiLCJjb21wdXRlckJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJOYW1lIiwiY29tcHV0ZXJCb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJyb3ciLCJzcXVhcmUiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NOYW1lIiwiY29uc29sZSIsImxvZyIsInByZXZIaWdobGlnaHRzIiwicXVlcnlTZWxlY3RvckFsbCIsIm1hcCIsInBvc3NpYmxlU2hpcCIsInJlbW92ZSIsImNoaWxkTm9kZXMiLCJiYXR0bGVzaGlwIl0sInNvdXJjZVJvb3QiOiIifQ==