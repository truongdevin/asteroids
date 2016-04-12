var Game = require("./game.js");
var GameView = require("./gameView.js");
var M = require("./movingObject.js");

var canvasEl = document.getElementById("game-canvas");
canvasEl.height = 800;
canvasEl.width = 800;

var newGame = new GameView();
newGame.start(canvasEl);

window.game = Game;
window.gameview = GameView;
window.m = M;
window.n = newGame;
