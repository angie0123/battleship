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
    appView.disable(x, y, boardIndex);
    appView.paint(x, y, boardIndex, playerDidHit);

    var _computerAI$randomAtt = computerAI.randomAttack(playerTurf),
        _computerAI$randomAtt2 = _slicedToArray(_computerAI$randomAtt, 3),
        computerDidHit = _computerAI$randomAtt2[0],
        computerAttackX = _computerAI$randomAtt2[1],
        computerAttackY = _computerAI$randomAtt2[2];

    var playerBoardIndex = 0;
    appView.paint(computerAttackX, computerAttackY, playerBoardIndex, computerDidHit);

    if (computerTurf.checkHasLost() || playerTurf.checkHasLost()) {
      handleGameOver();
    }
  };

  var handleGameOver = function handleGameOver() {
    var winner = computerTurf.checkHasLost() ? 'You win!' : 'You lose';
    console.log(winner);
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
    square.replaceWith(square.cloneNode(false));
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

  return {
    init: init,
    highlightShip: highlightShip,
    bindHandlers: bindHandlers,
    removeAllHandlers: removeAllHandlers,
    clearPrevHighlights: clearPrevHighlights,
    disable: disable,
    paint: paint
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNDLE1BQUQsRUFBU0MsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEJDLElBQTlCLEVBQW9DQyxJQUFwQyxFQUE2QztBQUMvRCxNQUFJQyxVQUFKLEVBQ0VDLFlBREYsRUFFRUMsT0FGRixFQUdFQyxVQUhGLEVBSUVDLFdBSkYsRUFLRUMsYUFMRixFQU1FQyxPQU5GO0FBUUEsTUFBSUMsV0FBVyxHQUFHLENBQWxCOztBQUVBLE1BQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDakJSLElBQUFBLFVBQVUsR0FBR0gsU0FBUyxFQUF0QjtBQUNBSSxJQUFBQSxZQUFZLEdBQUdKLFNBQVMsRUFBeEI7QUFDQUssSUFBQUEsT0FBTyxHQUFHUCxNQUFNLEVBQWhCO0FBQ0FRLElBQUFBLFVBQVUsR0FBR1AsUUFBUSxFQUFyQjtBQUNBUSxJQUFBQSxXQUFXLEdBQUcsQ0FBQ04sSUFBSSxDQUFDLENBQUQsQ0FBTCxFQUFVQSxJQUFJLENBQUMsQ0FBRCxDQUFkLEVBQW1CQSxJQUFJLENBQUMsQ0FBRCxDQUF2QixFQUE0QkEsSUFBSSxDQUFDLENBQUQsQ0FBaEMsRUFBcUNBLElBQUksQ0FBQyxDQUFELENBQXpDLENBQWQ7QUFDQU8sSUFBQUEsYUFBYSxHQUFHLENBQUNQLElBQUksQ0FBQyxDQUFELENBQUwsRUFBVUEsSUFBSSxDQUFDLENBQUQsQ0FBZCxFQUFtQkEsSUFBSSxDQUFDLENBQUQsQ0FBdkIsRUFBNEJBLElBQUksQ0FBQyxDQUFELENBQWhDLEVBQXFDQSxJQUFJLENBQUMsQ0FBRCxDQUF6QyxDQUFoQjtBQUNBUSxJQUFBQSxPQUFPLEdBQUdQLElBQUksRUFBZDtBQUNBTyxJQUFBQSxPQUFPLENBQUNFLElBQVI7QUFDQUYsSUFBQUEsT0FBTyxDQUFDRyxZQUFSLENBQ0U7QUFBRUMsTUFBQUEsWUFBWSxFQUFFQyxvQkFBaEI7QUFBc0NDLE1BQUFBLFlBQVksRUFBRUM7QUFBcEQsS0FERixFQUVFLENBRkY7QUFJRCxHQWJEOztBQWVBLE1BQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFDdEJSLElBQUFBLE9BQU8sQ0FBQ1MsaUJBQVIsQ0FBMEIsQ0FBMUI7QUFDQUMsSUFBQUEsb0JBQW9CO0FBQ3BCVixJQUFBQSxPQUFPLENBQUNHLFlBQVIsQ0FBcUI7QUFBRUcsTUFBQUEsWUFBWSxFQUFFSztBQUFoQixLQUFyQixFQUFxRCxDQUFyRCxFQUhzQixDQUl0QjtBQUNELEdBTEQ7O0FBT0EsTUFBTUQsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixHQUFNO0FBQ2pDLFFBQU1FLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFDdEIsYUFBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixFQUEzQixDQUFQO0FBQ0QsS0FGRDs7QUFHQWhCLElBQUFBLGFBQWEsQ0FBQ2lCLEdBQWQsQ0FBa0IsVUFBQ3hCLElBQUQsRUFBVTtBQUMxQixVQUFJeUIsQ0FBSixFQUFPQyxDQUFQOztBQUNBLFNBQUc7QUFDREQsUUFBQUEsQ0FBQyxHQUFHTCxTQUFTLEVBQWI7QUFDQU0sUUFBQUEsQ0FBQyxHQUFHTixTQUFTLEVBQWI7QUFDRCxPQUhELFFBR1MsQ0FBQ2pCLFlBQVksQ0FBQ3dCLGVBQWIsQ0FBNkIzQixJQUE3QixFQUFtQ3lCLENBQW5DLEVBQXNDQyxDQUF0QyxDQUhWOztBQUlBdkIsTUFBQUEsWUFBWSxDQUFDeUIsU0FBYixDQUF1QjVCLElBQXZCLEVBQTZCeUIsQ0FBN0IsRUFBZ0NDLENBQWhDO0FBQ0QsS0FQRDtBQVFELEdBWkQ7O0FBY0EsTUFBTVAsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ00sQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsRUFBc0I7QUFDekMsUUFBTUMsWUFBWSxHQUFHMUIsT0FBTyxDQUFDMkIsTUFBUixDQUFlTixDQUFmLEVBQWtCQyxDQUFsQixFQUFxQnZCLFlBQXJCLENBQXJCO0FBQ0FLLElBQUFBLE9BQU8sQ0FBQ3dCLE9BQVIsQ0FBZ0JQLENBQWhCLEVBQW1CQyxDQUFuQixFQUFzQkcsVUFBdEI7QUFDQXJCLElBQUFBLE9BQU8sQ0FBQ3lCLEtBQVIsQ0FBY1IsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0JHLFVBQXBCLEVBQWdDQyxZQUFoQzs7QUFDQSxnQ0FDRXpCLFVBQVUsQ0FBQzZCLFlBQVgsQ0FBd0JoQyxVQUF4QixDQURGO0FBQUE7QUFBQSxRQUFPaUMsY0FBUDtBQUFBLFFBQXVCQyxlQUF2QjtBQUFBLFFBQXdDQyxlQUF4Qzs7QUFFQSxRQUFNQyxnQkFBZ0IsR0FBRyxDQUF6QjtBQUNBOUIsSUFBQUEsT0FBTyxDQUFDeUIsS0FBUixDQUNFRyxlQURGLEVBRUVDLGVBRkYsRUFHRUMsZ0JBSEYsRUFJRUgsY0FKRjs7QUFNQSxRQUFJaEMsWUFBWSxDQUFDb0MsWUFBYixNQUErQnJDLFVBQVUsQ0FBQ3FDLFlBQVgsRUFBbkMsRUFBOEQ7QUFDNURDLE1BQUFBLGNBQWM7QUFDZjtBQUNGLEdBaEJEOztBQWtCQSxNQUFNQSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDM0IsUUFBTUMsTUFBTSxHQUFHdEMsWUFBWSxDQUFDb0MsWUFBYixLQUE4QixVQUE5QixHQUEyQyxVQUExRDtBQUNBRyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsTUFBWjtBQUNELEdBSEQ7O0FBS0EsTUFBTTVCLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQ1ksQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsRUFBc0I7QUFDakQsUUFBTWUsV0FBVyxHQUFHdEMsV0FBVyxDQUFDRyxXQUFELENBQS9CO0FBQ0FELElBQUFBLE9BQU8sQ0FBQ3FDLG1CQUFSOztBQUNBLFFBQUkzQyxVQUFVLENBQUN5QixlQUFYLENBQTJCaUIsV0FBM0IsRUFBd0NuQixDQUF4QyxFQUEyQ0MsQ0FBM0MsQ0FBSixFQUFtRDtBQUNqRGxCLE1BQUFBLE9BQU8sQ0FBQ3NDLGFBQVIsQ0FBc0JGLFdBQVcsQ0FBQ0csSUFBWixDQUFpQkMsTUFBdkMsRUFBK0N2QixDQUEvQyxFQUFrREMsQ0FBbEQsRUFBcUQsSUFBckQsRUFBMkRHLFVBQTNEO0FBQ0Q7QUFDRixHQU5EOztBQVFBLE1BQU1kLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ1UsQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsRUFBc0I7QUFDNUMsUUFBTWUsV0FBVyxHQUFHdEMsV0FBVyxDQUFDRyxXQUFELENBQS9COztBQUNBLFFBQUlQLFVBQVUsQ0FBQ3lCLGVBQVgsQ0FBMkJpQixXQUEzQixFQUF3Q25CLENBQXhDLEVBQTJDQyxDQUEzQyxDQUFKLEVBQW1EO0FBQ2pEbEIsTUFBQUEsT0FBTyxDQUFDcUMsbUJBQVI7QUFDQXJDLE1BQUFBLE9BQU8sQ0FBQ3NDLGFBQVIsQ0FBc0JGLFdBQVcsQ0FBQ0csSUFBWixDQUFpQkMsTUFBdkMsRUFBK0N2QixDQUEvQyxFQUFrREMsQ0FBbEQsRUFBcUQsS0FBckQsRUFBNERHLFVBQTVEO0FBQ0EzQixNQUFBQSxVQUFVLENBQUMwQixTQUFYLENBQXFCZ0IsV0FBckIsRUFBa0NuQixDQUFsQyxFQUFxQ0MsQ0FBckM7QUFDQWpCLE1BQUFBLFdBQVcsSUFBSSxDQUFmO0FBQ0Q7O0FBQ0QsUUFBSUEsV0FBVyxLQUFLSCxXQUFXLENBQUMwQyxNQUFoQyxFQUF3Q2hDLFNBQVM7QUFDbEQsR0FURDs7QUFXQSxTQUFPO0FBQ0xOLElBQUFBLElBQUksRUFBSkE7QUFESyxHQUFQO0FBR0QsQ0E1Rk07Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTVgsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtBQUM3QixNQUFNa0QsS0FBSyxHQUFHLEVBQWQsQ0FENkIsQ0FFN0I7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzNCRCxJQUFBQSxLQUFLLENBQUNDLENBQUQsQ0FBTCxHQUFXLEVBQVgsQ0FEMkIsQ0FFM0I7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzNCRixNQUFBQSxLQUFLLENBQUNDLENBQUQsQ0FBTCxDQUFTQyxDQUFULElBQWMsSUFBZDtBQUNEO0FBQ0Y7O0FBRUQsTUFBTXZCLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUM1QixJQUFELEVBQU95QixDQUFQLEVBQVVDLENBQVYsRUFBZ0I7QUFDaEMsU0FBSyxJQUFJd0IsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBR2xELElBQUksQ0FBQytDLElBQUwsQ0FBVUMsTUFBOUIsRUFBc0NFLEVBQUMsRUFBdkMsRUFBMkM7QUFDekNELE1BQUFBLEtBQUssQ0FBQ3hCLENBQUMsR0FBR3lCLEVBQUwsQ0FBTCxDQUFheEIsQ0FBYixJQUFrQjFCLElBQWxCO0FBQ0Q7QUFDRixHQUpEOztBQU1BLE1BQU0yQixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUMzQixJQUFELEVBQU95QixDQUFQLEVBQVVDLENBQVYsRUFBZ0I7QUFDdEMsUUFBSTBCLGlCQUFpQixHQUFHLEtBQXhCO0FBQ0EsUUFBSUMsYUFBYSxHQUFHckQsSUFBSSxDQUFDK0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CdkIsQ0FBbkIsR0FBdUIsRUFBM0M7O0FBQ0EsUUFBSSxDQUFDNEIsYUFBTCxFQUFvQjtBQUNsQixXQUFLLElBQUlILEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdsRCxJQUFJLENBQUMrQyxJQUFMLENBQVVDLE1BQTlCLEVBQXNDRSxHQUFDLEVBQXZDLEVBQTJDO0FBQ3pDLFlBQUlELEtBQUssQ0FBQ3hCLENBQUMsR0FBR3lCLEdBQUwsQ0FBTCxDQUFheEIsQ0FBYixNQUFvQixJQUF4QixFQUE4QjtBQUM1QjBCLFVBQUFBLGlCQUFpQixHQUFHLElBQXBCO0FBQ0Q7QUFDRjtBQUNGOztBQUNELFdBQU8sQ0FBQ0EsaUJBQUQsSUFBc0IsQ0FBQ0MsYUFBOUI7QUFDRCxHQVhEOztBQWFBLE1BQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQzdCLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQzlCLFFBQUksT0FBT3VCLEtBQUssQ0FBQ3hCLENBQUQsQ0FBTCxDQUFTQyxDQUFULENBQVAsS0FBdUIsUUFBdkIsSUFBbUN1QixLQUFLLENBQUN4QixDQUFELENBQUwsQ0FBU0MsQ0FBVCxNQUFnQixJQUF2RCxFQUE2RDtBQUMzRCxVQUFNMUIsSUFBSSxHQUFHaUQsS0FBSyxDQUFDeEIsQ0FBRCxDQUFMLENBQVNDLENBQVQsQ0FBYjs7QUFDQSxXQUFLLElBQUl3QixHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxHQUFDLEVBQXpCLEVBQTZCO0FBQzNCLFlBQUlELEtBQUssQ0FBQ0MsR0FBRCxDQUFMLENBQVN4QixDQUFULE1BQWdCMUIsSUFBcEIsRUFBMEI7QUFDeEJpRCxVQUFBQSxLQUFLLENBQUN4QixDQUFELENBQUwsQ0FBU0MsQ0FBVCxJQUFjLEtBQWQ7QUFDQSxpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGOztBQUNEdUIsSUFBQUEsS0FBSyxDQUFDeEIsQ0FBRCxDQUFMLENBQVNDLENBQVQsSUFBYyxRQUFkO0FBQ0EsV0FBTyxLQUFQO0FBQ0QsR0FaRDs7QUFjQSxNQUFNYSxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3pCLFFBQUlnQixZQUFZLEdBQUcsS0FBbkI7O0FBQ0EsU0FBSyxJQUFJTCxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxHQUFDLEVBQXpCLEVBQTZCO0FBQzNCLFdBQUssSUFBSUMsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBRyxFQUFwQixFQUF3QkEsRUFBQyxFQUF6QixFQUE2QjtBQUMzQixZQUFJLE9BQU9GLEtBQUssQ0FBQ0MsR0FBRCxDQUFMLENBQVNDLEVBQVQsQ0FBUCxLQUF1QixRQUF2QixJQUFtQ0YsS0FBSyxDQUFDQyxHQUFELENBQUwsQ0FBU0MsRUFBVCxNQUFnQixJQUF2RCxFQUE2RDtBQUMzREksVUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0QsV0FBTyxDQUFDQSxZQUFSO0FBQ0QsR0FWRDs7QUFZQSxTQUFPO0FBQ0wzQixJQUFBQSxTQUFTLEVBQVRBLFNBREs7QUFFTHFCLElBQUFBLEtBQUssRUFBTEEsS0FGSztBQUdMSyxJQUFBQSxhQUFhLEVBQWJBLGFBSEs7QUFJTGYsSUFBQUEsWUFBWSxFQUFaQSxZQUpLO0FBS0xaLElBQUFBLGVBQWUsRUFBZkE7QUFMSyxHQUFQO0FBT0QsQ0EvRE07Ozs7Ozs7Ozs7Ozs7OztBQ0FQOztBQUVBLElBQU05QixNQUFNLEdBQUcsU0FBVEEsTUFBUyxHQUFNO0FBQ25CLFNBQU87QUFDTGtDLElBQUFBLE1BQU0sRUFBRSxnQkFBQ04sQ0FBRCxFQUFJQyxDQUFKLEVBQU84QixTQUFQLEVBQXFCO0FBQzNCLGFBQU9BLFNBQVMsQ0FBQ0YsYUFBVixDQUF3QjdCLENBQXhCLEVBQTJCQyxDQUEzQixDQUFQO0FBQ0Q7QUFISSxHQUFQO0FBS0QsQ0FORDs7QUFRQSxJQUFNNUIsUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBTTtBQUNyQixNQUFNMkQsYUFBYSxHQUFHLEVBQXRCOztBQUNBLE1BQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjO0FBQUEsV0FBTXJDLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsRUFBM0IsQ0FBTjtBQUFBLEdBQXBCOztBQUNBLFNBQU87QUFDTFcsSUFBQUEsWUFBWSxFQUFFLHNCQUFDc0IsU0FBRCxFQUFlO0FBQzNCLFVBQUkvQixDQUFKLEVBQU9DLENBQVAsRUFBVWlDLEdBQVY7O0FBQ0EsU0FBRztBQUNEbEMsUUFBQUEsQ0FBQyxHQUFHaUMsV0FBVyxFQUFmO0FBQ0FoQyxRQUFBQSxDQUFDLEdBQUdnQyxXQUFXLEVBQWY7QUFDQUMsUUFBQUEsR0FBRyxhQUFNbEMsQ0FBTixjQUFXQyxDQUFYLENBQUg7QUFDRCxPQUpELFFBSVMrQixhQUFhLENBQUNHLFFBQWQsQ0FBdUJELEdBQXZCLENBSlQ7O0FBS0FGLE1BQUFBLGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQkYsR0FBbkI7QUFDQSxhQUFPLENBQUNILFNBQVMsQ0FBQ0YsYUFBVixDQUF3QjdCLENBQXhCLEVBQTJCQyxDQUEzQixDQUFELEVBQWdDRCxDQUFoQyxFQUFtQ0MsQ0FBbkMsQ0FBUDtBQUNEO0FBVkksR0FBUDtBQVlELENBZkQ7Ozs7Ozs7Ozs7Ozs7O0FDVk8sSUFBTTFCLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNnRCxNQUFELEVBQVk7QUFDOUIsTUFBSUQsSUFBSSxHQUFHLEVBQVg7O0FBQ0EsT0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixNQUFwQixFQUE0QkUsQ0FBQyxFQUE3QixFQUFpQztBQUMvQkgsSUFBQUEsSUFBSSxDQUFDYyxJQUFMLENBQVUsSUFBVjtBQUNEOztBQUNELE1BQU1DLE9BQU8sR0FBR0MsV0FBVyxFQUEzQjtBQUNBLFNBQU9DLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JILE9BQWxCLEVBQTJCO0FBQUVmLElBQUFBLElBQUksRUFBSkE7QUFBRixHQUEzQixDQUFQO0FBQ0QsQ0FQTTs7QUFTUCxJQUFNZ0IsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN4QjtBQUNBLFdBQVNHLEdBQVQsQ0FBYUMsR0FBYixFQUFrQjtBQUNoQixRQUFJQyxLQUFLLEdBQUcsS0FBWjs7QUFDQSxRQUFJRCxHQUFHLEdBQUcsS0FBS3BCLElBQUwsQ0FBVUMsTUFBaEIsSUFBMEJtQixHQUFHLElBQUksQ0FBckMsRUFBd0M7QUFDdEMsV0FBS3BCLElBQUwsQ0FBVW9CLEdBQVYsSUFBaUIsS0FBakI7QUFDQUMsTUFBQUEsS0FBSyxHQUFHLElBQVI7QUFDRDs7QUFDRCxXQUFPQSxLQUFQO0FBQ0Q7O0FBRUQsV0FBU0MsTUFBVCxHQUFrQjtBQUNoQixXQUFPLEtBQUt0QixJQUFMLENBQVV1QixLQUFWLENBQWdCLFVBQUNDLFFBQUQ7QUFBQSxhQUFjQSxRQUFRLEtBQUssS0FBM0I7QUFBQSxLQUFoQixDQUFQO0FBQ0QsR0FidUIsQ0FleEI7OztBQUNBLFNBQU87QUFDTEwsSUFBQUEsR0FBRyxFQUFIQSxHQURLO0FBRUxHLElBQUFBLE1BQU0sRUFBTkE7QUFGSyxHQUFQO0FBSUQsQ0FwQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVE8sSUFBTXBFLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDeEIsTUFBTXVFLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsSUFBRCxFQUF5QjtBQUM3QyxRQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0gsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBWDs7QUFENkMsc0NBQWZHLFVBQWU7QUFBZkEsTUFBQUEsVUFBZTtBQUFBOztBQUU3QyxTQUFLLElBQUlDLEtBQVQsSUFBa0JELFVBQWxCLEVBQThCO0FBQzVCRixNQUFBQSxFQUFFLENBQUNJLFNBQUgsQ0FBYUMsR0FBYixDQUFpQkgsVUFBVSxDQUFDQyxLQUFELENBQTNCO0FBQ0Q7O0FBQ0QsV0FBT0gsRUFBUDtBQUNELEdBTkQ7O0FBUUEsTUFBTWhFLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDakIsUUFBTXNFLEtBQUssR0FBR1IsYUFBYSxDQUFDLEtBQUQsRUFBUSxZQUFSLENBQTNCO0FBQ0FRLElBQUFBLEtBQUssQ0FBQ0MsV0FBTixHQUFvQixhQUFwQjtBQUVBLFFBQU1DLE1BQU0sR0FBR1YsYUFBYSxDQUFDLEtBQUQsRUFBUSxRQUFSLENBQTVCO0FBQ0FVLElBQUFBLE1BQU0sQ0FBQ0QsV0FBUCxHQUFxQixrQkFBckI7QUFFQSxRQUFNRSxlQUFlLEdBQUdYLGFBQWEsQ0FBQyxLQUFELEVBQVEsa0JBQVIsQ0FBckM7QUFDQSxRQUFNWSxvQkFBb0IsR0FBR1osYUFBYSxDQUFDLEtBQUQsRUFBUSxpQkFBUixDQUExQztBQUNBLFFBQU1hLFVBQVUsR0FBR2IsYUFBYSxDQUFDLEtBQUQsRUFBUSxhQUFSLENBQWhDO0FBQ0EsUUFBTWMsV0FBVyxHQUFHQyxXQUFXLEVBQS9CO0FBQ0FGLElBQUFBLFVBQVUsQ0FBQ0osV0FBWCxHQUF5QixRQUF6QjtBQUNBRyxJQUFBQSxvQkFBb0IsQ0FBQ0ksTUFBckIsQ0FBNEJGLFdBQTVCLEVBQXlDRCxVQUF6QztBQUNBLFFBQU1JLHNCQUFzQixHQUFHakIsYUFBYSxDQUFDLEtBQUQsRUFBUSxpQkFBUixDQUE1QztBQUNBLFFBQU1rQixZQUFZLEdBQUdsQixhQUFhLENBQUMsS0FBRCxFQUFRLGFBQVIsQ0FBbEM7QUFDQSxRQUFNbUIsYUFBYSxHQUFHSixXQUFXLEVBQWpDO0FBQ0FHLElBQUFBLFlBQVksQ0FBQ1QsV0FBYixHQUEyQixVQUEzQjtBQUNBUSxJQUFBQSxzQkFBc0IsQ0FBQ0QsTUFBdkIsQ0FBOEJHLGFBQTlCLEVBQTZDRCxZQUE3QztBQUNBUCxJQUFBQSxlQUFlLENBQUNLLE1BQWhCLENBQXVCSixvQkFBdkIsRUFBNkNLLHNCQUE3QztBQUVBZCxJQUFBQSxRQUFRLENBQUNpQixhQUFULENBQXVCLE1BQXZCLEVBQStCSixNQUEvQixDQUFzQ1IsS0FBdEMsRUFBNkNFLE1BQTdDLEVBQXFEQyxlQUFyRDtBQUNELEdBckJEOztBQXVCQSxNQUFNbEUsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDWSxVQUFELEVBQWdCO0FBQ3hDLFFBQU1vQixLQUFLLEdBQUcwQixRQUFRLENBQUNrQixnQkFBVCxDQUEwQixhQUExQixFQUF5Q2hFLFVBQXpDLENBQWQ7QUFDQW9CLElBQUFBLEtBQUssQ0FBQzZDLFdBQU4sQ0FBa0I3QyxLQUFLLENBQUM4QyxTQUFOLENBQWdCLElBQWhCLENBQWxCO0FBQ0QsR0FIRDs7QUFLQSxNQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDbkUsVUFBRCxFQUFnQjtBQUMvQixRQUFNb0UsSUFBSSxHQUFHdEIsUUFBUSxDQUFDa0IsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBYjtBQUNBLFFBQU1LLFVBQVUsR0FBR3JFLFVBQVUsR0FBRyxHQUFoQztBQUNBLFFBQU1zRSxRQUFRLEdBQUdELFVBQVUsR0FBRyxHQUE5Qjs7QUFDQSxRQUFNRSxTQUFTLEdBQUcsbUJBQUlILElBQUosRUFBVUksS0FBVixDQUFnQkgsVUFBaEIsRUFBNEJDLFFBQTVCLENBQWxCOztBQUNBLFdBQU9DLFNBQVA7QUFDRCxHQU5EOztBQVFBLE1BQU16RixZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDMkYsV0FBRCxFQUFjekUsVUFBZCxFQUE2QjtBQUNoRCxRQUFNb0IsS0FBSyxHQUFHK0MsUUFBUSxDQUFDbkUsVUFBRCxDQUF0QjtBQUVBb0IsSUFBQUEsS0FBSyxDQUFDekIsR0FBTixDQUFVLFVBQUMrRSxNQUFELEVBQVMxQixLQUFULEVBQW1CO0FBQzNCLFVBQU1wRCxDQUFDLEdBQUdvRCxLQUFLLEdBQUcsRUFBbEI7QUFDQSxVQUFNbkQsQ0FBQyxHQUFHTCxJQUFJLENBQUNDLEtBQUwsQ0FBV3VELEtBQUssR0FBRyxFQUFuQixDQUFWOztBQUNBLFVBQUl5QixXQUFXLENBQUNFLGNBQVosQ0FBMkIsY0FBM0IsQ0FBSixFQUFnRDtBQUM5Q0QsUUFBQUEsTUFBTSxDQUFDRSxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxZQUFNO0FBQzFDSCxVQUFBQSxXQUFXLENBQUMxRixZQUFaLENBQXlCYSxDQUF6QixFQUE0QkMsQ0FBNUIsRUFBK0JHLFVBQS9CO0FBQ0QsU0FGRDtBQUdEOztBQUNELFVBQUl5RSxXQUFXLENBQUNFLGNBQVosQ0FBMkIsY0FBM0IsQ0FBSixFQUNFRCxNQUFNLENBQUNFLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQU07QUFDckNILFFBQUFBLFdBQVcsQ0FBQ3hGLFlBQVosQ0FBeUJXLENBQXpCLEVBQTRCQyxDQUE1QixFQUErQkcsVUFBL0I7QUFDRCxPQUZEO0FBR0gsS0FaRDtBQWFELEdBaEJEOztBQWtCQSxNQUFNMEQsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN4QixRQUFJdEMsS0FBSyxHQUFHdUIsYUFBYSxDQUFDLEtBQUQsRUFBUSxZQUFSLENBQXpCOztBQUNBLFNBQUssSUFBSXRCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0JBLENBQUMsRUFBekIsRUFBNkI7QUFDM0IsVUFBTXdELEdBQUcsR0FBR2xDLGFBQWEsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUF6Qjs7QUFDQSxXQUFLLElBQUlyQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQzNCLFlBQU1vRCxNQUFNLEdBQUcvQixhQUFhLENBQUMsS0FBRCxFQUFRLFFBQVIsQ0FBNUI7QUFDQStCLFFBQUFBLE1BQU0sQ0FBQ3RCLFdBQVAsYUFBd0I5QixDQUF4QixlQUE4QkQsQ0FBOUI7QUFDQXdELFFBQUFBLEdBQUcsQ0FBQ2xCLE1BQUosQ0FBV2UsTUFBWDtBQUNEOztBQUNEdEQsTUFBQUEsS0FBSyxDQUFDdUMsTUFBTixDQUFha0IsR0FBYjtBQUNEOztBQUNELFdBQU96RCxLQUFQO0FBQ0QsR0FaRDs7QUFjQSxNQUFNSCxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNFLE1BQUQsRUFBU3ZCLENBQVQsRUFBWUMsQ0FBWixFQUFlaUYsSUFBZixFQUFxQjlFLFVBQXJCLEVBQW9DO0FBQ3hELFFBQUkrRSxTQUFTLEdBQUdELElBQUksR0FBRyxlQUFILEdBQXFCLE1BQXpDOztBQUNBLFNBQUssSUFBSXpELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLE1BQXBCLEVBQTRCRSxDQUFDLEVBQTdCLEVBQWlDO0FBQy9CLFVBQU1xRCxNQUFNLEdBQUdNLFNBQVMsQ0FBQ3BGLENBQUMsR0FBR3lCLENBQUwsRUFBUXhCLENBQVIsRUFBV0csVUFBWCxDQUF4QjtBQUNBMEUsTUFBQUEsTUFBTSxDQUFDekIsU0FBUCxDQUFpQkMsR0FBakIsQ0FBcUI2QixTQUFyQjtBQUNEO0FBQ0YsR0FORDs7QUFRQSxNQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDcEYsQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsRUFBc0I7QUFDdEMsUUFBTTZFLEdBQUcsR0FBRy9CLFFBQVEsQ0FBQ2tCLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDbkUsQ0FBQyxHQUFHRyxVQUFVLEdBQUcsRUFBbkQsQ0FBWjtBQUNBLFdBQU82RSxHQUFHLENBQUNJLFVBQUosQ0FBZXJGLENBQWYsQ0FBUDtBQUNELEdBSEQ7O0FBS0EsTUFBTU8sT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBQ1AsQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsRUFBc0I7QUFDcEMsUUFBTTBFLE1BQU0sR0FBR00sU0FBUyxDQUFDcEYsQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsQ0FBeEI7QUFDQTBFLElBQUFBLE1BQU0sQ0FBQ1QsV0FBUCxDQUFtQlMsTUFBTSxDQUFDUixTQUFQLENBQWlCLEtBQWpCLENBQW5CO0FBQ0QsR0FIRDs7QUFLQSxNQUFNbEQsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixHQUFNO0FBQ2hDLFFBQU1rRSxjQUFjLEdBQUdwQyxRQUFRLENBQUNrQixnQkFBVCxDQUEwQixnQkFBMUIsQ0FBdkI7O0FBQ0EsdUJBQUlrQixjQUFKLEVBQW9CdkYsR0FBcEIsQ0FBd0IsVUFBQ3dGLFlBQUQ7QUFBQSxhQUN0QkEsWUFBWSxDQUFDbEMsU0FBYixDQUF1Qm1DLE1BQXZCLENBQThCLGVBQTlCLENBRHNCO0FBQUEsS0FBeEI7QUFHRCxHQUxEOztBQU9BLE1BQU1oRixLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDUixDQUFELEVBQUlDLENBQUosRUFBT0csVUFBUCxFQUFtQnFGLE1BQW5CLEVBQThCO0FBQzFDLFFBQU1YLE1BQU0sR0FBR00sU0FBUyxDQUFDcEYsQ0FBRCxFQUFJQyxDQUFKLEVBQU9HLFVBQVAsQ0FBeEI7QUFDQSxRQUFNK0UsU0FBUyxHQUFHTSxNQUFNLEdBQUcsS0FBSCxHQUFXLE1BQW5DO0FBQ0FYLElBQUFBLE1BQU0sQ0FBQ3pCLFNBQVAsQ0FBaUJDLEdBQWpCLENBQXFCNkIsU0FBckI7QUFDRCxHQUpEOztBQU1BLFNBQU87QUFDTGxHLElBQUFBLElBQUksRUFBSkEsSUFESztBQUVMb0MsSUFBQUEsYUFBYSxFQUFiQSxhQUZLO0FBR0xuQyxJQUFBQSxZQUFZLEVBQVpBLFlBSEs7QUFJTE0sSUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFKSztBQUtMNEIsSUFBQUEsbUJBQW1CLEVBQW5CQSxtQkFMSztBQU1MYixJQUFBQSxPQUFPLEVBQVBBLE9BTks7QUFPTEMsSUFBQUEsS0FBSyxFQUFMQTtBQVBLLEdBQVA7QUFTRCxDQXJITTs7Ozs7O1VDQVA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTWtGLFVBQVUsR0FBR3ZILDJDQUFJLENBQUNDLDJDQUFELEVBQVNDLDZDQUFULEVBQW1CQyxpREFBbkIsRUFBOEJDLHVDQUE5QixFQUFvQ0MsdUNBQXBDLENBQXZCO0FBQ0FrSCxVQUFVLENBQUN6RyxJQUFYLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2FtZSA9IChwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpID0+IHtcbiAgbGV0IHBsYXllclR1cmYsXG4gICAgY29tcHV0ZXJUdXJmLFxuICAgIHBsYXllckEsXG4gICAgY29tcHV0ZXJBSSxcbiAgICBwbGF5ZXJTaGlwcyxcbiAgICBjb21wdXRlclNoaXBzLFxuICAgIGFwcFZpZXc7XG5cbiAgbGV0IHNoaXBQb2ludGVyID0gMDtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHBsYXllclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlclR1cmYgPSBnYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXJBID0gcGxheWVyKCk7XG4gICAgY29tcHV0ZXJBSSA9IGNvbXB1dGVyKCk7XG4gICAgcGxheWVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgY29tcHV0ZXJTaGlwcyA9IFtzaGlwKDIpLCBzaGlwKDMpLCBzaGlwKDMpLCBzaGlwKDQpLCBzaGlwKDUpXTtcbiAgICBhcHBWaWV3ID0gdmlldygpO1xuICAgIGFwcFZpZXcuaW5pdCgpO1xuICAgIGFwcFZpZXcuYmluZEhhbmRsZXJzKFxuICAgICAgeyBob3ZlckhhbmRsZXI6IGhhbmRsZUNoZWNrUGxhY2VtZW50LCBjbGlja0hhbmRsZXI6IGhhbmRsZVBsYWNlbWVudCB9LFxuICAgICAgMFxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgYmVnaW5HYW1lID0gKCkgPT4ge1xuICAgIGFwcFZpZXcucmVtb3ZlQWxsSGFuZGxlcnMoMCk7XG4gICAgcG9wdWxhdGVDb21wdXRlclR1cmYoKTtcbiAgICBhcHBWaWV3LmJpbmRIYW5kbGVycyh7IGNsaWNrSGFuZGxlcjogaGFuZGxlQXR0YWNrIH0sIDEpO1xuICAgIC8vIGFwcFZpZXcuc3RhcnRHYW1lKCk7XG4gIH07XG5cbiAgY29uc3QgcG9wdWxhdGVDb21wdXRlclR1cmYgPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tSW50ID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9O1xuICAgIGNvbXB1dGVyU2hpcHMubWFwKChzaGlwKSA9PiB7XG4gICAgICBsZXQgeCwgeTtcbiAgICAgIGRvIHtcbiAgICAgICAgeCA9IHJhbmRvbUludCgpO1xuICAgICAgICB5ID0gcmFuZG9tSW50KCk7XG4gICAgICB9IHdoaWxlICghY29tcHV0ZXJUdXJmLmlzVmFsaWRQb3NpdGlvbihzaGlwLCB4LCB5KSk7XG4gICAgICBjb21wdXRlclR1cmYucGxhY2VTaGlwKHNoaXAsIHgsIHkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUF0dGFjayA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgcGxheWVyRGlkSGl0ID0gcGxheWVyQS5hdHRhY2soeCwgeSwgY29tcHV0ZXJUdXJmKTtcbiAgICBhcHBWaWV3LmRpc2FibGUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgYXBwVmlldy5wYWludCh4LCB5LCBib2FyZEluZGV4LCBwbGF5ZXJEaWRIaXQpO1xuICAgIGNvbnN0IFtjb21wdXRlckRpZEhpdCwgY29tcHV0ZXJBdHRhY2tYLCBjb21wdXRlckF0dGFja1ldID1cbiAgICAgIGNvbXB1dGVyQUkucmFuZG9tQXR0YWNrKHBsYXllclR1cmYpO1xuICAgIGNvbnN0IHBsYXllckJvYXJkSW5kZXggPSAwO1xuICAgIGFwcFZpZXcucGFpbnQoXG4gICAgICBjb21wdXRlckF0dGFja1gsXG4gICAgICBjb21wdXRlckF0dGFja1ksXG4gICAgICBwbGF5ZXJCb2FyZEluZGV4LFxuICAgICAgY29tcHV0ZXJEaWRIaXRcbiAgICApO1xuICAgIGlmIChjb21wdXRlclR1cmYuY2hlY2tIYXNMb3N0KCkgfHwgcGxheWVyVHVyZi5jaGVja0hhc0xvc3QoKSkge1xuICAgICAgaGFuZGxlR2FtZU92ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR2FtZU92ZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2lubmVyID0gY29tcHV0ZXJUdXJmLmNoZWNrSGFzTG9zdCgpID8gJ1lvdSB3aW4hJyA6ICdZb3UgbG9zZSc7XG4gICAgY29uc29sZS5sb2cod2lubmVyKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDaGVja1BsYWNlbWVudCA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBwbGF5ZXJTaGlwc1tzaGlwUG9pbnRlcl07XG4gICAgYXBwVmlldy5jbGVhclByZXZIaWdobGlnaHRzKCk7XG4gICAgaWYgKHBsYXllclR1cmYuaXNWYWxpZFBvc2l0aW9uKGN1cnJlbnRTaGlwLCB4LCB5KSkge1xuICAgICAgYXBwVmlldy5oaWdobGlnaHRTaGlwKGN1cnJlbnRTaGlwLmJvZHkubGVuZ3RoLCB4LCB5LCB0cnVlLCBib2FyZEluZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50ID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICBhcHBWaWV3LmNsZWFyUHJldkhpZ2hsaWdodHMoKTtcbiAgICAgIGFwcFZpZXcuaGlnaGxpZ2h0U2hpcChjdXJyZW50U2hpcC5ib2R5Lmxlbmd0aCwgeCwgeSwgZmFsc2UsIGJvYXJkSW5kZXgpO1xuICAgICAgcGxheWVyVHVyZi5wbGFjZVNoaXAoY3VycmVudFNoaXAsIHgsIHkpO1xuICAgICAgc2hpcFBvaW50ZXIgKz0gMTtcbiAgICB9XG4gICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBsZXQgaXNBbHJlYWR5T2NjdXBpZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNPdXRPZkJvdW5kcyA9IHNoaXAuYm9keS5sZW5ndGggKyB4ID4gMTA7XG4gICAgaWYgKCFpc091dE9mQm91bmRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNBbHJlYWR5T2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhaXNBbHJlYWR5T2NjdXBpZWQgJiYgIWlzT3V0T2ZCb3VuZHM7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzTG9zdCA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNQcmVzZW50ID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFtpXVtqXSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbaV1bal0gIT09IG51bGwpIHtcbiAgICAgICAgICBzaGlwc1ByZXNlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhc2hpcHNQcmVzZW50O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwLFxuICAgIGJvYXJkLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tIYXNMb3N0LFxuICAgIGlzVmFsaWRQb3NpdGlvbixcbiAgfTtcbn07XG4iLCJleHBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH07XG5cbmNvbnN0IHBsYXllciA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2s6ICh4LCB5LCBnYW1lQm9hcmQpID0+IHtcbiAgICAgIHJldHVybiBnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFscmVhZHlQbGF5ZWQgPSBbXTtcbiAgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIHJldHVybiB7XG4gICAgcmFuZG9tQXR0YWNrOiAoZ2FtZUJvYXJkKSA9PiB7XG4gICAgICBsZXQgeCwgeSwga2V5O1xuICAgICAgZG8ge1xuICAgICAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAgeSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgICAgIGtleSA9IGAke3h9ICR7eX1gO1xuICAgICAgfSB3aGlsZSAoYWxyZWFkeVBsYXllZC5pbmNsdWRlcyhrZXkpKTtcbiAgICAgIGFscmVhZHlQbGF5ZWQucHVzaChrZXkpO1xuICAgICAgcmV0dXJuIFtnYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KSwgeCwgeV07XG4gICAgfSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJvZHkucHVzaChudWxsKTtcbiAgfVxuICBjb25zdCBtZXRob2RzID0gc2hpcE1ldGhvZHMoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHsgYm9keSB9KTtcbn07XG5cbmNvbnN0IHNoaXBNZXRob2RzID0gKCkgPT4ge1xuICAvL2lucHV0OiBpbmRleCBvZiBib2R5XG4gIGZ1bmN0aW9uIGhpdChwb3MpIHtcbiAgICBsZXQgaXNIaXQgPSBmYWxzZTtcbiAgICBpZiAocG9zIDwgdGhpcy5ib2R5Lmxlbmd0aCAmJiBwb3MgPj0gMCkge1xuICAgICAgdGhpcy5ib2R5W3Bvc10gPSAnaGl0JztcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkuZXZlcnkoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbiA9PT0gJ2hpdCcpO1xuICB9XG5cbiAgLy9vdXRwdXQ6IGJvb2xlYW5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCB2aWV3ID0gKCkgPT4ge1xuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIC4uLmNsYXNzTmFtZXMpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3NOYW1lcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2dhbWUtdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQUyc7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSAnUGxheWVyJztcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmQsIHBsYXllck5hbWUpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyJztcbiAgICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckJvYXJkLCBjb21wdXRlck5hbWUpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZCh0aXRsZSwgc3RhdHVzLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUFsbEhhbmRsZXJzID0gKGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib2FyZC1ncmlkJylbYm9hcmRJbmRleF07XG4gICAgYm9hcmQucmVwbGFjZVdpdGgoYm9hcmQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfTtcblxuICBjb25zdCBnZXRCb2FyZCA9IChib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcbiAgICBjb25zdCBpbmRleFN0YXJ0ID0gYm9hcmRJbmRleCAqIDEwMDtcbiAgICBjb25zdCBpbmRleEVuZCA9IGluZGV4U3RhcnQgKyAxMDA7XG4gICAgY29uc3QgYm9hcmRHcmlkID0gWy4uLmdyaWRdLnNsaWNlKGluZGV4U3RhcnQsIGluZGV4RW5kKTtcbiAgICByZXR1cm4gYm9hcmRHcmlkO1xuICB9O1xuXG4gIGNvbnN0IGJpbmRIYW5kbGVycyA9IChoYW5kbGVyc09iaiwgYm9hcmRJbmRleCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZ2V0Qm9hcmQoYm9hcmRJbmRleCk7XG5cbiAgICBib2FyZC5tYXAoKHNxdWFyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHggPSBpbmRleCAlIDEwO1xuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoaW5kZXggLyAxMCk7XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2hvdmVySGFuZGxlcicpKSB7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXJzT2JqLmhvdmVySGFuZGxlcih4LCB5LCBib2FyZEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoaGFuZGxlcnNPYmouaGFzT3duUHJvcGVydHkoJ2NsaWNrSGFuZGxlcicpKVxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaGFuZGxlcnNPYmouY2xpY2tIYW5kbGVyKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcbiAgICBsZXQgYm9hcmQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3JvdycpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzcXVhcmUnKTtcbiAgICAgICAgc3F1YXJlLnRleHRDb250ZW50ID0gYCR7an0sICR7aX1gO1xuICAgICAgICByb3cuYXBwZW5kKHNxdWFyZSk7XG4gICAgICB9XG4gICAgICBib2FyZC5hcHBlbmQocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9O1xuXG4gIGNvbnN0IGhpZ2hsaWdodFNoaXAgPSAobGVuZ3RoLCB4LCB5LCB0ZW1wLCBib2FyZEluZGV4KSA9PiB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRlbXAgPyAnc2hpcC1wb3NzaWJsZScgOiAnc2hpcCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHggKyBpLCB5LCBib2FyZEluZGV4KTtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFNxdWFyZSA9ICh4LCB5LCBib2FyZEluZGV4KSA9PiB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdycpW3kgKyBib2FyZEluZGV4ICogMTBdO1xuICAgIHJldHVybiByb3cuY2hpbGROb2Rlc1t4XTtcbiAgfTtcblxuICBjb25zdCBkaXNhYmxlID0gKHgsIHksIGJvYXJkSW5kZXgpID0+IHtcbiAgICBjb25zdCBzcXVhcmUgPSBnZXRTcXVhcmUoeCwgeSwgYm9hcmRJbmRleCk7XG4gICAgc3F1YXJlLnJlcGxhY2VXaXRoKHNxdWFyZS5jbG9uZU5vZGUoZmFsc2UpKTtcbiAgfTtcblxuICBjb25zdCBjbGVhclByZXZIaWdobGlnaHRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHByZXZIaWdobGlnaHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAtcG9zc2libGUnKTtcbiAgICBbLi4ucHJldkhpZ2hsaWdodHNdLm1hcCgocG9zc2libGVTaGlwKSA9PlxuICAgICAgcG9zc2libGVTaGlwLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAtcG9zc2libGUnKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgcGFpbnQgPSAoeCwgeSwgYm9hcmRJbmRleCwgZGlkSGl0KSA9PiB7XG4gICAgY29uc3Qgc3F1YXJlID0gZ2V0U3F1YXJlKHgsIHksIGJvYXJkSW5kZXgpO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGRpZEhpdCA/ICdoaXQnIDogJ21pc3MnO1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGhpZ2hsaWdodFNoaXAsXG4gICAgYmluZEhhbmRsZXJzLFxuICAgIHJlbW92ZUFsbEhhbmRsZXJzLFxuICAgIGNsZWFyUHJldkhpZ2hsaWdodHMsXG4gICAgZGlzYWJsZSxcbiAgICBwYWludCxcbiAgfTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWUgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgcGxheWVyLCBjb21wdXRlciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGJhdHRsZXNoaXAgPSBnYW1lKHBsYXllciwgY29tcHV0ZXIsIGdhbWVib2FyZCwgc2hpcCwgdmlldyk7XG5iYXR0bGVzaGlwLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJnYW1lIiwicGxheWVyIiwiY29tcHV0ZXIiLCJnYW1lYm9hcmQiLCJzaGlwIiwidmlldyIsInBsYXllclR1cmYiLCJjb21wdXRlclR1cmYiLCJwbGF5ZXJBIiwiY29tcHV0ZXJBSSIsInBsYXllclNoaXBzIiwiY29tcHV0ZXJTaGlwcyIsImFwcFZpZXciLCJzaGlwUG9pbnRlciIsImluaXQiLCJiaW5kSGFuZGxlcnMiLCJob3ZlckhhbmRsZXIiLCJoYW5kbGVDaGVja1BsYWNlbWVudCIsImNsaWNrSGFuZGxlciIsImhhbmRsZVBsYWNlbWVudCIsImJlZ2luR2FtZSIsInJlbW92ZUFsbEhhbmRsZXJzIiwicG9wdWxhdGVDb21wdXRlclR1cmYiLCJoYW5kbGVBdHRhY2siLCJyYW5kb21JbnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtYXAiLCJ4IiwieSIsImlzVmFsaWRQb3NpdGlvbiIsInBsYWNlU2hpcCIsImJvYXJkSW5kZXgiLCJwbGF5ZXJEaWRIaXQiLCJhdHRhY2siLCJkaXNhYmxlIiwicGFpbnQiLCJyYW5kb21BdHRhY2siLCJjb21wdXRlckRpZEhpdCIsImNvbXB1dGVyQXR0YWNrWCIsImNvbXB1dGVyQXR0YWNrWSIsInBsYXllckJvYXJkSW5kZXgiLCJjaGVja0hhc0xvc3QiLCJoYW5kbGVHYW1lT3ZlciIsIndpbm5lciIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50U2hpcCIsImNsZWFyUHJldkhpZ2hsaWdodHMiLCJoaWdobGlnaHRTaGlwIiwiYm9keSIsImxlbmd0aCIsImJvYXJkIiwiaSIsImoiLCJpc0FscmVhZHlPY2N1cGllZCIsImlzT3V0T2ZCb3VuZHMiLCJyZWNlaXZlQXR0YWNrIiwic2hpcHNQcmVzZW50IiwiZ2FtZUJvYXJkIiwiYWxyZWFkeVBsYXllZCIsInJhbmRvbUNvb3JkIiwia2V5IiwiaW5jbHVkZXMiLCJwdXNoIiwibWV0aG9kcyIsInNoaXBNZXRob2RzIiwiT2JqZWN0IiwiYXNzaWduIiwiaGl0IiwicG9zIiwiaXNIaXQiLCJpc1N1bmsiLCJldmVyeSIsInBvc2l0aW9uIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJlbCIsImRvY3VtZW50IiwiY2xhc3NOYW1lcyIsImluZGV4IiwiY2xhc3NMaXN0IiwiYWRkIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsInN0YXR1cyIsImJvYXJkc0NvbnRhaW5lciIsInBsYXllckJvYXJkQ29udGFpbmVyIiwicGxheWVyTmFtZSIsInBsYXllckJvYXJkIiwiY3JlYXRlQm9hcmQiLCJhcHBlbmQiLCJjb21wdXRlckJvYXJkQ29udGFpbmVyIiwiY29tcHV0ZXJOYW1lIiwiY29tcHV0ZXJCb2FyZCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVwbGFjZVdpdGgiLCJjbG9uZU5vZGUiLCJnZXRCb2FyZCIsImdyaWQiLCJpbmRleFN0YXJ0IiwiaW5kZXhFbmQiLCJib2FyZEdyaWQiLCJzbGljZSIsImhhbmRsZXJzT2JqIiwic3F1YXJlIiwiaGFzT3duUHJvcGVydHkiLCJhZGRFdmVudExpc3RlbmVyIiwicm93IiwidGVtcCIsImNsYXNzTmFtZSIsImdldFNxdWFyZSIsImNoaWxkTm9kZXMiLCJwcmV2SGlnaGxpZ2h0cyIsInBvc3NpYmxlU2hpcCIsInJlbW92ZSIsImRpZEhpdCIsImJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9