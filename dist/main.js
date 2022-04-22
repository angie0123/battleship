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

  var init = function init() {
    playerTurf = gameboard();
    computerTurf = gameboard();
    playerA = player();
    computerAI = computer();
    playerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    computerShips = [ship(2), ship(3), ship(3), ship(4), ship(5)];
    appView = view();
    appView.init();
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

  return {
    init: init
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU00RCxVQUFVLEdBQUd6RSwyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBb0UsVUFBVSxDQUFDNUQsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIHBsYXllckEgPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlckFJID0gY29tcHV0ZXIoKTtcbiAgICBwbGF5ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBjb21wdXRlclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGFwcFZpZXcgPSB2aWV3KCk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIC8vIHggY29vcmRpbmF0ZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgYm9hcmRbaV0gPSBbXTtcbiAgICAvL3kgY29vcmRpbmF0ZXNcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGJvYXJkW2ldW2pdID0gajtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGlmICghaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHkpKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChzaGlwLCB4KSA9PiB7XG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXAuYm9keS5sZW5ndGg7XG4gICAgcmV0dXJuICEoc2hpcExlbmd0aCArIHggPiA5KTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3hdW3ldO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVt5XSA9PT0gc2hpcCkge1xuICAgICAgICAgIGJvYXJkW3hdW3ldID0gJ2hpdCc7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgYm9hcmRbeF1beV0gPSAnbWlzc2VkJztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tIYXNXb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGJvYXJkLmV2ZXJ5KCh4UG9zKSA9PlxuICAgICAgeFBvcy5ldmVyeSgoeVBvcykgPT4gdHlwZW9mIHlQb3MgIT09ICdvYmplY3QnKVxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0hhc1dvbixcbiAgICBpc1ZhbGlkUG9zaXRpb24sXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJvZHkucHVzaChudWxsKTtcbiAgfVxuICBjb25zdCBtZXRob2RzID0gc2hpcE1ldGhvZHMoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHsgYm9keSB9KTtcbn07XG5cbmNvbnN0IHNoaXBNZXRob2RzID0gKCkgPT4ge1xuICAvL2lucHV0OiBpbmRleCBvZiBib2R5XG4gIGZ1bmN0aW9uIGhpdChwb3MpIHtcbiAgICBsZXQgaXNIaXQgPSBmYWxzZTtcbiAgICBpZiAocG9zIDwgdGhpcy5ib2R5Lmxlbmd0aCAmJiBwb3MgPj0gMCkge1xuICAgICAgdGhpcy5ib2R5W3Bvc10gPSAnaGl0JztcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkuZXZlcnkoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbiA9PT0gJ2hpdCcpO1xuICB9XG5cbiAgLy9vdXRwdXQ6IGJvb2xlYW5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCB2aWV3ID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIC4uLmNsYXNzTmFtZXMpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3NOYW1lcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2dhbWUtdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQUyc7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSAnUGxheWVyJztcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmQsIHBsYXllck5hbWUpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyJztcbiAgICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckJvYXJkLCBjb21wdXRlck5hbWUpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZCh0aXRsZSwgc3RhdHVzLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGxldCBib2FyZCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NxdWFyZScpO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBgJHtqfSwgJHtpfWA7XG4gICAgICAgIHJvdy5hcHBlbmQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgc2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBnYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSAnLi92aWV3JztcblxuY29uc3QgYmF0dGxlc2hpcCA9IGdhbWUocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KTtcbmJhdHRsZXNoaXAuaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdhbWVib2FyZCIsInNoaXAiLCJ2aWV3IiwicGxheWVyVHVyZiIsImNvbXB1dGVyVHVyZiIsInBsYXllckEiLCJjb21wdXRlckFJIiwicGxheWVyU2hpcHMiLCJjb21wdXRlclNoaXBzIiwiYXBwVmlldyIsImluaXQiLCJib2FyZCIsImkiLCJqIiwicGxhY2VTaGlwIiwieCIsInkiLCJpc1ZhbGlkUG9zaXRpb24iLCJib2R5IiwibGVuZ3RoIiwic2hpcExlbmd0aCIsInJlY2VpdmVBdHRhY2siLCJjaGVja0hhc1dvbiIsImV2ZXJ5IiwieFBvcyIsInlQb3MiLCJuYW1lIiwiYXR0YWNrIiwiZ2FtZUJvYXJkIiwiYWxyZWFkeVBsYXllZCIsInJhbmRvbUNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQXR0YWNrIiwia2V5IiwiaW5jbHVkZXMiLCJwdXNoIiwibWV0aG9kcyIsInNoaXBNZXRob2RzIiwiT2JqZWN0IiwiYXNzaWduIiwiaGl0IiwicG9zIiwiaXNIaXQiLCJpc1N1bmsiLCJwb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNsYXNzTmFtZXMiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGF0dXMiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJwbGF5ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwiYXBwZW5kIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsImNvbXB1dGVyTmFtZSIsImNvbXB1dGVyQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwicm93Iiwic3F1YXJlIiwiYmF0dGxlc2hpcCJdLCJzb3VyY2VSb290IjoiIn0=