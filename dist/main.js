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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLElBQU1BLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNDLE1BQUQsRUFBU0MsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEJDLElBQTlCLEVBQW9DQyxJQUFwQyxFQUE2QztBQUMvRCxNQUFJQyxVQUFKLEVBQ0VDLFlBREYsRUFFRUMsT0FGRixFQUdFQyxVQUhGLEVBSUVDLFdBSkYsRUFLRUMsYUFMRixFQU1FQyxPQU5GO0FBUUEsTUFBSUMsV0FBVyxHQUFHLENBQWxCOztBQUVBLE1BQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDakJSLElBQUFBLFVBQVUsR0FBR0gsU0FBUyxFQUF0QjtBQUNBSSxJQUFBQSxZQUFZLEdBQUdKLFNBQVMsRUFBeEI7QUFDQUssSUFBQUEsT0FBTyxHQUFHUCxNQUFNLEVBQWhCO0FBQ0FRLElBQUFBLFVBQVUsR0FBR1AsUUFBUSxFQUFyQjtBQUNBUSxJQUFBQSxXQUFXLEdBQUcsQ0FBQ04sSUFBSSxDQUFDLENBQUQsQ0FBTCxFQUFVQSxJQUFJLENBQUMsQ0FBRCxDQUFkLEVBQW1CQSxJQUFJLENBQUMsQ0FBRCxDQUF2QixFQUE0QkEsSUFBSSxDQUFDLENBQUQsQ0FBaEMsRUFBcUNBLElBQUksQ0FBQyxDQUFELENBQXpDLENBQWQ7QUFDQU8sSUFBQUEsYUFBYSxHQUFHLENBQUNQLElBQUksQ0FBQyxDQUFELENBQUwsRUFBVUEsSUFBSSxDQUFDLENBQUQsQ0FBZCxFQUFtQkEsSUFBSSxDQUFDLENBQUQsQ0FBdkIsRUFBNEJBLElBQUksQ0FBQyxDQUFELENBQWhDLEVBQXFDQSxJQUFJLENBQUMsQ0FBRCxDQUF6QyxDQUFoQjtBQUNBUSxJQUFBQSxPQUFPLEdBQUdQLElBQUksRUFBZDtBQUNBTyxJQUFBQSxPQUFPLENBQUNHLFdBQVIsQ0FBb0I7QUFBRUMsTUFBQUEsZUFBZSxFQUFmQTtBQUFGLEtBQXBCO0FBQ0FKLElBQUFBLE9BQU8sQ0FBQ0UsSUFBUjtBQUNELEdBVkQ7O0FBWUEsTUFBTUcsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtBQUN0QkwsSUFBQUEsT0FBTyxDQUFDRyxXQUFSLENBQW9CO0FBQUVHLE1BQUFBLFlBQVksRUFBWkE7QUFBRixLQUFwQjtBQUNBTixJQUFBQSxPQUFPLENBQUNPLFNBQVI7QUFDRCxHQUhEOztBQUtBLE1BQU1ELFlBQVksR0FBRyxTQUFmQSxZQUFlLEdBQU0sQ0FBRSxDQUE3Qjs7QUFFQSxNQUFNRixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNJLENBQUQsRUFBSUMsQ0FBSixFQUFPQyxJQUFQLEVBQWdCO0FBQ3RDLFFBQU1DLFdBQVcsR0FBR2IsV0FBVyxDQUFDRyxXQUFELENBQS9COztBQUNBLFFBQUlQLFVBQVUsQ0FBQ2tCLGVBQVgsQ0FBMkJELFdBQTNCLEVBQXdDSCxDQUF4QyxFQUEyQ0MsQ0FBM0MsQ0FBSixFQUFtRDtBQUNqRFQsTUFBQUEsT0FBTyxDQUFDYSxhQUFSLENBQXNCRixXQUFXLENBQUNHLElBQVosQ0FBaUJDLE1BQXZDLEVBQStDUCxDQUEvQyxFQUFrREMsQ0FBbEQsRUFBcURDLElBQXJEOztBQUNBLFVBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1RoQixRQUFBQSxVQUFVLENBQUNzQixTQUFYLENBQXFCTCxXQUFyQixFQUFrQ0gsQ0FBbEMsRUFBcUNDLENBQXJDO0FBQ0FSLFFBQUFBLFdBQVcsSUFBSSxDQUFmO0FBQ0Q7QUFDRjs7QUFDRCxRQUFJQSxXQUFXLEtBQUtILFdBQVcsQ0FBQ2lCLE1BQWhDLEVBQXdDVixTQUFTO0FBQ2xELEdBVkQ7O0FBWUEsU0FBTztBQUNMSCxJQUFBQSxJQUFJLEVBQUpBO0FBREssR0FBUDtBQUdELENBN0NNOzs7Ozs7Ozs7Ozs7OztBQ0FBLElBQU1YLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFDN0IsTUFBTTBCLEtBQUssR0FBRyxFQUFkLENBRDZCLENBRTdCOztBQUNBLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUMzQkQsSUFBQUEsS0FBSyxDQUFDQyxDQUFELENBQUwsR0FBVyxFQUFYLENBRDJCLENBRTNCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUMzQkYsTUFBQUEsS0FBSyxDQUFDQyxDQUFELENBQUwsQ0FBU0MsQ0FBVCxJQUFjLElBQWQ7QUFDRDtBQUNGOztBQUVELE1BQU1ILFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUN4QixJQUFELEVBQU9nQixDQUFQLEVBQVVDLENBQVYsRUFBZ0I7QUFDaEMsU0FBSyxJQUFJUyxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHMUIsSUFBSSxDQUFDc0IsSUFBTCxDQUFVQyxNQUE5QixFQUFzQ0csRUFBQyxFQUF2QyxFQUEyQztBQUN6Q0QsTUFBQUEsS0FBSyxDQUFDVCxDQUFDLEdBQUdVLEVBQUwsQ0FBTCxDQUFhVCxDQUFiLElBQWtCakIsSUFBbEI7QUFDRDtBQUNGLEdBSkQ7O0FBTUEsTUFBTW9CLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ3BCLElBQUQsRUFBT2dCLENBQVAsRUFBVUMsQ0FBVixFQUFnQjtBQUN0QyxRQUFJVyxpQkFBaUIsR0FBRyxLQUF4QjtBQUNBLFFBQUlDLGFBQWEsR0FBRzdCLElBQUksQ0FBQ3NCLElBQUwsQ0FBVUMsTUFBVixHQUFtQlAsQ0FBbkIsR0FBdUIsRUFBM0M7O0FBQ0EsUUFBSSxDQUFDYSxhQUFMLEVBQW9CO0FBQ2xCLFdBQUssSUFBSUgsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBRzFCLElBQUksQ0FBQ3NCLElBQUwsQ0FBVUMsTUFBOUIsRUFBc0NHLEdBQUMsRUFBdkMsRUFBMkM7QUFDekMsWUFBSUQsS0FBSyxDQUFDVCxDQUFDLEdBQUdVLEdBQUwsQ0FBTCxDQUFhVCxDQUFiLE1BQW9CLElBQXhCLEVBQThCO0FBQzVCVyxVQUFBQSxpQkFBaUIsR0FBRyxJQUFwQjtBQUNEO0FBQ0Y7QUFDRjs7QUFDRCxXQUFPLENBQUNBLGlCQUFELElBQXNCLENBQUNDLGFBQTlCO0FBQ0QsR0FYRDs7QUFhQSxNQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNkLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQzlCLFFBQUksT0FBT1EsS0FBSyxDQUFDVCxDQUFELENBQUwsQ0FBU0MsQ0FBVCxDQUFQLEtBQXVCLFFBQXZCLElBQW1DUSxLQUFLLENBQUNULENBQUQsQ0FBTCxDQUFTQyxDQUFULE1BQWdCLElBQXZELEVBQTZEO0FBQzNELFVBQU1qQixJQUFJLEdBQUd5QixLQUFLLENBQUNULENBQUQsQ0FBTCxDQUFTQyxDQUFULENBQWI7O0FBQ0EsV0FBSyxJQUFJUyxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxHQUFDLEVBQXpCLEVBQTZCO0FBQzNCLFlBQUlELEtBQUssQ0FBQ0MsR0FBRCxDQUFMLENBQVNULENBQVQsTUFBZ0JqQixJQUFwQixFQUEwQjtBQUN4QnlCLFVBQUFBLEtBQUssQ0FBQ1QsQ0FBRCxDQUFMLENBQVNDLENBQVQsSUFBYyxLQUFkO0FBQ0EsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRjs7QUFDRFEsSUFBQUEsS0FBSyxDQUFDVCxDQUFELENBQUwsQ0FBU0MsQ0FBVCxJQUFjLFFBQWQ7QUFDQSxXQUFPLEtBQVA7QUFDRCxHQVpEOztBQWNBLE1BQU1jLFdBQVcsR0FBRyxTQUFkQSxXQUFjLEdBQU07QUFDeEIsUUFBSUMsWUFBWSxHQUFHLEtBQW5COztBQUNBLFNBQUssSUFBSU4sR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBRyxFQUFwQixFQUF3QkEsR0FBQyxFQUF6QixFQUE2QjtBQUMzQixXQUFLLElBQUlDLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsRUFBcEIsRUFBd0JBLEVBQUMsRUFBekIsRUFBNkI7QUFDM0IsWUFBSSxPQUFPRixLQUFLLENBQUNDLEdBQUQsQ0FBTCxDQUFTQyxFQUFULENBQVAsS0FBdUIsUUFBdkIsSUFBbUNGLEtBQUssQ0FBQ0MsR0FBRCxDQUFMLENBQVNDLEVBQVQsTUFBZ0IsSUFBdkQsRUFBNkQ7QUFDM0RLLFVBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0Q7QUFDRjtBQUNGOztBQUNELFdBQU8sQ0FBQ0EsWUFBUjtBQUNELEdBVkQ7O0FBWUEsU0FBTztBQUNMUixJQUFBQSxTQUFTLEVBQVRBLFNBREs7QUFFTEMsSUFBQUEsS0FBSyxFQUFMQSxLQUZLO0FBR0xLLElBQUFBLGFBQWEsRUFBYkEsYUFISztBQUlMQyxJQUFBQSxXQUFXLEVBQVhBLFdBSks7QUFLTFgsSUFBQUEsZUFBZSxFQUFmQTtBQUxLLEdBQVA7QUFPRCxDQS9ETTs7Ozs7Ozs7Ozs7Ozs7O0FDQVA7O0FBRUEsSUFBTXZCLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNvQyxJQUFELEVBQVU7QUFDdkIsU0FBTztBQUNMQyxJQUFBQSxNQUFNLEVBQUUsZ0JBQUNsQixDQUFELEVBQUlDLENBQUosRUFBT2tCLFNBQVAsRUFBcUI7QUFDM0IsYUFBT0EsU0FBUyxDQUFDTCxhQUFWLENBQXdCZCxDQUF4QixFQUEyQkMsQ0FBM0IsQ0FBUDtBQUNEO0FBSEksR0FBUDtBQUtELENBTkQ7O0FBUUEsSUFBTW5CLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQU07QUFDckIsTUFBTXNDLGFBQWEsR0FBRyxFQUF0Qjs7QUFDQSxNQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLFdBQU1DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsRUFBM0IsQ0FBTjtBQUFBLEdBQXBCOztBQUNBLFNBQU87QUFDTEMsSUFBQUEsWUFBWSxFQUFFLHNCQUFDTixTQUFELEVBQWU7QUFDM0IsVUFBSW5CLENBQUosRUFBT0MsQ0FBUCxFQUFVeUIsR0FBVjs7QUFDQSxTQUFHO0FBQ0QxQixRQUFBQSxDQUFDLEdBQUdxQixXQUFXLEVBQWY7QUFDQXBCLFFBQUFBLENBQUMsR0FBR29CLFdBQVcsRUFBZjtBQUNBSyxRQUFBQSxHQUFHLGFBQU0xQixDQUFOLGNBQVdDLENBQVgsQ0FBSDtBQUNELE9BSkQsUUFJU21CLGFBQWEsQ0FBQ08sUUFBZCxDQUF1QkQsR0FBdkIsQ0FKVDs7QUFLQU4sTUFBQUEsYUFBYSxDQUFDUSxJQUFkLENBQW1CRixHQUFuQjtBQUNBLGFBQU9QLFNBQVMsQ0FBQ0wsYUFBVixDQUF3QmQsQ0FBeEIsRUFBMkJDLENBQTNCLENBQVA7QUFDRDtBQVZJLEdBQVA7QUFZRCxDQWZEOzs7Ozs7Ozs7Ozs7OztBQ1ZPLElBQU1qQixJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDdUIsTUFBRCxFQUFZO0FBQzlCLE1BQUlELElBQUksR0FBRyxFQUFYOztBQUNBLE9BQUssSUFBSUksQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsTUFBcEIsRUFBNEJHLENBQUMsRUFBN0IsRUFBaUM7QUFDL0JKLElBQUFBLElBQUksQ0FBQ3NCLElBQUwsQ0FBVSxJQUFWO0FBQ0Q7O0FBQ0QsTUFBTUMsT0FBTyxHQUFHQyxXQUFXLEVBQTNCO0FBQ0EsU0FBT0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkgsT0FBbEIsRUFBMkI7QUFBRXZCLElBQUFBLElBQUksRUFBSkE7QUFBRixHQUEzQixDQUFQO0FBQ0QsQ0FQTTs7QUFTUCxJQUFNd0IsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN4QjtBQUNBLFdBQVNHLEdBQVQsQ0FBYUMsR0FBYixFQUFrQjtBQUNoQixRQUFJQyxLQUFLLEdBQUcsS0FBWjs7QUFDQSxRQUFJRCxHQUFHLEdBQUcsS0FBSzVCLElBQUwsQ0FBVUMsTUFBaEIsSUFBMEIyQixHQUFHLElBQUksQ0FBckMsRUFBd0M7QUFDdEMsV0FBSzVCLElBQUwsQ0FBVTRCLEdBQVYsSUFBaUIsS0FBakI7QUFDQUMsTUFBQUEsS0FBSyxHQUFHLElBQVI7QUFDRDs7QUFDRCxXQUFPQSxLQUFQO0FBQ0Q7O0FBRUQsV0FBU0MsTUFBVCxHQUFrQjtBQUNoQixXQUFPLEtBQUs5QixJQUFMLENBQVUrQixLQUFWLENBQWdCLFVBQUNDLFFBQUQ7QUFBQSxhQUFjQSxRQUFRLEtBQUssS0FBM0I7QUFBQSxLQUFoQixDQUFQO0FBQ0QsR0FidUIsQ0FleEI7OztBQUNBLFNBQU87QUFDTEwsSUFBQUEsR0FBRyxFQUFIQSxHQURLO0FBRUxHLElBQUFBLE1BQU0sRUFBTkE7QUFGSyxHQUFQO0FBSUQsQ0FwQkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVE8sSUFBTW5ELElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDeEIsTUFBSXNELFFBQUo7O0FBRUEsTUFBTTVDLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUM2QyxVQUFELEVBQWdCO0FBQ2xDRCxJQUFBQSxRQUFRLEdBQUdDLFVBQVg7QUFDRCxHQUZEOztBQUlBLE1BQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsSUFBRCxFQUF5QjtBQUM3QyxRQUFNQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0gsYUFBVCxDQUF1QkMsSUFBdkIsQ0FBWDs7QUFENkMsc0NBQWZHLFVBQWU7QUFBZkEsTUFBQUEsVUFBZTtBQUFBOztBQUU3QyxTQUFLLElBQUlDLEtBQVQsSUFBa0JELFVBQWxCLEVBQThCO0FBQzVCRixNQUFBQSxFQUFFLENBQUNJLFNBQUgsQ0FBYUMsR0FBYixDQUFpQkgsVUFBVSxDQUFDQyxLQUFELENBQTNCO0FBQ0Q7O0FBQ0QsV0FBT0gsRUFBUDtBQUNELEdBTkQ7O0FBUUEsTUFBTWpELElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDakIsUUFBTXVELEtBQUssR0FBR1IsYUFBYSxDQUFDLEtBQUQsRUFBUSxZQUFSLENBQTNCO0FBQ0FRLElBQUFBLEtBQUssQ0FBQ0MsV0FBTixHQUFvQixhQUFwQjtBQUVBLFFBQU1DLE1BQU0sR0FBR1YsYUFBYSxDQUFDLEtBQUQsRUFBUSxRQUFSLENBQTVCO0FBQ0FVLElBQUFBLE1BQU0sQ0FBQ0QsV0FBUCxHQUFxQixrQkFBckI7QUFFQSxRQUFNRSxlQUFlLEdBQUdYLGFBQWEsQ0FBQyxLQUFELEVBQVEsa0JBQVIsQ0FBckM7QUFDQSxRQUFNWSxvQkFBb0IsR0FBR1osYUFBYSxDQUFDLEtBQUQsRUFBUSxpQkFBUixDQUExQztBQUNBLFFBQU1hLFVBQVUsR0FBR2IsYUFBYSxDQUFDLEtBQUQsRUFBUSxhQUFSLENBQWhDO0FBQ0EsUUFBTWMsV0FBVyxHQUFHQyxXQUFXLEVBQS9CO0FBQ0FGLElBQUFBLFVBQVUsQ0FBQ0osV0FBWCxHQUF5QixRQUF6QjtBQUNBRyxJQUFBQSxvQkFBb0IsQ0FBQ0ksTUFBckIsQ0FBNEJGLFdBQTVCLEVBQXlDRCxVQUF6QztBQUNBLFFBQU1JLHNCQUFzQixHQUFHakIsYUFBYSxDQUFDLEtBQUQsRUFBUSxpQkFBUixDQUE1QztBQUNBLFFBQU1rQixZQUFZLEdBQUdsQixhQUFhLENBQUMsS0FBRCxFQUFRLGFBQVIsQ0FBbEM7QUFDQSxRQUFNbUIsYUFBYSxHQUFHSixXQUFXLEVBQWpDO0FBQ0FHLElBQUFBLFlBQVksQ0FBQ1QsV0FBYixHQUEyQixVQUEzQjtBQUNBUSxJQUFBQSxzQkFBc0IsQ0FBQ0QsTUFBdkIsQ0FBOEJHLGFBQTlCLEVBQTZDRCxZQUE3QztBQUNBUCxJQUFBQSxlQUFlLENBQUNLLE1BQWhCLENBQXVCSixvQkFBdkIsRUFBNkNLLHNCQUE3QztBQUVBZCxJQUFBQSxRQUFRLENBQUNpQixhQUFULENBQXVCLE1BQXZCLEVBQStCSixNQUEvQixDQUFzQ1IsS0FBdEMsRUFBNkNFLE1BQTdDLEVBQXFEQyxlQUFyRDtBQUNELEdBckJEOztBQXVCQSxNQUFNSSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxHQUFNO0FBQ3hCLFFBQUkvQyxLQUFLLEdBQUdnQyxhQUFhLENBQUMsS0FBRCxFQUFRLFlBQVIsQ0FBekI7O0FBRHdCLCtCQUVmL0IsQ0FGZTtBQUd0QixVQUFNb0QsR0FBRyxHQUFHckIsYUFBYSxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQXpCOztBQUhzQixtQ0FJYjlCLENBSmE7QUFLcEIsWUFBTW9ELE1BQU0sR0FBR3RCLGFBQWEsQ0FBQyxLQUFELEVBQVEsUUFBUixDQUE1QjtBQUNBc0IsUUFBQUEsTUFBTSxDQUFDYixXQUFQLGFBQXdCdkMsQ0FBeEIsZUFBOEJELENBQTlCO0FBQ0FxRCxRQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLFlBQU07QUFDMUN6QixVQUFBQSxRQUFRLENBQUMzQyxlQUFULENBQXlCZSxDQUF6QixFQUE0QkQsQ0FBNUIsRUFBK0IsSUFBL0I7QUFDRCxTQUZEO0FBR0FxRCxRQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQU07QUFDckN6QixVQUFBQSxRQUFRLENBQUMzQyxlQUFULENBQXlCZSxDQUF6QixFQUE0QkQsQ0FBNUIsRUFBK0IsS0FBL0I7QUFDRCxTQUZEO0FBR0FvRCxRQUFBQSxHQUFHLENBQUNMLE1BQUosQ0FBV00sTUFBWDtBQWJvQjs7QUFJdEIsV0FBSyxJQUFJcEQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUFBLGVBQXBCQSxDQUFvQjtBQVU1Qjs7QUFDREYsTUFBQUEsS0FBSyxDQUFDZ0QsTUFBTixDQUFhSyxHQUFiO0FBZnNCOztBQUV4QixTQUFLLElBQUlwRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCLEVBQTZCO0FBQUEsWUFBcEJBLENBQW9CO0FBYzVCOztBQUNELFdBQU9ELEtBQVA7QUFDRCxHQWxCRDs7QUFvQkEsTUFBTUosYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDRSxNQUFELEVBQVNQLENBQVQsRUFBWUMsQ0FBWixFQUFlQyxJQUFmLEVBQXdCO0FBQzVDLFFBQUkrRCxTQUFTLEdBQUcvRCxJQUFJLEdBQUcsZUFBSCxHQUFxQixNQUF6Qzs7QUFDQSxRQUFJQSxJQUFKLEVBQVU7QUFDUixVQUFNZ0UsY0FBYyxHQUFHdEIsUUFBUSxDQUFDdUIsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQXZCOztBQUNBLHlCQUFJRCxjQUFKLEVBQW9CRSxHQUFwQixDQUF3QixVQUFDQyxZQUFEO0FBQUEsZUFDdEJBLFlBQVksQ0FBQ3RCLFNBQWIsQ0FBdUJ1QixNQUF2QixDQUE4QixlQUE5QixDQURzQjtBQUFBLE9BQXhCO0FBR0Q7O0FBQ0QsUUFBTVIsR0FBRyxHQUFHbEIsUUFBUSxDQUFDdUIsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0NsRSxDQUFsQyxDQUFaOztBQUNBLFNBQUssSUFBSVMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsTUFBcEIsRUFBNEJHLENBQUMsRUFBN0IsRUFBaUM7QUFDL0JvRCxNQUFBQSxHQUFHLENBQUNTLFVBQUosQ0FBZXZFLENBQUMsR0FBR1UsQ0FBbkIsRUFBc0JxQyxTQUF0QixDQUFnQ0MsR0FBaEMsQ0FBb0NpQixTQUFwQztBQUNEO0FBQ0YsR0FaRDs7QUFjQSxTQUFPO0FBQ0x2RSxJQUFBQSxJQUFJLEVBQUpBLElBREs7QUFFTEMsSUFBQUEsV0FBVyxFQUFYQSxXQUZLO0FBR0xVLElBQUFBLGFBQWEsRUFBYkE7QUFISyxHQUFQO0FBS0QsQ0E3RU07Ozs7OztVQ0FQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1tRSxVQUFVLEdBQUc1RiwyQ0FBSSxDQUFDQywyQ0FBRCxFQUFTQyw2Q0FBVCxFQUFtQkMsaURBQW5CLEVBQThCQyx1Q0FBOUIsRUFBb0NDLHVDQUFwQyxDQUF2QjtBQUNBdUYsVUFBVSxDQUFDOUUsSUFBWCxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdhbWUgPSAocGxheWVyLCBjb21wdXRlciwgZ2FtZWJvYXJkLCBzaGlwLCB2aWV3KSA9PiB7XG4gIGxldCBwbGF5ZXJUdXJmLFxuICAgIGNvbXB1dGVyVHVyZixcbiAgICBwbGF5ZXJBLFxuICAgIGNvbXB1dGVyQUksXG4gICAgcGxheWVyU2hpcHMsXG4gICAgY29tcHV0ZXJTaGlwcyxcbiAgICBhcHBWaWV3O1xuXG4gIGxldCBzaGlwUG9pbnRlciA9IDA7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXJUdXJmID0gZ2FtZWJvYXJkKCk7XG4gICAgcGxheWVyQSA9IHBsYXllcigpO1xuICAgIGNvbXB1dGVyQUkgPSBjb21wdXRlcigpO1xuICAgIHBsYXllclNoaXBzID0gW3NoaXAoMiksIHNoaXAoMyksIHNoaXAoMyksIHNoaXAoNCksIHNoaXAoNSldO1xuICAgIGNvbXB1dGVyU2hpcHMgPSBbc2hpcCgyKSwgc2hpcCgzKSwgc2hpcCgzKSwgc2hpcCg0KSwgc2hpcCg1KV07XG4gICAgYXBwVmlldyA9IHZpZXcoKTtcbiAgICBhcHBWaWV3LnNldEhhbmRsZXJzKHsgaGFuZGxlUGxhY2VtZW50IH0pO1xuICAgIGFwcFZpZXcuaW5pdCgpO1xuICB9O1xuXG4gIGNvbnN0IGJlZ2luR2FtZSA9ICgpID0+IHtcbiAgICBhcHBWaWV3LnNldEhhbmRsZXJzKHsgaGFuZGxlQXR0YWNrIH0pO1xuICAgIGFwcFZpZXcuc3RhcnRHYW1lKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXR0YWNrID0gKCkgPT4ge307XG5cbiAgY29uc3QgaGFuZGxlUGxhY2VtZW50ID0gKHgsIHksIHRlbXApID0+IHtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IHBsYXllclNoaXBzW3NoaXBQb2ludGVyXTtcbiAgICBpZiAocGxheWVyVHVyZi5pc1ZhbGlkUG9zaXRpb24oY3VycmVudFNoaXAsIHgsIHkpKSB7XG4gICAgICBhcHBWaWV3LmhpZ2hsaWdodFNoaXAoY3VycmVudFNoaXAuYm9keS5sZW5ndGgsIHgsIHksIHRlbXApO1xuICAgICAgaWYgKCF0ZW1wKSB7XG4gICAgICAgIHBsYXllclR1cmYucGxhY2VTaGlwKGN1cnJlbnRTaGlwLCB4LCB5KTtcbiAgICAgICAgc2hpcFBvaW50ZXIgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNoaXBQb2ludGVyID09PSBwbGF5ZXJTaGlwcy5sZW5ndGgpIGJlZ2luR2FtZSgpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgZ2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IFtdO1xuICAvLyB4IGNvb3JkaW5hdGVzXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gICAgLy95IGNvb3JkaW5hdGVzXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgYm9hcmRbeCArIGldW3ldID0gc2hpcDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNWYWxpZFBvc2l0aW9uID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBsZXQgaXNBbHJlYWR5T2NjdXBpZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNPdXRPZkJvdW5kcyA9IHNoaXAuYm9keS5sZW5ndGggKyB4ID4gMTA7XG4gICAgaWYgKCFpc091dE9mQm91bmRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgaXNBbHJlYWR5T2NjdXBpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAhaXNBbHJlYWR5T2NjdXBpZWQgJiYgIWlzT3V0T2ZCb3VuZHM7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSAhPT0gJ3N0cmluZycgJiYgYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBib2FyZFt4XVt5XTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBpZiAoYm9hcmRbaV1beV0gPT09IHNoaXApIHtcbiAgICAgICAgICBib2FyZFt4XVt5XSA9ICdoaXQnO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGJvYXJkW3hdW3ldID0gJ21pc3NlZCc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGNoZWNrSGFzV29uID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1ByZXNlbnQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW2ldW2pdICE9PSAnc3RyaW5nJyAmJiBib2FyZFtpXVtqXSAhPT0gbnVsbCkge1xuICAgICAgICAgIHNoaXBzUHJlc2VudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICFzaGlwc1ByZXNlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgYm9hcmQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0hhc1dvbixcbiAgICBpc1ZhbGlkUG9zaXRpb24sXG4gIH07XG59O1xuIiwiZXhwb3J0IHsgcGxheWVyLCBjb21wdXRlciB9O1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGF0dGFjazogKHgsIHksIGdhbWVCb2FyZCkgPT4ge1xuICAgICAgcmV0dXJuIGdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBjb21wdXRlciA9ICgpID0+IHtcbiAgY29uc3QgYWxyZWFkeVBsYXllZCA9IFtdO1xuICBjb25zdCByYW5kb21Db29yZCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgcmV0dXJuIHtcbiAgICByYW5kb21BdHRhY2s6IChnYW1lQm9hcmQpID0+IHtcbiAgICAgIGxldCB4LCB5LCBrZXk7XG4gICAgICBkbyB7XG4gICAgICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgICAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgICAgICAga2V5ID0gYCR7eH0gJHt5fWA7XG4gICAgICB9IHdoaWxlIChhbHJlYWR5UGxheWVkLmluY2x1ZGVzKGtleSkpO1xuICAgICAgYWxyZWFkeVBsYXllZC5wdXNoKGtleSk7XG4gICAgICByZXR1cm4gZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfSxcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3Qgc2hpcCA9IChsZW5ndGgpID0+IHtcbiAgbGV0IGJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGJvZHkucHVzaChudWxsKTtcbiAgfVxuICBjb25zdCBtZXRob2RzID0gc2hpcE1ldGhvZHMoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIG1ldGhvZHMsIHsgYm9keSB9KTtcbn07XG5cbmNvbnN0IHNoaXBNZXRob2RzID0gKCkgPT4ge1xuICAvL2lucHV0OiBpbmRleCBvZiBib2R5XG4gIGZ1bmN0aW9uIGhpdChwb3MpIHtcbiAgICBsZXQgaXNIaXQgPSBmYWxzZTtcbiAgICBpZiAocG9zIDwgdGhpcy5ib2R5Lmxlbmd0aCAmJiBwb3MgPj0gMCkge1xuICAgICAgdGhpcy5ib2R5W3Bvc10gPSAnaGl0JztcbiAgICAgIGlzSGl0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGl0O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmJvZHkuZXZlcnkoKHBvc2l0aW9uKSA9PiBwb3NpdGlvbiA9PT0gJ2hpdCcpO1xuICB9XG5cbiAgLy9vdXRwdXQ6IGJvb2xlYW5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCB2aWV3ID0gKCkgPT4ge1xuICBsZXQgaGFuZGxlcnM7XG5cbiAgY29uc3Qgc2V0SGFuZGxlcnMgPSAoaGFuZGxlck9iaikgPT4ge1xuICAgIGhhbmRsZXJzID0gaGFuZGxlck9iajtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIC4uLmNsYXNzTmFtZXMpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gICAgZm9yIChsZXQgaW5kZXggaW4gY2xhc3NOYW1lcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2luZGV4XSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2dhbWUtdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9ICdCQVRUTEVTSElQUyc7XG5cbiAgICBjb25zdCBzdGF0dXMgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3RhdHVzJyk7XG4gICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ1BsYWNlIHlvdXIgc2hpcHMnO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1jb250YWluZXInKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBjcmVhdGVCb2FyZCgpO1xuICAgIHBsYXllck5hbWUudGV4dENvbnRlbnQgPSAnUGxheWVyJztcbiAgICBwbGF5ZXJCb2FyZENvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmQsIHBsYXllck5hbWUpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmRDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnYm9hcmQtY29udGFpbmVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXJOYW1lID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3BsYXllci1uYW1lJyk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGNyZWF0ZUJvYXJkKCk7XG4gICAgY29tcHV0ZXJOYW1lLnRleHRDb250ZW50ID0gJ0NvbXB1dGVyJztcbiAgICBjb21wdXRlckJvYXJkQ29udGFpbmVyLmFwcGVuZChjb21wdXRlckJvYXJkLCBjb21wdXRlck5hbWUpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmQocGxheWVyQm9hcmRDb250YWluZXIsIGNvbXB1dGVyQm9hcmRDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZCh0aXRsZSwgc3RhdHVzLCBib2FyZHNDb250YWluZXIpO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICAgIGxldCBib2FyZCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdib2FyZC1ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAncm93Jyk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NxdWFyZScpO1xuICAgICAgICBzcXVhcmUudGV4dENvbnRlbnQgPSBgJHtqfSwgJHtpfWA7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIGhhbmRsZXJzLmhhbmRsZVBsYWNlbWVudChqLCBpLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBoYW5kbGVycy5oYW5kbGVQbGFjZW1lbnQoaiwgaSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgcm93LmFwcGVuZChzcXVhcmUpO1xuICAgICAgfVxuICAgICAgYm9hcmQuYXBwZW5kKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZDtcbiAgfTtcblxuICBjb25zdCBoaWdobGlnaHRTaGlwID0gKGxlbmd0aCwgeCwgeSwgdGVtcCkgPT4ge1xuICAgIGxldCBjbGFzc05hbWUgPSB0ZW1wID8gJ3NoaXAtcG9zc2libGUnIDogJ3NoaXAnO1xuICAgIGlmICh0ZW1wKSB7XG4gICAgICBjb25zdCBwcmV2SGlnaGxpZ2h0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwLXBvc3NpYmxlJyk7XG4gICAgICBbLi4ucHJldkhpZ2hsaWdodHNdLm1hcCgocG9zc2libGVTaGlwKSA9PlxuICAgICAgICBwb3NzaWJsZVNoaXAuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcC1wb3NzaWJsZScpXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm93JylbeV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcm93LmNoaWxkTm9kZXNbeCArIGldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIHNldEhhbmRsZXJzLFxuICAgIGhpZ2hsaWdodFNoaXAsXG4gIH07XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHBsYXllciwgY29tcHV0ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBzaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5jb25zdCBiYXR0bGVzaGlwID0gZ2FtZShwbGF5ZXIsIGNvbXB1dGVyLCBnYW1lYm9hcmQsIHNoaXAsIHZpZXcpO1xuYmF0dGxlc2hpcC5pbml0KCk7XG4iXSwibmFtZXMiOlsiZ2FtZSIsInBsYXllciIsImNvbXB1dGVyIiwiZ2FtZWJvYXJkIiwic2hpcCIsInZpZXciLCJwbGF5ZXJUdXJmIiwiY29tcHV0ZXJUdXJmIiwicGxheWVyQSIsImNvbXB1dGVyQUkiLCJwbGF5ZXJTaGlwcyIsImNvbXB1dGVyU2hpcHMiLCJhcHBWaWV3Iiwic2hpcFBvaW50ZXIiLCJpbml0Iiwic2V0SGFuZGxlcnMiLCJoYW5kbGVQbGFjZW1lbnQiLCJiZWdpbkdhbWUiLCJoYW5kbGVBdHRhY2siLCJzdGFydEdhbWUiLCJ4IiwieSIsInRlbXAiLCJjdXJyZW50U2hpcCIsImlzVmFsaWRQb3NpdGlvbiIsImhpZ2hsaWdodFNoaXAiLCJib2R5IiwibGVuZ3RoIiwicGxhY2VTaGlwIiwiYm9hcmQiLCJpIiwiaiIsImlzQWxyZWFkeU9jY3VwaWVkIiwiaXNPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJjaGVja0hhc1dvbiIsInNoaXBzUHJlc2VudCIsIm5hbWUiLCJhdHRhY2siLCJnYW1lQm9hcmQiLCJhbHJlYWR5UGxheWVkIiwicmFuZG9tQ29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21BdHRhY2siLCJrZXkiLCJpbmNsdWRlcyIsInB1c2giLCJtZXRob2RzIiwic2hpcE1ldGhvZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJoaXQiLCJwb3MiLCJpc0hpdCIsImlzU3VuayIsImV2ZXJ5IiwicG9zaXRpb24iLCJoYW5kbGVycyIsImhhbmRsZXJPYmoiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImVsIiwiZG9jdW1lbnQiLCJjbGFzc05hbWVzIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0aXRsZSIsInRleHRDb250ZW50Iiwic3RhdHVzIiwiYm9hcmRzQ29udGFpbmVyIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJwbGF5ZXJOYW1lIiwicGxheWVyQm9hcmQiLCJjcmVhdGVCb2FyZCIsImFwcGVuZCIsImNvbXB1dGVyQm9hcmRDb250YWluZXIiLCJjb21wdXRlck5hbWUiLCJjb21wdXRlckJvYXJkIiwicXVlcnlTZWxlY3RvciIsInJvdyIsInNxdWFyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc05hbWUiLCJwcmV2SGlnaGxpZ2h0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtYXAiLCJwb3NzaWJsZVNoaXAiLCJyZW1vdmUiLCJjaGlsZE5vZGVzIiwiYmF0dGxlc2hpcCJdLCJzb3VyY2VSb290IjoiIn0=