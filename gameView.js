var Game = require('./game.js');

var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ship = this.game.addShip();
};

GameView.prototype.start = function (canvasEl) {

    this.bindKeyHandlers();
    var self = this;
    var refresh = function() {
      // self.game.moveObjects();
      // self.game.checkCollosions();
      self.game.step();
      self.game.draw(self.ctx);
    };

    setInterval(refresh,20);
};

GameView.prototype.bindKeyHandlers = function () {
  var ship = this.ship;
  key('w', function() {Math.abs(ship.vel[1]) < 10 ? ship.power([0,-1]) : ""});
  key('a', function() {Math.abs(ship.vel[0]) < 10 ? ship.power([-1,0]) : ""});
  key('s', function() {Math.abs(ship.vel[1]) < 10 ? ship.power([0,1]) : ""});
  key('d', function() {Math.abs(ship.vel[0]) < 10 ? ship.power([1,0]) : ""});
};


module.exports = GameView;
