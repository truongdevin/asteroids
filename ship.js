var MovingObject = require("./movingObject");
var Util = require("./util");

var Ship = function (hash) {
  hash.color = hash.color || "red"; // red , crimson, aqua
  hash.radius = hash.radius || 15;
  hash.vel = [0,0];
  MovingObject.call(this, hash);
};
Util.inherits(Ship, MovingObject);

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.move = function() {
  this.vel[0]*=0.99;
  this.vel[1]*=0.99;
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};


module.exports = Ship;
