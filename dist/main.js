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
  var playerTurf, computerTurf, playerA, computerAI, playerShips, computerShips, appView, shipPointer;
  var playerBoardId = 0;
  var computerBoardId = 1;

  var init = function init() {
    shipPointer = 0;
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

  var clear = function clear() {
    document.body.replaceWith(createElement('body'));
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
    startGameMsg: startGameMsg,
    clear: clear
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU00RSxVQUFVLEdBQUd2SSwyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBa0ksVUFBVSxDQUFDdkgsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3LFxuICAgIHNoaXBQb2ludGVyO1xuICBjb25zdCBwbGF5ZXJCb2FyZElkID0gMDtcbiAgY29uc3QgY29tcHV0ZXJCb2FyZElkID0gMTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHNoaXBQb2ludGVyID0gMDtcbiAgICBwbGF5ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQSA9IHBsYXllcigpO1xuICAgIGNvbXB1dGVyQUkgPSBjb21wdXRlcigpO1xuICAgIHBsYXllclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGNvbXB1dGVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgYXBwVmlldyA9IHZpZXcoKTtcbiAgICBhcHBWaWV3LmluaXQoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyhwbGF5ZXJCb2FyZEhhbmRsZXJzLCBwbGF5ZXJCb2FyZElkKTtcbiAgfTtcblxuICBjb25zdCBiZWdpbkdhbWUgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5yZW1vdmVBbGxIYW5kbGVycyhwbGF5ZXJCb2FyZElkKTtcbiAgICBwb3B1bGF0ZUNvbXB1dGVyVHVyZigpO1xuICAgIGFwcFZpZXcuYmluZEhhbmRsZXJzKGNvbXB1dGVyQm9hcmRIYW5kbGVycywgY29tcHV0ZXJCb2FyZElkKTtcbiAgICBhcHBWaWV3LnN0YXJ0R2FtZU1zZygpO1xuICB9O1xuXG4gIGNvbnN0IHBvcHVsYXRlQ29tcHV0ZXJUdXJmID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUludCA9ICgpID0+IHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgfTtcbiAgICBjb21wdXRlclNoaXBzLm1hcCgoc2hpcCkgPT4ge1xuICAgICAgbGV0IHgsIHk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21JbnQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUludCgpO1xuICAgICAgfSB3aGlsZSAoIWNvbXB1dGVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oc2hpcCwgeCwgeSkpO1xuICAgICAgY29tcHV0ZXJUdXJmLnBsYWNlU2hpcChzaGlwLCB4LCB5KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBdHRhY2tDYWxsYmFjayA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUF0dGFjaygpIHtcbiAgICAgIGNvbnN0IHBsYXllckRpZEhpdCA9IHBsYXllckEuYXR0YWNrKHgsIHksIGNvbXB1dGVyVHVyZik7XG4gICAgICBhcHBWaWV3LmRpc2FibGUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgICBhcHBWaWV3LnBhaW50KHgsIHksIGJvYXJkSW5kZXgsIHBsYXllckRpZEhpdCk7XG4gICAgICBjb25zdCBbY29tcHV0ZXJEaWRIaXQsIGNvbXB1dGVyQXR0YWNrWCwgY29tcHV0ZXJBdHRhY2tZXSA9XG4gICAgICAgIGNvbXB1dGVyQUkucmFuZG9tQXR0YWNrKHBsYXllclR1cmYpO1xuICAgICAgYXBwVmlldy5wYWludChcbiAgICAgICAgY29tcHV0ZXJBdHRhY2tYLFxuICAgICAgICBjb21wdXRlckF0dGFja1ksXG4gICAgICAgIHBsYXllckJvYXJkSWQsXG4gICAgICAgIGNvbXB1dGVyRGlkSGl0XG4gICAgICApO1xuICAgICAgaWYgKGNvbXB1dGVyVHVyZi5jaGVja0hhc0xvc3QoKSB8fCBwbGF5ZXJUdXJmLmNoZWNrSGFzTG9zdCgpKSB7XG4gICAgICAgIGhhbmRsZUdhbWVPdmVyKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHYW1lT3ZlciA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnJlbW92ZUFsbEhhbmRsZXJzKGNvbXB1dGVyQm9hcmRJZCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IGNvbXB1dGVyVHVyZi5jaGVja0hhc0xvc3QoKSA/ICdZb3Ugd2luIScgOiAnWW91IGxvc2UnO1xuICAgIGFwcFZpZXcuZGlzcGxheVdpbm5lcihtZXNzYWdlKTtcbiAgICBhcHBWaWV3LmRpc3BsYXlQbGF5QWdhaW4oaGFuZGxlUmVzdGFydCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hlY2tQbGFjZW1lbnRDYWxsYmFjayA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUNoZWNrUGxhY2VtZW50KCkge1xuICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgICBhcHBWaWV3LmNsZWFyUHJldkhpZ2hsaWdodHMoKTtcbiAgICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0cnVlLCBib2FyZEluZGV4KTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBsYWNlbWVudENhbGxiYWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlUGxhY2VtZW50KCkge1xuICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICAgIGFwcFZpZXcuY2xlYXJQcmV2SGlnaGxpZ2h0cygpO1xuICAgICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIGZhbHNlLCBib2FyZEluZGV4KTtcbiAgICAgICAgcGxheWVyVHVyZi5wbGFjZVNoaXAoY3VycmVudFNoaXAsIHgsIHkpO1xuICAgICAgICBzaGlwUG9pbnRlciArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzdGFydCA9ICgpID0+IHtcbiAgICBhcHBWaWV3LmNsZWFyKCk7XG4gICAgaW5pdCgpO1xuICB9O1xuXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmRIYW5kbGVycyA9IHtcbiAgICBjbGlja0hhbmRsZXI6IGhhbmRsZUF0dGFja0NhbGxiYWNrLFxuICB9O1xuXG4gIGNvbnN0IHBsYXllckJvYXJkSGFuZGxlcnMgPSB7XG4gICAgY2xpY2tIYW5kbGVyOiBoYW5kbGVQbGFjZW1lbnRDYWxsYmFjayxcbiAgICBob3ZlckhhbmRsZXI6IGhhbmRsZUNoZWNrUGxhY2VtZW50Q2FsbGJhY2ssXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBnYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGJvYXJkID0gW107XG4gIC8vIHggY29vcmRpbmF0ZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgYm9hcmRbaV0gPSBbXTtcbiAgICAvL3kgY29vcmRpbmF0ZXNcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGJvYXJkW2ldW2pdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBib2FyZFt4ICsgaV1beV0gPSBzaGlwO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1ZhbGlkUG9zaXRpb24gPSAoc2hpcCwgeCwgeSkgPT4ge1xuICAgIGxldCBpc0FscmVhZHlPY2N1cGllZCA9IGZhbHNlO1xuICAgIGxldCBpc091dE9mQm91bmRzID0gc2hpcC5ib2R5Lmxlbmd0aCArIHggPiAxMDtcbiAgICBpZiAoIWlzT3V0T2ZCb3VuZHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5ib2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFt4ICsgaV1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICBpc0FscmVhZHlPY2N1cGllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFpc0FscmVhZHlPY2N1cGllZCAmJiAhaXNPdXRPZkJvdW5kcztcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldICE9PSAnc3RyaW5nJyAmJiBib2FyZFt4XVt5XSAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2hpcCA9IGJvYXJkW3hdW3ldO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGlmIChib2FyZFtpXVt5XSA9PT0gc2hpcCkge1xuICAgICAgICAgIGJvYXJkW3hdW3ldID0gJ2hpdCc7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgYm9hcmRbeF1beV0gPSAnbWlzc2VkJztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tIYXNMb3N0ID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1ByZXNlbnQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2pdICE9PSAnc3RyaW5nJyAmJiBib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNoaXBzUHJlc2VudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFzaGlwc1ByZXNlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0hhc0xvc3QsXG4gICAgaXNWYWxpZFBvc2l0aW9uLFxuICB9O1xufTtcbiIsImV4cG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfTtcblxuY29uc3QgcGxheWVyID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gW2dhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpLCB4LCB5XTtcbiAgICB9LFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBzaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgYm9keSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgYm9keS5wdXNoKG51bGwpO1xuICB9XG4gIGNvbnN0IG1ldGhvZHMgPSBzaGlwTWV0aG9kcygpO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbWV0aG9kcywgeyBib2R5IH0pO1xufTtcblxuY29uc3Qgc2hpcE1ldGhvZHMgPSAoKSA9PiB7XG4gIC8vaW5wdXQ6IGluZGV4IG9mIGJvZHlcbiAgZnVuY3Rpb24gaGl0KHBvcykge1xuICAgIGxldCBpc0hpdCA9IGZhbHNlO1xuICAgIGlmIChwb3MgPCB0aGlzLmJvZHkubGVuZ3RoICYmIHBvcyA+PSAwKSB7XG4gICAgICB0aGlzLmJvZHlbcG9zXSA9ICdoaXQnO1xuICAgICAgaXNIaXQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaXNIaXQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9keS5ldmVyeSgocG9zaXRpb24pID0+IHBvc2l0aW9uID09PSAnaGl0Jyk7XG4gIH1cblxuICAvL291dHB1dDogYm9vbGVhblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHZpZXcgPSAoKSA9PiB7XG4gIGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgLi4uY2xhc3NOYW1lcykgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICBmb3IgKGxldCBpbmRleCBpbiBjbGFzc05hbWVzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXNbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnZ2FtZS10aXRsZScpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ0JBVFRMRVNISVBTJztcblxuICAgIGNvbnN0IHN0YXR1cyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzdGF0dXMnKTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnUGxhY2UgeW91ciBzaGlwcyc7XG5cbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgcGxheWVyTmFtZS50ZXh0Q29udGVudCA9ICdQbGF5ZXInO1xuICAgIHBsYXllckJvYXJkQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZCwgcGxheWVyTmFtZSk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBjb21wdXRlck5hbWUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncGxheWVyLW5hbWUnKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBjb21wdXRlck5hbWUudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXInO1xuICAgIGNvbXB1dGVyQm9hcmRDb250YWluZXIuYXBwZW5kKGNvbXB1dGVyQm9hcmQsIGNvbXB1dGVyTmFtZSk7XG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZChwbGF5ZXJCb2FyZENvbnRhaW5lciwgY29tcHV0ZXJCb2FyZENvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKHRpdGxlLCBzdGF0dXMsIGJvYXJkc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlQWxsSGFuZGxlcnMgPSAoYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJvYXJkLWdyaWQnKVtib2FyZEluZGV4XTtcbiAgICBib2FyZC5yZXBsYWNlV2l0aChib2FyZC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIGNvbnN0IGJvYXJkSXRlcmFibGUgPSBnZXRCb2FyZChib2FyZEluZGV4KTtcbiAgICBib2FyZEl0ZXJhYmxlLm1hcCgoc3F1YXJlKSA9PiBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXJhYmxlJykpO1xuICB9O1xuXG4gIGNvbnN0IGdldEJvYXJkID0gKGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNxdWFyZScpO1xuICAgIGNvbnN0IGluZGV4U3RhcnQgPSBib2FyZEluZGV4ICogMTAwO1xuICAgIGNvbnN0IGluZGV4RW5kID0gaW5kZXhTdGFydCArIDEwMDtcbiAgICBjb25zdCBib2FyZEdyaWQgPSBbLi4uZ3JpZF0uc2xpY2UoaW5kZXhTdGFydCwgaW5kZXhFbmQpO1xuICAgIHJldHVybiBib2FyZEdyaWQ7XG4gIH07XG5cbiAgY29uc3QgYmluZEhhbmRsZXJzID0gKGhhbmRsZXJzT2JqLCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBnZXRCb2FyZChib2FyZEluZGV4KTtcbiAgICBib2FyZC5tYXAoKHNxdWFyZSwgaW5kZXgpID0+IHtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdob3ZlcmFibGUnKTtcbiAgICAgIGNvbnN0IHggPSBpbmRleCAlIDEwO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoaW5kZXggLyAxMCk7XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2hvdmVySGFuZGxlcicpKSB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICdtb3VzZWVudGVyJyxcbiAgICAgICAgICBoYW5kbGVyc09iai5ob3ZlckhhbmRsZXIoeCwgeSwgYm9hcmRJbmRleClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnY2xpY2tIYW5kbGVyJykpXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgaGFuZGxlcnNPYmouY2xpY2tIYW5kbGVyKHgsIHksIGJvYXJkSW5kZXgpXG4gICAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IGJvYXJkID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWdyaWQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdyb3cnKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBzcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgICAgIHJvdy5hcHBlbmQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICAgIGJvYXJkLmFwcGVuZChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH07XG5cbiAgY29uc3QgaGlnaGxpZ2h0U2hpcCA9IChsZW5ndGgsIHgsIHksIHRlbXAsIGJvYXJkSW5kZXgpID0+IHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGVtcCA/ICdzaGlwLXBvc3NpYmxlJyA6ICdzaGlwJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoeCArIGksIHksIGJvYXJkSW5kZXgpO1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0U3F1YXJlID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm93JylbeSArIGJvYXJkSW5kZXggKiAxMF07XG4gICAgcmV0dXJuIHJvdy5jaGlsZE5vZGVzW3hdO1xuICB9O1xuXG4gIGNvbnN0IGRpc2FibGUgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGdldFNxdWFyZSh4LCB5LCBib2FyZEluZGV4KTtcbiAgICBjb25zdCBuZXdTcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgc3F1YXJlLnJlcGxhY2VXaXRoKG5ld1NxdWFyZSk7XG4gIH07XG5cbiAgY29uc3QgY2xlYXJQcmV2SGlnaGxpZ2h0cyA9ICgpID0+IHtcbiAgICBjb25zdCBwcmV2SGlnaGxpZ2h0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXBvc3NpYmxlJyk7XG4gICAgWy4uLnByZXZIaWdobGlnaHRzXS5tYXAoKHBvc3NpYmxlU2hpcCkgPT5cbiAgICAgIHBvc3NpYmxlU2hpcC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwLXBvc3NpYmxlJylcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHBhaW50ID0gKHgsIHksIGJvYXJkSW5kZXgsIGRpZEhpdCkgPT4ge1xuICAgIGNvbnN0IHNxdWFyZSA9IGdldFNxdWFyZSh4LCB5LCBib2FyZEluZGV4KTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBkaWRIaXQgPyAnaGl0JyA6ICdtaXNzJztcbiAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlXaW5uZXIgPSAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQbGF5QWdhaW4gPSAocmVzdGFydEhhbmRsZXIpID0+IHtcbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBhcmVudCA9IGJvYXJkc0NvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5LWFnYWluJywgJ2hvdmVyYWJsZScpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluJztcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZXN0YXJ0SGFuZGxlcigpO1xuICAgIH0pO1xuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoYnV0dG9uLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0R2FtZU1zZyA9ICgpID0+IHtcbiAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ0JlZ2luISc7XG4gIH07XG5cbiAgY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5yZXBsYWNlV2l0aChjcmVhdGVFbGVtZW50KCdib2R5JykpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBoaWdobGlnaHRTaGlwLFxuICAgIGJpbmRIYW5kbGVycyxcbiAgICByZW1vdmVBbGxIYW5kbGVycyxcbiAgICBjbGVhclByZXZIaWdobGlnaHRzLFxuICAgIGRpc2FibGUsXG4gICAgcGFpbnQsXG4gICAgZGlzcGxheVdpbm5lcixcbiAgICBkaXNwbGF5UGxheUFnYWluLFxuICAgIHN0YXJ0R2FtZU1zZyxcbiAgICBjbGVhcixcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWUgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGJhdHRsZXNoaXAgPSBnYW1lKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldyk7XG5iYXR0bGVzaGlwLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJnYW1lIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJzaGlwIiwidmlldyIsInBsYXllclR1cmYiLCJjb21wdXRlclR1cmYiLCJwbGF5ZXJBIiwiY29tcHV0ZXJBSSIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsImFwcFZpZXciLCJzaGlwUG9pbnRlciIsInBsYXllckJvYXJkSWQiLCJjb21wdXRlckJvYXJkSWQiLCJpbml0IiwiYmluZEhhbmRsZXJzIiwicGxheWVyQm9hcmRIYW5kbGVycyIsImJlZ2luR2FtZSIsInJlbW92ZUFsbEhhbmRsZXJzIiwicG9wdWxhdGVDb21wdXRlclR1cmYiLCJjb21wdXRlckJvYXJkSGFuZGxlcnMiLCJzdGFydEdhbWVNc2ciLCJyYW5kb21JbnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXAiLCJ4IiwieSIsImlzVmFsaWRQb3NpdGlvbiIsInBsYWNlU2hpcCIsImhhbmRsZUF0dGFja0NhbGxiYWNrIiwiYm9hcmRJbmRleCIsImhhbmRsZUF0dGFjayIsInBsYXllckRpZEhpdCIsImF0dGFjayIsImRpc2FibGUiLCJwYWludCIsInJhbmRvbUF0dGFjayIsImNvbXB1dGVyRGlkSGl0IiwiY29tcHV0ZXJBdHRhY2tYIiwiY29tcHV0ZXJBdHRhY2tZIiwiY2hlY2tIYXNMb3N0IiwiaGFuZGxlR2FtZU92ZXIiLCJtZXNzYWdlIiwiZGlzcGxheVdpbm5lciIsImRpc3BsYXlQbGF5QWdhaW4iLCJoYW5kbGVSZXN0YXJ0IiwiaGFuZGxlQ2hlY2tQbGFjZW1lbnRDYWxsYmFjayIsImhhbmRsZUNoZWNrUGxhY2VtZW50IiwiY3VycmVudFNoaXAiLCJjbGVhclByZXZIaWdobGlnaHRzIiwiaGlnaGxpZ2h0U2hpcCIsImJvZHkiLCJsZW5ndGgiLCJoYW5kbGVQbGFjZW1lbnRDYWxsYmFjayIsImhhbmRsZVBsYWNlbWVudCIsImNsZWFyIiwiY2xpY2tIYW5kbGVyIiwiaG92ZXJIYW5kbGVyIiwiYm9hcmQiLCJpIiwiaiIsImlzQWxyZWFkeU9jY3VwaWVkIiwiaXNPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJzaGlwc1ByZXNlbnQiLCJnYW1lQm9hcmQiLCJhbHJlYWR5UGxheWVkIiwicmFuZG9tQ29vcmQiLCJrZXkiLCJpbmNsdWRlcyIsInB1c2giLCJtZXRob2RzIiwic2hpcE1ldGhvZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJoaXQiLCJwb3MiLCJpc0hpdCIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImVsIiwiZG9jdW1lbnQiLCJjbGFzc05hbWVzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0aXRsZSIsInRleHRDb250ZW50Iiwic3RhdHVzIiwiYm9hcmRzQ29udGFpbmVyIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyQm9hcmQiLCJjcmVhdGVCb2FyZCIsImFwcGVuZCIsImNvbXB1dGVyQm9hcmRDb250YWluZXIiLCJjb21wdXRlck5hbWUiLCJjb21wdXRlckJvYXJkIiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZXBsYWNlV2l0aCIsImNsb25lTm9kZSIsImJvYXJkSXRlcmFibGUiLCJnZXRCb2FyZCIsInNxdWFyZSIsInJlbW92ZSIsImdyaWQiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJib2FyZEdyaWQiLCJzbGljZSIsImhhbmRsZXJzT2JqIiwiaGFzT3duUHJvcGVydHkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93IiwidGVtcCIsImNsYXNzTmFtZSIsImdldFNxdWFyZSIsImNoaWxkTm9kZXMiLCJuZXdTcXVhcmUiLCJwcmV2SGlnaGxpZ2h0cyIsInBvc3NpYmxlU2hpcCIsImRpZEhpdCIsInJlc3RhcnRIYW5kbGVyIiwicGFyZW50IiwicGFyZW50Tm9kZSIsImJ1dHRvbiIsImluc2VydEJlZm9yZSIsImJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9