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
  var playerTurf, computerTurf, playerA, computerAI, playerShips, computerShips, appView;
  var shipPointer = 0;
  var playerBoardId = 0;
  var computerBoardId = 1;

  var init = function init() {
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
    appView.bindHandlers(computerBoardHandlers, computerBoardId); // appView.startGame();
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
    appView.displayPlayAgain();
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

  var displayPlayAgain = function displayPlayAgain() {
    var boardsContainer = document.querySelector('.boards-container');
    var parent = boardsContainer.parentNode;
    var button = createElement('div', 'play-again', 'hoverable');
    button.textContent = 'Play Again';
    parent.insertBefore(button, boardsContainer);
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
    displayPlayAgain: displayPlayAgain
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE1QjtBQUNELEdBTkQ7O0FBUUEsU0FBTztBQUNMN0UsSUFBQUEsSUFBSSxFQUFKQSxJQURLO0FBRUxvQyxJQUFBQSxhQUFhLEVBQWJBLGFBRks7QUFHTG5DLElBQUFBLFlBQVksRUFBWkEsWUFISztBQUlMRyxJQUFBQSxpQkFBaUIsRUFBakJBLGlCQUpLO0FBS0wrQixJQUFBQSxtQkFBbUIsRUFBbkJBLG1CQUxLO0FBTUxkLElBQUFBLE9BQU8sRUFBUEEsT0FOSztBQU9MQyxJQUFBQSxLQUFLLEVBQUxBLEtBUEs7QUFRTFEsSUFBQUEsYUFBYSxFQUFiQSxhQVJLO0FBU0xDLElBQUFBLGdCQUFnQixFQUFoQkE7QUFUSyxHQUFQO0FBV0QsQ0F4SU07Ozs7OztVQ0FQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1vRixVQUFVLEdBQUduSSwyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBOEgsVUFBVSxDQUFDbkgsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3O1xuXG4gIGxldCBzaGlwUG9pbnRlciA9IDA7XG4gIGNvbnN0IHBsYXllckJvYXJkSWQgPSAwO1xuICBjb25zdCBjb21wdXRlckJvYXJkSWQgPSAxO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyVHVyZiA9IGdhbWVib2FyZCgpO1xuICAgIHBsYXllckEgPSBwbGF5ZXIoKTtcbiAgICBjb21wdXRlckFJID0gY29tcHV0ZXIoKTtcbiAgICBwbGF5ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBjb21wdXRlclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGFwcFZpZXcgPSB2aWV3KCk7XG4gICAgYXBwVmlldy5pbml0KCk7XG4gICAgYXBwVmlldy5iaW5kSGFuZGxlcnMocGxheWVyQm9hcmRIYW5kbGVycywgcGxheWVyQm9hcmRJZCk7XG4gIH07XG5cbiAgY29uc3QgYmVnaW5HYW1lID0gKCkgPT4ge1xuICAgIGFwcFZpZXcucmVtb3ZlQWxsSGFuZGxlcnMocGxheWVyQm9hcmRJZCk7XG4gICAgcG9wdWxhdGVDb21wdXRlclR1cmYoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyhjb21wdXRlckJvYXJkSGFuZGxlcnMsIGNvbXB1dGVyQm9hcmRJZCk7XG4gICAgLy8gYXBwVmlldy5zdGFydEdhbWUoKTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUNvbXB1dGVyVHVyZiA9ICgpID0+IHtcbiAgICBjb25zdCByYW5kb21JbnQgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH07XG4gICAgY29tcHV0ZXJTaGlwcy5tYXAoKHNoaXApID0+IHtcbiAgICAgIGxldCB4LCB5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tSW50KCk7XG4gICAgICAgIHkgPSByYW5kb21JbnQoKTtcbiAgICAgIH0gd2hpbGUgKCFjb21wdXRlclR1cmYuaXNWYWxpZFBvc2l0aW9uKHNoaXAsIHgsIHkpKTtcbiAgICAgIGNvbXB1dGVyVHVyZi5wbGFjZVNoaXAoc2hpcCwgeCwgeSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrQ2FsbGJhY2sgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIHJldHVybiBmdW5jdGlvbiBoYW5kbGVBdHRhY2soKSB7XG4gICAgICBjb25zdCBwbGF5ZXJEaWRIaXQgPSBwbGF5ZXJBLmF0dGFjayh4LCB5LCBjb21wdXRlclR1cmYpO1xuICAgICAgYXBwVmlldy5kaXNhYmxlKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgICAgYXBwVmlldy5wYWludCh4LCB5LCBib2FyZEluZGV4LCBwbGF5ZXJEaWRIaXQpO1xuICAgICAgY29uc3QgW2NvbXB1dGVyRGlkSGl0LCBjb21wdXRlckF0dGFja1gsIGNvbXB1dGVyQXR0YWNrWV0gPVxuICAgICAgICBjb21wdXRlckFJLnJhbmRvbUF0dGFjayhwbGF5ZXJUdXJmKTtcbiAgICAgIGFwcFZpZXcucGFpbnQoXG4gICAgICAgIGNvbXB1dGVyQXR0YWNrWCxcbiAgICAgICAgY29tcHV0ZXJBdHRhY2tZLFxuICAgICAgICBwbGF5ZXJCb2FyZElkLFxuICAgICAgICBjb21wdXRlckRpZEhpdFxuICAgICAgKTtcbiAgICAgIGlmIChjb21wdXRlclR1cmYuY2hlY2tIYXNMb3N0KCkgfHwgcGxheWVyVHVyZi5jaGVja0hhc0xvc3QoKSkge1xuICAgICAgICBoYW5kbGVHYW1lT3ZlcigpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgYXBwVmlldy5yZW1vdmVBbGxIYW5kbGVycyhjb21wdXRlckJvYXJkSWQpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBjb21wdXRlclR1cmYuY2hlY2tIYXNMb3N0KCkgPyAnWW91IHdpbiEnIDogJ1lvdSBsb3NlJztcbiAgICBhcHBWaWV3LmRpc3BsYXlXaW5uZXIobWVzc2FnZSk7XG4gICAgYXBwVmlldy5kaXNwbGF5UGxheUFnYWluKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2hlY2tQbGFjZW1lbnRDYWxsYmFjayA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhhbmRsZUNoZWNrUGxhY2VtZW50KCkge1xuICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgICBhcHBWaWV3LmNsZWFyUHJldkhpZ2hsaWdodHMoKTtcbiAgICAgIGlmIChwbGF5ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihjdXJyZW50U2hpcCwgeCwgeSkpIHtcbiAgICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0cnVlLCBib2FyZEluZGV4KTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBsYWNlbWVudENhbGxiYWNrID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlUGxhY2VtZW50KCkge1xuICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICAgIGFwcFZpZXcuY2xlYXJQcmV2SGlnaGxpZ2h0cygpO1xuICAgICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIGZhbHNlLCBib2FyZEluZGV4KTtcbiAgICAgICAgcGxheWVyVHVyZi5wbGFjZVNoaXAoY3VycmVudFNoaXAsIHgsIHkpO1xuICAgICAgICBzaGlwUG9pbnRlciArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgY29tcHV0ZXJCb2FyZEhhbmRsZXJzID0ge1xuICAgIGNsaWNrSGFuZGxlcjogaGFuZGxlQXR0YWNrQ2FsbGJhY2ssXG4gIH07XG5cbiAgY29uc3QgcGxheWVyQm9hcmRIYW5kbGVycyA9IHtcbiAgICBjbGlja0hhbmRsZXI6IGhhbmRsZVBsYWNlbWVudENhbGxiYWNrLFxuICAgIGhvdmVySGFuZGxlcjogaGFuZGxlQ2hlY2tQbGFjZW1lbnRDYWxsYmFjayxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IGdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBbXTtcbiAgLy8geCBjb29yZGluYXRlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICAgIC8veSBjb29yZGluYXRlc1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgYm9hcmRbaV1bal0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJvYXJkW3ggKyBpXVt5XSA9IHNoaXA7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGlzVmFsaWRQb3NpdGlvbiA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgbGV0IGlzQWxyZWFkeU9jY3VwaWVkID0gZmFsc2U7XG4gICAgbGV0IGlzT3V0T2ZCb3VuZHMgPSBzaGlwLmJvZHkubGVuZ3RoICsgeCA+IDEwO1xuICAgIGlmICghaXNPdXRPZkJvdW5kcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW3ggKyBpXVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzQWxyZWFkeU9jY3VwaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIWlzQWxyZWFkeU9jY3VwaWVkICYmICFpc091dE9mQm91bmRzO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gIT09ICdzdHJpbmcnICYmIGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzaGlwID0gYm9hcmRbeF1beV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgaWYgKGJvYXJkW2ldW3ldID09PSBzaGlwKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSAnaGl0JztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBib2FyZFt4XVt5XSA9ICdtaXNzZWQnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0hhc0xvc3QgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzUHJlc2VudCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbaV1bal0gIT09ICdzdHJpbmcnICYmIGJvYXJkW2ldW2pdICE9PSBudWxsKSB7XG4gICAgICAgICAgc2hpcHNQcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gIXNoaXBzUHJlc2VudDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICBib2FyZCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGNoZWNrSGFzTG9zdCxcbiAgICBpc1ZhbGlkUG9zaXRpb24sXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuXG5jb25zdCBwbGF5ZXIgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgYXR0YWNrOiAoeCwgeSwgZ2FtZUJvYXJkKSA9PiB7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IGNvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBhbHJlYWR5UGxheWVkID0gW107XG4gIGNvbnN0IHJhbmRvbUNvb3JkID0gKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICByZXR1cm4ge1xuICAgIHJhbmRvbUF0dGFjazogKGdhbWVCb2FyZCkgPT4ge1xuICAgICAgbGV0IHgsIHksIGtleTtcbiAgICAgIGRvIHtcbiAgICAgICAgeCA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIHkgPSByYW5kb21Db29yZCgpO1xuICAgICAgICBrZXkgPSBgJHt4fSAke3l9YDtcbiAgICAgIH0gd2hpbGUgKGFscmVhZHlQbGF5ZWQuaW5jbHVkZXMoa2V5KSk7XG4gICAgICBhbHJlYWR5UGxheWVkLnB1c2goa2V5KTtcbiAgICAgIHJldHVybiBbZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSksIHgsIHldO1xuICAgIH0sXG4gIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCBib2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBib2R5LnB1c2gobnVsbCk7XG4gIH1cbiAgY29uc3QgbWV0aG9kcyA9IHNoaXBNZXRob2RzKCk7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtZXRob2RzLCB7IGJvZHkgfSk7XG59O1xuXG5jb25zdCBzaGlwTWV0aG9kcyA9ICgpID0+IHtcbiAgLy9pbnB1dDogaW5kZXggb2YgYm9keVxuICBmdW5jdGlvbiBoaXQocG9zKSB7XG4gICAgbGV0IGlzSGl0ID0gZmFsc2U7XG4gICAgaWYgKHBvcyA8IHRoaXMuYm9keS5sZW5ndGggJiYgcG9zID49IDApIHtcbiAgICAgIHRoaXMuYm9keVtwb3NdID0gJ2hpdCc7XG4gICAgICBpc0hpdCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBpc0hpdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2R5LmV2ZXJ5KChwb3NpdGlvbikgPT4gcG9zaXRpb24gPT09ICdoaXQnKTtcbiAgfVxuXG4gIC8vb3V0cHV0OiBib29sZWFuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgdmlldyA9ICgpID0+IHtcbiAgY29uc3QgY3JlYXRlRWxlbWVudCA9ICh0eXBlLCAuLi5jbGFzc05hbWVzKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgIGZvciAobGV0IGluZGV4IGluIGNsYXNzTmFtZXMpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdnYW1lLXRpdGxlJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnQkFUVExFU0hJUFMnO1xuXG4gICAgY29uc3Qgc3RhdHVzID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3N0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdQbGFjZSB5b3VyIHNoaXBzJztcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkID0gY3JlYXRlQm9hcmQoKTtcbiAgICBwbGF5ZXJOYW1lLnRleHRDb250ZW50ID0gJ1BsYXllcic7XG4gICAgcGxheWVyQm9hcmRDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkLCBwbGF5ZXJOYW1lKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyTmFtZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5ZXItbmFtZScpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIGNvbXB1dGVyTmFtZS50ZXh0Q29udGVudCA9ICdDb21wdXRlcic7XG4gICAgY29tcHV0ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQoY29tcHV0ZXJCb2FyZCwgY29tcHV0ZXJOYW1lKTtcbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kKHBsYXllckJvYXJkQ29udGFpbmVyLCBjb21wdXRlckJvYXJkQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmQodGl0bGUsIHN0YXR1cywgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVBbGxIYW5kbGVycyA9IChib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm9hcmQtZ3JpZCcpW2JvYXJkSW5kZXhdO1xuICAgIGJvYXJkLnJlcGxhY2VXaXRoKGJvYXJkLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgY29uc3QgYm9hcmRJdGVyYWJsZSA9IGdldEJvYXJkKGJvYXJkSW5kZXgpO1xuICAgIGJvYXJkSXRlcmFibGUubWFwKChzcXVhcmUpID0+IHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcmFibGUnKSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XG4gICAgY29uc3QgaW5kZXhTdGFydCA9IGJvYXJkSW5kZXggKiAxMDA7XG4gICAgY29uc3QgaW5kZXhFbmQgPSBpbmRleFN0YXJ0ICsgMTAwO1xuICAgIGNvbnN0IGJvYXJkR3JpZCA9IFsuLi5ncmlkXS5zbGljZShpbmRleFN0YXJ0LCBpbmRleEVuZCk7XG4gICAgcmV0dXJuIGJvYXJkR3JpZDtcbiAgfTtcblxuICBjb25zdCBiaW5kSGFuZGxlcnMgPSAoaGFuZGxlcnNPYmosIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGdldEJvYXJkKGJvYXJkSW5kZXgpO1xuICAgIGJvYXJkLm1hcCgoc3F1YXJlLCBpbmRleCkgPT4ge1xuICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ2hvdmVyYWJsZScpO1xuICAgICAgY29uc3QgeCA9IGluZGV4ICUgMTA7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIDEwKTtcbiAgICAgIGlmIChoYW5kbGVyc09iai5oYXNPd25Qcm9wZXJ0eSgnaG92ZXJIYW5kbGVyJykpIHtcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICAgIGhhbmRsZXJzT2JqLmhvdmVySGFuZGxlcih4LCB5LCBib2FyZEluZGV4KVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGhhbmRsZXJzT2JqLmhhc093blByb3BlcnR5KCdjbGlja0hhbmRsZXInKSlcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICBoYW5kbGVyc09iai5jbGlja0hhbmRsZXIoeCwgeSwgYm9hcmRJbmRleClcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICAgICAgcm93LmFwcGVuZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdGVtcCwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGxldCBjbGFzc05hbWUgPSB0ZW1wID8gJ3NoaXAtcG9zc2libGUnIDogJ3NoaXAnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGdldFNxdWFyZSh4ICsgaSwgeSwgYm9hcmRJbmRleCk7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRTcXVhcmUgPSAoeCwgeSwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3cnKVt5ICsgYm9hcmRJbmRleCAqIDEwXTtcbiAgICByZXR1cm4gcm93LmNoaWxkTm9kZXNbeF07XG4gIH07XG5cbiAgY29uc3QgZGlzYWJsZSA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgIGNvbnN0IG5ld1NxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICBzcXVhcmUucmVwbGFjZVdpdGgobmV3U3F1YXJlKTtcbiAgfTtcblxuICBjb25zdCBjbGVhclByZXZIaWdobGlnaHRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByZXZIaWdobGlnaHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcG9zc2libGUnKTtcbiAgICBbLi4ucHJldkhpZ2hsaWdodHNdLm1hcCgocG9zc2libGVTaGlwKSA9PlxuICAgICAgcG9zc2libGVTaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcG9zc2libGUnKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcGFpbnQgPSAoeCwgeSwgYm9hcmRJbmRleCwgZGlkSGl0KSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGRpZEhpdCA/ICdoaXQnIDogJ21pc3MnO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVdpbm5lciA9IChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXlBZ2FpbiA9ICgpID0+IHtcbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHBhcmVudCA9IGJvYXJkc0NvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdwbGF5LWFnYWluJywgJ2hvdmVyYWJsZScpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluJztcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGJ1dHRvbiwgYm9hcmRzQ29udGFpbmVyKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgaGlnaGxpZ2h0U2hpcCxcbiAgICBiaW5kSGFuZGxlcnMsXG4gICAgcmVtb3ZlQWxsSGFuZGxlcnMsXG4gICAgY2xlYXJQcmV2SGlnaGxpZ2h0cyxcbiAgICBkaXNhYmxlLFxuICAgIHBhaW50LFxuICAgIGRpc3BsYXlXaW5uZXIsXG4gICAgZGlzcGxheVBsYXlBZ2FpbixcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWUgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGJhdHRsZXNoaXAgPSBnYW1lKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldyk7XG5iYXR0bGVzaGlwLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJnYW1lIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJzaGlwIiwidmlldyIsInBsYXllclR1cmYiLCJjb21wdXRlclR1cmYiLCJwbGF5ZXJBIiwiY29tcHV0ZXJBSSIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsImFwcFZpZXciLCJzaGlwUG9pbnRlciIsInBsYXllckJvYXJkSWQiLCJjb21wdXRlckJvYXJkSWQiLCJpbml0IiwiYmluZEhhbmRsZXJzIiwicGxheWVyQm9hcmRIYW5kbGVycyIsImJlZ2luR2FtZSIsInJlbW92ZUFsbEhhbmRsZXJzIiwicG9wdWxhdGVDb21wdXRlclR1cmYiLCJjb21wdXRlckJvYXJkSGFuZGxlcnMiLCJyYW5kb21JbnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXAiLCJ4IiwieSIsImlzVmFsaWRQb3NpdGlvbiIsInBsYWNlU2hpcCIsImhhbmRsZUF0dGFja0NhbGxiYWNrIiwiYm9hcmRJbmRleCIsImhhbmRsZUF0dGFjayIsInBsYXllckRpZEhpdCIsImF0dGFjayIsImRpc2FibGUiLCJwYWludCIsInJhbmRvbUF0dGFjayIsImNvbXB1dGVyRGlkSGl0IiwiY29tcHV0ZXJBdHRhY2tYIiwiY29tcHV0ZXJBdHRhY2tZIiwiY2hlY2tIYXNMb3N0IiwiaGFuZGxlR2FtZU92ZXIiLCJtZXNzYWdlIiwiZGlzcGxheVdpbm5lciIsImRpc3BsYXlQbGF5QWdhaW4iLCJoYW5kbGVDaGVja1BsYWNlbWVudENhbGxiYWNrIiwiaGFuZGxlQ2hlY2tQbGFjZW1lbnQiLCJjdXJyZW50U2hpcCIsImNsZWFyUHJldkhpZ2hsaWdodHMiLCJoaWdobGlnaHRTaGlwIiwiYm9keSIsImxlbmd0aCIsImhhbmRsZVBsYWNlbWVudENhbGxiYWNrIiwiaGFuZGxlUGxhY2VtZW50IiwiY2xpY2tIYW5kbGVyIiwiaG92ZXJIYW5kbGVyIiwiYm9hcmQiLCJpIiwiaiIsImlzQWxyZWFkeU9jY3VwaWVkIiwiaXNPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJzaGlwc1ByZXNlbnQiLCJnYW1lQm9hcmQiLCJhbHJlYWR5UGxheWVkIiwicmFuZG9tQ29vcmQiLCJrZXkiLCJpbmNsdWRlcyIsInB1c2giLCJtZXRob2RzIiwic2hpcE1ldGhvZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJoaXQiLCJwb3MiLCJpc0hpdCIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImVsIiwiZG9jdW1lbnQiLCJjbGFzc05hbWVzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0aXRsZSIsInRleHRDb250ZW50Iiwic3RhdHVzIiwiYm9hcmRzQ29udGFpbmVyIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyQm9hcmQiLCJjcmVhdGVCb2FyZCIsImFwcGVuZCIsImNvbXB1dGVyQm9hcmRDb250YWluZXIiLCJjb21wdXRlck5hbWUiLCJjb21wdXRlckJvYXJkIiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZXBsYWNlV2l0aCIsImNsb25lTm9kZSIsImJvYXJkSXRlcmFibGUiLCJnZXRCb2FyZCIsInNxdWFyZSIsInJlbW92ZSIsImdyaWQiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJib2FyZEdyaWQiLCJzbGljZSIsImhhbmRsZXJzT2JqIiwiaGFzT3duUHJvcGVydHkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93IiwidGVtcCIsImNsYXNzTmFtZSIsImdldFNxdWFyZSIsImNoaWxkTm9kZXMiLCJuZXdTcXVhcmUiLCJwcmV2SGlnaGxpZ2h0cyIsInBvc3NpYmxlU2hpcCIsImRpZEhpdCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJidXR0b24iLCJpbnNlcnRCZWZvcmUiLCJiYXR0bGVzaGlwIl0sInNvdXJjZVJvb3QiOiIifQ==