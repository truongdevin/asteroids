var Game = require('./game.js');

var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ship = this.game.addShip();
};

GameView.prototype.start = function (canvasEl) {
    // var ctx = canvasEl.getContext("2d");
    // var game = new Game();

    // var refresh = function() {
    //   game.moveObjects();
    //   game.draw(ctx);
    // };
    this.bindKeyHandlers();
    var self = this;
    var refresh = function() {
      // self.game.moveObjects();
      self.game.step();
      // self.game.checkCollosions();
      self.game.draw(self.ctx);
    };

    setInterval(refresh,20);
};

GameView.prototype.bindKeyHandlers = function () {
  var ship = this.ship;
  key('w', function() {ship.power([0,-1])});
  key('a', function() {ship.power([-1,0])});
  key('s', function() {ship.power([0,1])});
  key('d', function() {ship.power([1,0])});
};


module.exports = GameView;
