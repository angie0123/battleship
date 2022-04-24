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
    appView.removeAllHandlers(0); // appView.bindAttackHandler({ handleAttack });
    // appView.startGame();
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
    clearPrevHighlights();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU04RSxVQUFVLEdBQUd6RywyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBb0csVUFBVSxDQUFDM0YsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3O1xuXG4gIGxldCBzaGlwUG9pbnRlciA9IDA7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQSA9IHBsYXllcigpO1xuICAgIGNvbXB1dGVyQUkgPSBjb21wdXRlcigpO1xuICAgIHBsYXllclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGNvbXB1dGVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgYXBwVmlldyA9IHZpZXcoKTtcbiAgICBhcHBWaWV3LmluaXQoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyhcbiAgICAgIHsgaG92ZXJIYW5kbGVyOiBoYW5kbGVDaGVja1BsYWNlbWVudCwgY2xpY2tIYW5kbGVyOiBoYW5kbGVQbGFjZW1lbnQgfSxcbiAgICAgIDBcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGJlZ2luR2FtZSA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnJlbW92ZUFsbEhhbmRsZXJzKDApO1xuXG4gICAgLy8gYXBwVmlldy5iaW5kQXR0YWNrSGFuZGxlcih7IGhhbmRsZUF0dGFjayB9KTtcbiAgICAvLyBhcHBWaWV3LnN0YXJ0R2FtZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUF0dGFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0IGhhbmRsZUNoZWNrUGxhY2VtZW50ID0gKHgsIHksIGJvYXJkSWQpID0+IHtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBhcHBWaWV3LmNsZWFyUHJldkhpZ2hsaWdodHMoKTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRydWUsIGJvYXJkSWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQbGFjZW1lbnQgPSAoeCwgeSwgYm9hcmRJZCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gcGxheWVyU2hpcHNbc2hpcFBvaW50ZXJdO1xuICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgIGFwcFZpZXcuaGlnaGxpZ2h0U2hpcChjdXJyZW50U2hpcC5ib2R5Lmxlbmd0aCwgeCwgeSwgZmFsc2UsIGJvYXJkSWQpO1xuICAgICAgcGxheWVyVHVyZi5wbGFjZVNoaXAoY3VycmVudFNoaXAsIHgsIHkpO1xuICAgICAgc2hpcFBvaW50ZXIgKz0gMTtcbiAgICB9XG4gICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBsZXQgaXNBbHJlYWR5T2NjdXBpZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNPdXRPZkJvdW5kcyA9IHNoaXAuYm9keS5sZW5ndGggKyB4ID4gMTA7XG4gICAgaWYgKCFpc091dE9mQm91bmRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNBbHJlYWR5T2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhaXNBbHJlYWR5T2NjdXBpZWQgJiYgIWlzT3V0T2ZCb3VuZHM7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzV29uID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1ByZXNlbnQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2pdICE9PSAnc3RyaW5nJyAmJiBib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNoaXBzUHJlc2VudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFzaGlwc1ByZXNlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0hhc1dvbixcbiAgICBpc1ZhbGlkUG9zaXRpb24sXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJvZHkucHVzaChudWxsKTtcbiAgfVxuICBjb25zdCBtZXRob2RzID0gc2hpcE1ldGhvZHMoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHsgYm9keSB9KTtcbn07XG5cbmNvbnN0IHNoaXBNZXRob2RzID0gKCkgPT4ge1xuICAvL2lucHV0OiBpbmRleCBvZiBib2R5XG4gIGZ1bmN0aW9uIGhpdChwb3MpIHtcbiAgICBsZXQgaXNIaXQgPSBmYWxzZTtcbiAgICBpZiAocG9zIDwgdGhpcy5ib2R5Lmxlbmd0aCAmJiBwb3MgPj0gMCkge1xuICAgICAgdGhpcy5ib2R5W3Bvc10gPSAnaGl0JztcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkuZXZlcnkoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbiA9PT0gJ2hpdCcpO1xuICB9XG5cbiAgLy9vdXRwdXQ6IGJvb2xlYW5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCB2aWV3ID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIC4uLmNsYXNzTmFtZXMpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3NOYW1lcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2dhbWUtdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQUyc7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSAnUGxheWVyJztcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmQsIHBsYXllck5hbWUpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyJztcbiAgICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckJvYXJkLCBjb21wdXRlck5hbWUpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZCh0aXRsZSwgc3RhdHVzLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUFsbEhhbmRsZXJzID0gKGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1ncmlkJylbYm9hcmRJbmRleF07XG4gICAgYm9hcmQucmVwbGFjZVdpdGgoYm9hcmQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfTtcblxuICBjb25zdCBiaW5kSGFuZGxlcnMgPSAoaGFuZGxlcnNPYmosIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNxdWFyZScpO1xuICAgIGNvbnN0IGluZGV4U3RhcnQgPSBib2FyZEluZGV4ICogMTAwO1xuICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIDEwMDtcbiAgICBjb25zdCBib2FyZEdyaWQgPSBbLi4uZ3JpZF0uc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpO1xuXG4gICAgYm9hcmRHcmlkLm1hcCgoc3F1YXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgeCA9IGluZGV4ICUgMTA7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnaG92ZXJIYW5kbGVyJykpIHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnNPYmouaG92ZXJIYW5kbGVyKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnY2xpY2tIYW5kbGVyJykpXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVyc09iai5jbGlja0hhbmRsZXIoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGxldCBib2FyZCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NxdWFyZScpO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBgJHtqfSwgJHtpfWA7XG4gICAgICAgIHJvdy5hcHBlbmQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgaGlnaGxpZ2h0U2hpcCA9IChsZW5ndGgsIHgsIHksIHRlbXAsIGJvYXJkSW5kZXgpID0+IHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGVtcCA/ICdzaGlwLXBvc3NpYmxlJyA6ICdzaGlwJztcbiAgICBjbGVhclByZXZIaWdobGlnaHRzKCk7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdycpW3kgKyBib2FyZEluZGV4ICogMTBdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJvdy5jaGlsZE5vZGVzW3ggKyBpXS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNsZWFyUHJldkhpZ2hsaWdodHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJldkhpZ2hsaWdodHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcC1wb3NzaWJsZScpO1xuICAgIFsuLi5wcmV2SGlnaGxpZ2h0c10ubWFwKChwb3NzaWJsZVNoaXApID0+XG4gICAgICBwb3NzaWJsZVNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1wb3NzaWJsZScpXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgaGlnaGxpZ2h0U2hpcCxcbiAgICBiaW5kSGFuZGxlcnMsXG4gICAgcmVtb3ZlQWxsSGFuZGxlcnMsXG4gICAgY2xlYXJQcmV2SGlnaGxpZ2h0cyxcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWUgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGJhdHRsZXNoaXAgPSBnYW1lKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldyk7XG5iYXR0bGVzaGlwLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJnYW1lIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJzaGlwIiwidmlldyIsInBsYXllclR1cmYiLCJjb21wdXRlclR1cmYiLCJwbGF5ZXJBIiwiY29tcHV0ZXJBSSIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsImFwcFZpZXciLCJzaGlwUG9pbnRlciIsImluaXQiLCJiaW5kSGFuZGxlcnMiLCJob3ZlckhhbmRsZXIiLCJoYW5kbGVDaGVja1BsYWNlbWVudCIsImNsaWNrSGFuZGxlciIsImhhbmRsZVBsYWNlbWVudCIsImJlZ2luR2FtZSIsInJlbW92ZUFsbEhhbmRsZXJzIiwiaGFuZGxlQXR0YWNrIiwieCIsInkiLCJib2FyZElkIiwiY3VycmVudFNoaXAiLCJjbGVhclByZXZIaWdobGlnaHRzIiwiaXNWYWxpZFBvc2l0aW9uIiwiaGlnaGxpZ2h0U2hpcCIsImJvZHkiLCJsZW5ndGgiLCJwbGFjZVNoaXAiLCJib2FyZCIsImkiLCJqIiwiaXNBbHJlYWR5T2NjdXBpZWQiLCJpc091dE9mQm91bmRzIiwicmVjZWl2ZUF0dGFjayIsImNoZWNrSGFzV29uIiwic2hpcHNQcmVzZW50IiwibmFtZSIsImF0dGFjayIsImdhbWVCb2FyZCIsImFscmVhZHlQbGF5ZWQiLCJyYW5kb21Db29yZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbUF0dGFjayIsImtleSIsImluY2x1ZGVzIiwicHVzaCIsIm1ldGhvZHMiLCJzaGlwTWV0aG9kcyIsIk9iamVjdCIsImFzc2lnbiIsImhpdCIsInBvcyIsImlzSGl0IiwiaXNTdW5rIiwiZXZlcnkiLCJwb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZWwiLCJkb2N1bWVudCIsImNsYXNzTmFtZXMiLCJpbmRleCIsImNsYXNzTGlzdCIsImFkZCIsInRpdGxlIiwidGV4dENvbnRlbnQiLCJzdGF0dXMiLCJib2FyZHNDb250YWluZXIiLCJwbGF5ZXJCb2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJwbGF5ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwiYXBwZW5kIiwiY29tcHV0ZXJCb2FyZENvbnRhaW5lciIsImNvbXB1dGVyTmFtZSIsImNvbXB1dGVyQm9hcmQiLCJxdWVyeVNlbGVjdG9yIiwiYm9hcmRJbmRleCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZXBsYWNlV2l0aCIsImNsb25lTm9kZSIsImhhbmRsZXJzT2JqIiwiZ3JpZCIsImluZGV4U3RhcnQiLCJpbmRleEVuZCIsImJvYXJkR3JpZCIsInNsaWNlIiwibWFwIiwic3F1YXJlIiwiaGFzT3duUHJvcGVydHkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93IiwidGVtcCIsImNsYXNzTmFtZSIsImNoaWxkTm9kZXMiLCJwcmV2SGlnaGxpZ2h0cyIsInBvc3NpYmxlU2hpcCIsInJlbW92ZSIsImJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9