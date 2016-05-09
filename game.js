var Asteroid = require("./asteroid.js");

var Game = function () {
  this.asteroids = [];
  this.addAsteroids();
}

Game.BG_COLOR="black";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 4;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    var a = new Asteroid({pos: this.randomPosition(), game: this});
    this.asteroids.push(a);
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function(asteroid) {
    asteroid.move();
  });

};

Game.prototype.randomPosition = function() {
  var x = Game.DIM_X * Math.random();
  var y = Game.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.wrap = function (pos) {
  pos[0] = pos[0] > 0 ? pos[0] % Game.DIM_X : Game.DIM_X
  pos[1] = pos[1] > 0 ? pos[1] % Game.DIM_Y : Game.DIM_Y

  return [pos[0], pos[1]];
};

Game.prototype.checkCollosions = function () {
  var self = this;
  this.asteroids.forEach(function(asteroid1) {
    self.asteroids.forEach(function(asteroid2) {
      if (asteroid1 === asteroid2) {
        return;
      }

      if (asteroid1.isCollidedWith(asteroid2)) {
        console.log("COLLIDED");
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollosions();
}

module.exports = Game;
