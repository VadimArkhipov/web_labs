import Game from "./Game.js";
import Figure from "./Figure.js";
import Field from "./Field.js";
import View from "./View.js";
import Controller from "./Controller.js";

const game = new Game();
const view = new View();
const controller = new Controller(game, view);
window.game = game;
window.view = view;




