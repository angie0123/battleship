import { game } from './game';
import { player, computer } from './player';
import { ship } from './ship';
import { gameboard } from './gameboard';
import { view } from './view';

const battleship = game(player, computer, gameboard, ship, view);
battleship.init();
