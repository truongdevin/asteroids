var Asteroid = require("./asteroid.js");
var Ship = require("./ship");

var Game = function () {
  this.asteroids = [];
  this.ships = [];

  // this.addShip();
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

Game.prototype.addShip = function() {
  var ship = new Ship({
    pos: this.randomPosition(),
    game: this
  });
  this.ships.push(ship);
  return ship;
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ships);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function(object) {
    object.move();
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

  this.allObjects().forEach(function(object1) {
    self.allObjects().forEach(function(object2) {
      if (object1 === object2) {
        return;
      }

      if (object1.isCollidedWith(object2)) {
        object1.collideWith(object2);
        console.log("COLLIDED");
      }
    });
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollosions();
};

Game.prototype.remove = function (asteroid) {
  var idx = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(idx,1);
};

module.exports = Game;
